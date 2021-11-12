/* ========================== § DOM ELEMENTS === */
const bookmarkBtn = document.getElementById("bookmark-btn");

/* ========================== § BOOKMARK BUTTON === */
bookmarkBtn.addEventListener("click", function (e) {
  e.preventDefault();
  bookmarkBtn.classList.toggle("bookmarked");
});
