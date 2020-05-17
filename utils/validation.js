// check if value is falsy
const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

// ensure submitted email has valid syntax
const isEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email));
};

// validate phone
// function isPhoneNum(phone) {
//   var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//   return re.test(String(phone));
// }

// Trim any whitespace off login values
const trimObjVals = (obj) => {
  const result = {};
  for (let key in obj) {
    result[key] = obj[key].trim();
  }
  return result;
};

// compare to string to see if same
const doPasswordsMatch = (pass1, pass2) => pass1 === pass2;

// validate req.body when creating account
const validateSignup = (data) => {
  const errors = {};
  const userData = trimObjVals(data);

  if (isEmpty(userData.username)) {
    errors.username = 'Name field required.';
  }

  if (isEmpty(userData.email)) {
    errors.email = 'Email field required.';
  }

  if (!isEmail(userData.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (isEmpty(userData.password)) {
    errors.password = 'Password field required.';
  }

  if (userData.password.length < 6) {
    errors.password = 'Please use a stronger password.';
  }

  if (isEmpty(userData.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password field required.';
  }

  if (!doPasswordsMatch(userData.password, userData.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match.';
  }

  delete userData.confirmPassword;
  userData.email = userData.email.toLowerCase();

  return {
    errors,
    userData: isEmpty(errors) ? userData : null,
  };
};

// validate login credentials
const validateLogin = (data) => {
  const errors = {};
  const userData = trimObjVals(data);
  if (isEmpty(userData.email)) {
    errors.email = 'Email field required.';
  }
  if (!isEmail(userData.email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (isEmpty(userData.password)) {
    errors.password = 'Password field required.';
  }

  return {
    errors,
    userData: isEmpty(errors) ? userData : null,
  };
};

module.exports = { validateSignup, validateLogin };
