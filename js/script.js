// const MicroModal = require('micromodal'); // commonjs module

/* ========================== § DOM ELEMENTS === */
const bookmarkBtn = document.getElementById('bookmark-btn');

const headerNavContainer = document.getElementById('header-nav-container');
const hamburgerBtn = document.getElementById('hamburger-btn');
const headerNav = document.getElementById('header-nav');
const modalCloseBtn = document.getElementsByClassName('modal__close');

const pledgeEl = document.getElementsByClassName('pledge--check');
const pledgeCheckbox = document.getElementsByClassName('pledge__checkbox');
/* ========================== § BOOKMARK BUTTON === */
bookmarkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  bookmarkBtn.classList.toggle('bookmarked');
});

/* ========================== § HEADER NAV === */
hamburgerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  headerNavContainer.classList.toggle('open');

  headerNav.classList.toggle('focus-in');
});

/* ========================== § MODAL === */
// eslint-disable-next-line no-undef
MicroModal.init({
  disableScroll: true,
});

// CLOSE BTN
Array.from(modalCloseBtn).forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
  });
});

// EXPAND
// This function expands only the selected pledge, and closes the others.
function checkActive(el) {
  Array.from(el).forEach((pledge) => {
    if (pledge.querySelector('.pledge__checkbox').checked) {
      pledge.classList.add('checked');
    } else {
      pledge.classList.remove('checked');
    }
  });
}

Array.from(pledgeCheckbox).forEach((checkbox) => {
  checkbox.addEventListener('click', () => checkActive(pledgeEl));
});
