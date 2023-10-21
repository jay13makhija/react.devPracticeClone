// To set maximum input value in dob to 31/12/2019
document.getElementById("dobEdit").max = "2019-12-31";

// Roles bases access to view and edit profile
let sample = JSON.parse(sessionStorage.getItem("LoggedInUser"));
const viewUser = document.getElementById("viewUser");
const editUser = document.getElementById("editUser");
const viewAllUsers = document.getElementById("viewAllUser");

if (sample.role.admin.read == false && sample.role.user.read == false) {
  viewUser.className = "d-none";
}
if (sample.role.admin.write == false && sample.role.user.write == false) {
  editUser.className = "d-none";
}
if (sample.isAdmin == false) {
  viewAllUsers.className = "d-none";
}

// Function to reset values of form when close button is clicked
function closeButtons() {
  window.location.reload();
}

// Function to validate and update users data form edit form
function EditDetails() {
  let PhoneEdit = document.getElementById("phoneEdit");
  let isPhone = false;
  //phone regex
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (PhoneEdit.value.match(phoneno)) {
    document.getElementById("phoneEdit").className =
      "form-control rounded-pill";
    document.getElementById("1").className = "d-none";
    isPhone = true;
  } else {
    isPhone = false;
    document.getElementById("phoneEdit").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("1").className = "d-block invalid-feedback m-2";
  }

  // username/email regex
  let usernameEdit = document.getElementById("usernameEdit");
  var emailRegex =
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
  let isEmail = false;
  if (usernameEdit.value.match(emailRegex)) {
    document.getElementById("usernameEdit").className =
      "form-control rounded-pill";
    document.getElementById("2").className = "d-none";
    isEmail = true;
  } else {
    isEmail = false;
    document.getElementById("usernameEdit").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("2").className = "d-block invalid-feedback m-2";
  }

  // dob Check
  let isDob = false;
  let dob = document.getElementById("dobEdit");
  if (dob.value <= "2019-12-31" && dob.value != "") {
    document.getElementById("dobEdit").className = "form-control rounded-pill";
    document.getElementById("0").className = "d-none";
    isDob = true;
  } else {
    document.getElementById("dobEdit").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("0").className = "d-block invalid-feedback m-2";
    isDob = false;
  }

  // Name check
  let isName = false;
  let name = document.getElementById("nameEdit");
  if (name.value != "" && name.value != undefined) {
    document.getElementById("nameEdit").className = "form-control rounded-pill";
    document.getElementById("6").className = "d-none";
    isName = true;
  } else {
    document.getElementById("nameEdit").className =
      "form-control rounded-pill is-invalid";
    document.getElementById("6").className = "d-block invalid-feedback m-2";
    isName = false;
  }

  let isAddress = false;
  let addressEdit = document.getElementById("addressEdit");
  if (addressEdit.value != "" && addressEdit.value != undefined) {
    document.getElementById("addressEdit").className = "form-control rounded-4";
    document.getElementById("5").className = "d-none";
    isAddress = true;
  } else {
    document.getElementById("addressEdit").className =
      "form-control rounded-4 is-invalid";
    document.getElementById("5").className = "d-block invalid-feedback m-2";
    isAddress = false;
  }

  if (
    isPhone == true &&
    isEmail == true &&
    isDob == true &&
    isName == true &&
    isAddress == true
  ) {
    let nameEdit = document.getElementById("nameEdit");
    let lastnameEdit = document.getElementById("lastnameEdit");
    let usernameEdit = document.getElementById("usernameEdit");
    let PhoneEdit = document.getElementById("phoneEdit");
    let DOB_Edit = document.getElementById("dobEdit");
    let prefferedLanguage = document.getElementById("prefferedLanguage");
    let prefferedSkill = document.getElementById("prefferedSkill");

    let sample = JSON.parse(sessionStorage.getItem("LoggedInUser"));

    let Loginuser = {
      name: { firstname: nameEdit.value, lastname: lastnameEdit.value },
      email: usernameEdit.value,
      password: sample.password,
      phone: "(+91)" + PhoneEdit.value,
      dob: DOB_Edit.value,
      address: addressEdit.value,
      language: prefferedLanguage.value,
      porgramming_skills: prefferedSkill.value,
      gender: sample.gender,
      role: sample.role,
      isAdmin: sample.isAdmin,
    };
    Loginuser = JSON.stringify(Loginuser);
    sessionStorage.clear();
    sessionStorage.setItem("LoggedInUser", Loginuser);
    window.location.href = "index.html";
  }
}

// Function to provide user data to be viewed
function ViewUser() {
  let sample = JSON.parse(sessionStorage.getItem("LoggedInUser"));

  let names = document.getElementById("name");
  names.innerHTML = sample.name.firstname + " " + sample.name.lastname;

  let user = document.getElementById("username");
  user.innerHTML = sample.email;

  let phonenum = document.getElementById("phonenum");
  phonenum.innerHTML = sample.phone;

  let DOB = document.getElementById("dob");
  DOB.innerHTML = sample.dob;

  let gender = document.getElementById("gender");
  gender.innerHTML = sample.gender;

  let address = document.getElementById("address");
  address.innerHTML = sample.address;

  let skills = document.getElementById("skills");
  skills.innerHTML = sample.porgramming_skills;

  let language = document.getElementById("language");
  language.innerHTML = sample.language;
}

