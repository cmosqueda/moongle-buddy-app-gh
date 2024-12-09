// create validationHelpers.ts inside utilities directory

// REGEX EMAIL VALIDATION
export const validateEmail = (email: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const testEmail = emailRegex.test(email);
  return testEmail;
};

// PASSWORD CHARACTERS VALIDATION
// at least 8 characters
// include one special char
// one uppercase letter
export const validatePassword = (password: any) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
  const testPassword = passwordRegex.test(password);
  return testPassword;
};
