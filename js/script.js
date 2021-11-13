/* ========================== § DOM ELEMENTS === */
const bookmarkBtn = document.getElementById("bookmark-btn");

const headerNavContainer = document.getElementById("header-nav-container");
const hamburgerBtn = document.getElementById("hamburger-btn");
const headerNav = document.getElementById("header-nav");

/* ========================== § BOOKMARK BUTTON === */
bookmarkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  bookmarkBtn.classList.toggle("bookmarked");
});

/* ========================== § HEADER NAV === */
hamburgerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  headerNavContainer.classList.toggle("open");

  headerNav.classList.toggle("focus-in");
});
