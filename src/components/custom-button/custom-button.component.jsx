import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  // other props is submit or do signInWithGoogle() firebase method for now
  ...otherProps }) => (
    // conditionally render the google-sign-in styling; some tricky template stringing here
    <button className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
      {/* button text ({children}) is transformed to uppercase in custom-button.styles.css */}
      {children}
    </button >
  );

// CustomButton with logging
// const CustomButton = ({
//   children,
//   isGoogleSignIn,
//   ...otherProps }) => {
//   // console.log('isGoogleSignIn?: ', isGoogleSignIn);
//   // console.log('otherProps on the CustomButton are:', otherProps);
//   return (
//     <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} 'custom-button' `} {...otherProps}>
//       {children}
//     </button >
//   )
// };

export default CustomButton;