const testInput = function (input, password) {
  const testEmail = new RegExp(
    /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    "g"
  );
  const testUser = new RegExp(/^[A-Za-z][A-Za-z0-9_]{4,14}$/, "g");
  const testPassword = new RegExp(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
    "gi"
  );
  if (testEmail.test(input) && testPassword.test(password)) {
    return "E";
  } else if (testUser.test(input) && testPassword.test(password)) {
    return "U";
  } else {
    return "ERROR!";
  }
};

module.exports = { testInput };
