
const dateFormat = date => {
  var re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  return re.test(String(date));
};


const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const isEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const passwordMatch = (pass1, pass2) => {
  if (!(pass1 === pass2)) {
    return false;
  }
  return true;
};

const signupValidate = (
  { password, email },
  password2,
  currentPassword
) => {
  let errors = {};

  if (currentPassword) {
    if (passwordMatch(password2, currentPassword)) {
      errors.currentPassword = "Current and New password must be different.";
    }
  }
  if (password.length <= 5) {
    errors.password = "Please use a stronger password";
  }

  if (!passwordMatch(password, password2)) {
    errors.password2 = "Passwords don't match.";
  }
  if (!isEmail(email)) {
    errors.email = "Please enter a valid email.";
  }

  return errors;
};


module.exports={
  dateFormat, signupValidate
}

