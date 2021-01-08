exports.email = (email) => {
  const pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  return pattern.test(email);
}

exports.password = (password) => {
  //Min 8 character: 1 uppercase, 1 lower case, 1 number, 1 special character
  const pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  return pattern.test(password);
}