// Function to fill data to edit form feilds
function EditUser() {
  let programmingSkillList = JSON.parse(localStorage.getItem("skillsList"));
  let languagesUsed = JSON.parse(localStorage.getItem("languages"));
  const option = document.getElementById("prefferedLanguage");
  option.innerHTML = " ";
  for (var i = 0; i < languagesUsed.length; i++) {
    option.innerHTML +=
      "<option value=" +
      languagesUsed[i] +
      ">" +
      languagesUsed[i] +
      "</option>";
  }

  let sample = JSON.parse(sessionStorage.getItem("LoggedInUser"));
  let nameEdit = document.getElementById("nameEdit");
  nameEdit.value = sample.name.firstname;
  let lastnameEdit = document.getElementById("lastnameEdit");
  lastnameEdit.value = sample.name.lastname;

  let usernameEdit = document.getElementById("usernameEdit");
  usernameEdit.value = sample.email;

  let PhoneEdit = document.getElementById("phoneEdit");
  let indexOfPlus = sample.phone.indexOf(")");
  let onlyNumber = "";
  for (let index = indexOfPlus + 1; index < sample.phone.length; index++) {
    const element = sample.phone[index];
    onlyNumber += element;
  }
  PhoneEdit.value = onlyNumber;
  let DOB_Edit = document.getElementById("dobEdit");
  DOB_Edit.value = sample.dob;

  let addressEdit = document.getElementById("addressEdit");
  addressEdit.value = sample.address;

  let prefferedLanguage = document.getElementById("prefferedLanguage");
  prefferedLanguage.value = sample.language;

  let prefferedSkill = document.getElementById("prefferedSkill");
  prefferedSkill.value = sample.porgramming_skills;

  $("#prefferedSkill").tokenfield({
    autocomplete: {
      source: programmingSkillList,
      delay: 100,
    },
    showAutocompleteOnFocus: true,
  });
}

// Function to logout and navigate back to login screen
function LogOut() {
  sessionStorage.clear();
  window.location.href = "login.html";
}

// Function to show data in table format of all users present
function ViewUserAll() {
  let sample = JSON.parse(localStorage.getItem("users"));
  const tr = document.getElementById("allProfiles");
  tr.innerHTML = " ";
  for (var i = 0; i < sample.length; i++) {
    const skills = JSON.stringify(sample[i].porgramming_skills);
    tr.innerHTML +=
      "<tr>" +
      "<th scope=row>" +
      (i + 1) +
      "</th>" +
      "<td>" +
      (sample[i].name.firstname + " " + sample[i].name.lastname) +
      "</td>" +
      "<td>" +
      sample[i].email +
      "</td>" +
      "<td>" +
      sample[i].phone +
      "</td>" +
      "<td>" +
      sample[i].dob +
      "</td>" +
      "<td>" +
      sample[i].gender +
      "</td>" +
      "<td>" +
      sample[i].address +
      "</td>" +
      "<td>" +
      sample[i].language +
      "</td>" +
      "<td>" +
      skills +
      "</td>" +
      "<td>" +
      (sample[i].isAdmin ? "Admin" : "User") +
      "</td>" +
      "</tr>";
  }
}

// Function to automatically hide sidebar when a sidebar anchor or accordian is selected
function collapseSidebarMobileScreen() {
  var width = window.innerWidth;
  if (width < 555) {
    sidebar();
  }
}

// To show and hide sidebar
const sidebar = () => {
  const sidebar = document.getElementById("sidebar");
  const mainBody = document.getElementById("mainBody");
  if (sidebar.className == "col-md-3 d-block col-12 p-1 mt-3") {
    sidebar.className = "d-none col-md-3 col-12 p-1 mt-3";
    mainBody.className =
      "col-12 ms-md-3 p-4 pt-2 pb-5 my-3 py-5 pe-lg-0 ps-lg-1 pt-lg-3";
  } else {
    sidebar.classList = "col-md-3 d-block col-12 p-1 mt-3";
    mainBody.className =
      "col-9 p-4 pt-2 pb-5 my-3 py-5 pe-lg-0 ps-lg-1 pt-lg-3";
  }
};

// To show display of accordian view when accordian header is clicked
const pillToggle = () => {
  const sidebarItemList = document.getElementsByClassName("tab-content");

  for (let index = 0; index < sidebarItemList[0].children.length; index++) {
    const element = sidebarItemList[0].children[index];
    element.className = "container tab-pane fade";
  }

  const installed = document.getElementById("list-item-2");
  installed.className = "container tab-pane active";
  collapseSidebarMobileScreen();
};

// To block display of accordian header's view when another anchor is clicked
const pillToggleOff = () => {
  const installed = document.getElementById("list-item-2");
  installed.className = "container tab-pane fade";
  collapseSidebarMobileScreen();
};

// Ctrl+K Search Modal opening
window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.code === "KeyK") {
    e.preventDefault();
    const search = document.querySelector("#search");
    search.click();
  }
});

// Update feedback and display thank you message
const feedback = () => {
  const feedbackOption = document.getElementById("feedback");
  const thankMessage = document.getElementById("thankMessage");

  feedbackOption.classList.add("d-none");
  thankMessage.classList.remove("d-none");
  thankMessage.classList.add("d-block");
};
