import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  // initialize the var that will hold the firebase.unsubscribe() method to null
  unsubscribeFromAuth = null;

  componentDidMount() {
    // get setCurrentUser (now a redux action function) from props set by mapDispatchToProps below
    const { setCurrentUser } = this.props;
    // onAuthStateChanged() is a listener that returns a firebase.unsubscribe()
    // method -- assign this to unsubscribeFromAuth, may be needed
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // if userAuth isn't null ...
      if (userAuth) {
        // whether Google login or email login createUserProfileDocument (async) may create
        // a new user doc or just return the existing user as a firestore document ref
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // console.log('setting currentUser in App.js componentDidMount if block');
          // now use redux action setCurrentUser function to update state
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      } else {
        // if userAuth is null, e.g, on logout, setCurrentUser back to that (null)
        // console.log('userAuth log 2', userAuth);
        // console.log('setting currentUser in App.js componentDidMount else block');
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount() {
    // unsubscribeFromAuth holds firebase.unsubscribe(), execute it on unmount
    console.log(this.unsubscribeFromAuth);
    this.unsubscribeFromAuth();
    console.log("State from componentWillUnmount", this.state)
  }

  render() {
    return (
      <div>
        {/* Header goes outside Switch so will always render */}
        {/* removed passing currentUser to Header as prop from App state,
        // instead use redux/reselect in Header component to pass props */}
        {/* <Header currentUser={this.state.currentUser} /> */}
        <Header />
        <Switch>
          {/* <Route path='/shop/hats' component={HatsPage} /> */}
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          {/* don't let users access /signin if they are already signed in,
          redirect that component to '/' */}
          <Route exact render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

// a garden variety mapStateToProps
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state)
// });

// const mapStateToProps = (state) => {
//   console.log('WHAT IS SELECTCURRENTUSER?', selectCurrentUser);
//   return { currentUser: selectCurrentUser(state) };
// };

// mapStateToProps, destructing user first
// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

// const mapStateToProps = ({ user }) => {
//   console.log("CURRENT USER!!!", user.currentUser);
//   return { currentUser: user.currentUser };
// };

// mapStateToProps using a reselect selector -- use
// createStructuredSelector, in case we need more selectors in the future
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (App);
// this could also work, no need to call setCurrentUser?
// export default connect(null, { setCurrentUser })(App);

