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
