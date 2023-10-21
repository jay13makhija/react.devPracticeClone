// Storing Languages to localStorage
let languages = ["English", "Hindi", "Marathi", "Tamil", "Telgu"];
languages = JSON.stringify(languages);
localStorage.setItem("languages", languages);

// Storing Skills List to localStorage
let skills = [
  "C++",
  "C",
  "Python",
  "Java",
  "Javascript",
  "Rust",
  "Ruby",
  "Angular",
  "React",
  "SQL",
];
skills = JSON.stringify(skills);
localStorage.setItem("skillsList", skills);

// Using language list form localStorage
let languagesUsed = JSON.parse(localStorage.getItem("languages"));
const option = document.getElementById("prefferedLanguage");
option.innerHTML = " ";
for (var i = 0; i < languagesUsed.length; i++) {
  const skills = JSON.stringify(languagesUsed[i].porgramming_skills);
  option.innerHTML +=
    "<option value=" + languagesUsed[i] + ">" + languagesUsed[i] + "</option>";
}

// Using skills for localStorage
let programmingSkillList = JSON.parse(localStorage.getItem("skillsList"));

// To set maximum input value in dob to 31/12/2019
document.getElementById("dob").max = "2019-12-31";

// Function to check uncheck child elements of User when User checkbox is checked or unchecked
function checkboxUser() {
  const user = document.getElementById("flexCheckDefault4");
  if (user.checked == true) {
    document.getElementById("flexCheckDefault3").checked = false;
    document.getElementById("flexCheckDefault3").indeterminate = false;

    document.getElementById("adminWrite").checked = false;

    document.getElementById("adminRead").checked = false;
    document.getElementById("userWrite").checked = true;

    document.getElementById("userRead").checked = true;
  } else {
    document.getElementById("userWrite").checked = false;
    document.getElementById("userRead").checked = false;
  }
}

// Function to check uncheck child elements of Admin when Admin checkbox is checked or unchecked
function checkboxAdmin() {
  const admin = document.getElementById("flexCheckDefault3");
  if (admin.checked == true) {
    document.getElementById("flexCheckDefault4").checked = false;
    document.getElementById("flexCheckDefault4").indeterminate = false;

    document.getElementById("userWrite").checked = false;
    document.getElementById("userRead").checked = false;
    document.getElementById("adminWrite").checked = true;
    document.getElementById("adminRead").checked = true;
  } else {
    document.getElementById("adminWrite").checked = false;
    document.getElementById("adminRead").checked = false;
  }
}

/* Function to check uncheck or mark intermediate parent elements
when children of User checkbox is checked or unchecked */
function checkboxUserRW() {
  const user = document.getElementById("flexCheckDefault4");
  const admin = document.getElementById("flexCheckDefault3");
  const adminRead = document.getElementById("adminWrite");
  const adminWrite = document.getElementById("adminRead");
  const userRead = document.getElementById("userRead");
  const userWrite = document.getElementById("userWrite");

  if (userRead.checked == false && userWrite.checked == false) {
    user.checked = false;
    user.indeterminate = false;
  }
  if (userRead.checked == true && userWrite.checked == true) {
    user.checked = true;
    user.indeterminate = false;
  }
  if (
    (userRead.checked == false && userWrite.checked == true) ||
    (userRead.checked == true && userWrite.checked == false)
  ) {
    admin.checked = false;
    admin.indeterminate = false;
    adminRead.checked = false;
    adminWrite.checked = false;
    user.checked = true;
    user.indeterminate = true;
  }
}

/* Function to check uncheck or mark intermediate parent elements
 when children of Admin checkbox is checked or unchecked */
function checkboxAdminRW() {
  const user = document.getElementById("flexCheckDefault4");
  const admin = document.getElementById("flexCheckDefault3");
  const adminRead = document.getElementById("adminWrite");
  const adminWrite = document.getElementById("adminRead");
  const userRead = document.getElementById("userRead");
  const userWrite = document.getElementById("userWrite");

  if (adminRead.checked == false && adminWrite.checked == false) {
    admin.checked = false;
    admin.indeterminate = false;
  }
  if (adminRead.checked == true && adminWrite.checked == true) {
    admin.checked = true;
    admin.indeterminate = false;
  }
  if (
    (adminRead.checked == false && adminWrite.checked == true) ||
    (adminRead.checked == true && adminWrite.checked == false)
  ) {
    user.checked = false;
    user.indeterminate = false;
    userRead.checked = false;
    userWrite.checked = false;
    admin.checked = true;
    admin.indeterminate = true;
  }
}

