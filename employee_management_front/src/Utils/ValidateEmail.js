export const ValidateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  console.log("test", emailRegex.test(email));

  return emailRegex.test(email);
};
