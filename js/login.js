const loginForm = document.getElementById("loginForm");
const loginButton = document.getElementById("loginButton");

// EvenetListner to Check all vaidation of login form
loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  let currentUsers = JSON.parse(localStorage.getItem("users"));
  let user;
  let passcode;

  let userFound = false;
  const username = loginForm.userName.value;
  const password = loginForm.passcode.value;
  currentUsers.forEach((element) => {
    user = element.email;
    passcode = element.password;
    if (username === user && password === passcode) {
      userFound = true;
      document.getElementById("invalidName").className = "d-none";
      document.getElementById("userName").className =
        "form-control rounded-pill is-valid";
      document.getElementById("passcode").className =
        "form-control rounded-pill is-valid";
      let login = JSON.stringify(element);
      sessionStorage.setItem("LoggedInUser", login);
      setTimeout(toHomePage, 2000);
      document.getElementById("successAlert").className =
        "alert alert-success mt-2 me-auto ms-auto w-25 justify-content-center d-flex";
    }
  });

  if (userFound == false) {
    document.getElementById("userName").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("passcode").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("invalidName").className =
      "d-block alert alert-danger text-center m-5 mt-0 mb-1";
  }
});

// Function called when forgot password is submitted checkes validations of forgot password
function resetButtons() {
  // username/email regex and validation
  let usernameEdit = document.getElementById("usernameEdit");
  var emailRegex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  let isEmail = false;
  if (usernameEdit.value.match(emailRegex)) {
    document.getElementById("usernameEdit").className =
      "form-control rounded-pill";
    document.getElementById("usernameFormatError").className = "d-none";
    isEmail = true;
  } else {
    isEmail = false;
    document.getElementById("usernameEdit").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("usernameFormatError").className =
      "d-block invalid-feedback m-2";
  }

  // password regex and validation (1 upper 1 lower 1 number 1 special min 8)
  let isPasscode = false;
  const resetpasscode = document.getElementById("cpasscode");
  const confirmResetPasscode = document.getElementById("ccpasscode");
  var passcodeRegex =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  if (
    resetpasscode.value.match(passcodeRegex) &&
    confirmResetPasscode.value.match(passcodeRegex)
  ) {
    if (resetpasscode.value === confirmResetPasscode.value) {
      document.getElementById("cpasscode").className =
        "form-control rounded-pill is-valid";
      document.getElementById("ccpasscode").className =
        "form-control rounded-pill is-valid";

      document.getElementById("matchPasswordError").className = "d-none";
      document.getElementById("emptyWrongPasswordError").className = "d-none";

      isPasscode = true;
    } else {
      document.getElementById("cpasscode").className =
        "form-control rounded-pill is-invalid";
      document.getElementById("ccpasscode").className =
        "form-control rounded-pill is-invalid";

      document.getElementById("emptyWrongPasswordError").className = "d-none";

      document.getElementById("matchPasswordError").className =
        "d-block alert alert-danger text-center m-5 mt-0 mb-1";
      isPasscode = false;
    }
  } else {
    document.getElementById("cpasscode").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("ccpasscode").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("emptyWrongPasswordError").className =
      "d-block alert alert-danger text-center m-5 mt-0 mb-1";
    document.getElementById("matchPasswordError").className = "d-none";
    isPasscode = false;
  }

  // username validation
  let users = JSON.parse(localStorage.getItem("users"));
  let isUsernameValid = false;
  users.forEach((element) => {
    username = element.email;
    let text = username.toString(10);
    passcode = element.password;
    if (usernameEdit.value === text) {
      isUsernameValid = true;
    }
    if (isEmail == true && isUsernameValid == false) {
      document.getElementById("usernameEdit").className =
        "form-control rounded-pill is-invalid";
      document.getElementById("invalidUsernameError").className =
        "d-block invalid-feedback m-2";
    } else {
      document.getElementById("invalidUsernameError").className = "d-none";
    }

    // final navigation to next page
    if (isUsernameValid == true && isPasscode == true && isEmail == true) {
      document.getElementById("usernameEdit").className =
        "form-control rounded-pill is-valid";
      element.password = resetpasscode.value;

      let text = JSON.stringify(users);
      localStorage.setItem("users", text);

      let login = JSON.stringify(element);
      sessionStorage.setItem("LoggedInUser", login);
      window.location.href = "index.html";
      isPasscode = false;
    }
  });
}

// Function to reset values of form when close button is clicked
function closeButtons() {
  window.location.reload();
}

// Function called when login details are correct and validated
function toHomePage() {
  window.location.href = "index.html";
}