// Function when form is submitted to checks all validations
function signup() {
  const signupForm = document.getElementById("signupForm");
  const firstName = signupForm.firstName.value;
  const lastName = signupForm.lastName.value;
  const username = signupForm.email.value;
  let phone = signupForm.phone.value;
  const dob = signupForm.dob.value;
  let gender;
  if (signupForm.female.checked == true) {
    gender = signupForm.female.value;
  } else {
    gender = signupForm.male.value;
  }
  const address = signupForm.address.value;
  const preferredSkills = signupForm.prefferedSkill.value;
  const preferredLanguage = signupForm.prefferedLanguage.value;
  const isAdmin = signupForm.flexCheckDefault3.checked;
  const isUser = signupForm.flexCheckDefault4.checked;
  const userRead = signupForm.userRead.checked;
  const userWrite = signupForm.userWrite.checked;
  const adminRead = signupForm.adminRead.checked;
  const adminWrite = signupForm.adminWrite.checked;
  const password = signupForm.password.value;
  const confirmPassword = signupForm.confirmPassword.value;

  //phone regex and validation
  let isPhone = false;
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (phone.match(phoneno)) {
    document.getElementById("phone").className = "form-control rounded-pill";
    document.getElementById("phoneFormatError").className = "d-none";

    const countrySelected =
      document.getElementsByClassName("iti__selected-flag");
    let indexOfPlus = countrySelected[0].title.indexOf("+");
    let country_code = "(";
    for (
      let index = indexOfPlus;
      index < countrySelected[0].title.length;
      index++
    ) {
      const element = countrySelected[0].title[index];
      country_code += element;
    }
    country_code += ")";
    phone = country_code + phone;
    isPhone = true;
  } else {
    isPhone = false;
    document.getElementById("phone").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("phoneFormatError").className =
      "d-block invalid-feedback m-2";
  }

  // username/email regex and validation
  var emailRegex =
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
  let isEmail = false;
  if (username.match(emailRegex)) {
    document.getElementById("email").className = "form-control rounded-pill";
    document.getElementById("emailFormatError").className = "d-none";
    isEmail = true;
  } else {
    isEmail = false;
    document.getElementById("email").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("emailFormatError").className =
      "d-block invalid-feedback m-2";
  }

  // dob validation
  let isDob = false;
  if (dob <= "2019-12-31" && dob != "") {
    document.getElementById("dob").className = "form-control rounded-pill";
    document.getElementById("dobError").className = "d-none";
    isDob = true;
  } else {
    document.getElementById("dob").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("dobError").className =
      "d-block invalid-feedback m-2";
    isDob = false;
  }

  // name validation
  let isName = false;
  if (firstName != "" && firstName != undefined) {
    document.getElementById("firstName").className =
      "form-control rounded-pill me-2";
    document.getElementById("firstnameRequiredError").className = "d-none";
    isName = true;
  } else {
    document.getElementById("firstName").className =
      "form-control rounded-pill is-invalid me-2";
    document.getElementById("firstnameRequiredError").className =
      "d-block invalid-feedback m-2";
    isName = false;
  }

  // address validation
  let isAddress = false;
  if (address != "" && address != undefined) {
    document.getElementById("address").className = "form-control rounded-4";
    document.getElementById("addressRequiredError").className = "d-none";
    isAddress = true;
  } else {
    document.getElementById("address").className =
      "form-control rounded-4 is-invalid";
    document.getElementById("addressRequiredError").className =
      "d-block invalid-feedback m-2";
    isAddress = false;
  }

  // password regex and validation (1 upper 1 lower 1 number 1 special min 8)
  let isPasscode = false;
  var passcodeRegex =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  if (password.match(passcodeRegex) && confirmPassword.match(passcodeRegex)) {
    if (confirmPassword === password) {
      document.getElementById("passwordEmptyError").className = "d-none";
      document.getElementById("passwordMatchError").className = "d-none";
      document.getElementById("password").className =
        "form-control rounded-pill";
      document.getElementById("confirmPassword").className =
        "form-control rounded-pill";
      isPasscode = true;
    } else {
      document.getElementById("password").className =
        "form-control rounded-pill is-invalid";
      document.getElementById("confirmPassword").className =
        "form-control rounded-pill is-invalid";

      document.getElementById("passwordEmptyError").className = "d-none";

      document.getElementById("passwordMatchError").className =
        "d-block alert alert-danger text-center m-5 mt-0 mb-4";
      scroll(0, 0);
      isPasscode = false;
    }
  } else {
    document.getElementById("password").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("confirmPassword").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("passwordEmptyError").className =
      "d-block alert alert-danger text-center m-5 mt-0 mb-4";
    document.getElementById("passwordMatchError").className = "d-none";
    scroll(0, 0);
    isPasscode = false;
  }

  //Roles authentication and validation
  let isAuthorized = false;
  let role = [];
  if (isAdmin == false && isUser == false) {
    document.getElementById("roleAssignError").className =
      "d-block alert alert-danger text-center m-5 mt-0 mb-4";
    scroll(0, 0);
    isAuthorized = false;
  } else {
    document.getElementById("roleAssignError").className = "d-none";
    role = {
      admin: {
        read: adminRead,
        write: adminWrite,
      },
      user: {
        read: userRead,
        write: userWrite,
      },
    };
    isAuthorized = true;
  }

  // final signup and user data storage to local storage
  if (
    isAuthorized == true &&
    isPasscode == true &&
    isName == true &&
    isDob == true &&
    isAddress == true &&
    isEmail == true &&
    isPhone == true
  ) {
    let Loginuser = {
      name: { firstname: firstName, lastname: lastName },
      email: username,
      password: password,
      phone: phone,
      dob: dob,
      gender: gender,
      address: address,
      porgramming_skills: preferredSkills,
      language: preferredLanguage,
      role: role,
      isAdmin: isAdmin,
    };
    let currentUsers = JSON.parse(localStorage.getItem("users"))
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    currentUsers.push(Loginuser);
    currentUsers = JSON.stringify(currentUsers);
    localStorage.setItem("users", currentUsers);
    document.getElementById("successAlert").className =
      "alert alert-success mt-2 me-auto ms-auto w-25 justify-content-center d-flex";
    scroll(0, 0);
    setTimeout(toLoginPage, 2000);
  }
}

// Function called when all validations to signup form are correct to navigate to login page
function toLoginPage() {
  window.location.href = "login.html";
}
