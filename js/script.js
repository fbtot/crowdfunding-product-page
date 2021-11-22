const data = {
  total: 89997,
  target: 100000,
  percent() {
    const percent = Math.floor((this.total / this.target) * 100);
    return percent <= 100 ? percent : 100;
  },
  backers: 5007,
  daysLeft: 56,
  rewards: {
    'no-reward': {
      left: 0,
    },
    bambooStand: {
      left: 101,
      minPledge: 25,
    },
    blackEdition: {
      left: 64,
      minPledge: 75,
    },
    mahogany: {
      left: 0,
      minPledge: 200,
    },
  },
};
// const MicroModal = require('micromodal'); // commonjs module

/* ========================== § DOM ELEMENTS === */
const bookmarkBtn = document.getElementById('bookmark-btn');
const backThisProjectBtn = document.getElementById('backThisProject');

const headerNavContainer = document.getElementById('header-nav-container');
const hamburgerBtn = document.getElementById('hamburger-btn');
const headerNav = document.getElementById('header-nav');
const modalCloseBtn = document.getElementsByClassName('modal__close');

const pledgeEl = document.getElementsByClassName('pledge');
const pledgeCheckEl = document.getElementsByClassName('pledge--check');
const pledgeCheckbox = document.getElementsByClassName('pledge__checkbox');
const enterButton = document.getElementsByClassName('pledge__enter__button');
const pledgeSelectBtn = document.getElementsByClassName('pledge__select');
const closeModalCompletedBtn = document.getElementById('closeModalCompleted');

// Fields to update

const totalAmountEl = document.getElementById('totalAmount');
const backersEl = document.getElementById('backers');
const daysLeft = document.getElementById('daysLeft');
const progressBarEl = document.getElementById('progress-bar');

/* ========================== § BOOKMARK BUTTON === */
bookmarkBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (bookmarkBtn.classList.contains('bookmarked')) {
    bookmarkBtn.classList.remove('bookmarked');
    bookmarkBtn.querySelector('span').innerText = 'Bookmark';
  } else {
    bookmarkBtn.classList.add('bookmarked');
    bookmarkBtn.querySelector('span').innerText = 'Bookmarked';
  }
});

/* ========================== § HEADER NAV === */
hamburgerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  headerNavContainer.classList.toggle('open');
  headerNav.classList.toggle('focus-in');
});

/* ========================== § MODAL === */

// OPEN MODAL 1
Array.from(pledgeSelectBtn).forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    MicroModal.show('modal-1');
  });
});

backThisProjectBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  MicroModal.show('modal-1');
});

// CLOSE MODAL 1
Array.from(modalCloseBtn).forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    MicroModal.close('modal-1');
  });
});

// CLOSE MODAL 2
closeModalCompletedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  MicroModal.close('modal-1');
  MicroModal.close('modal-2');
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
  checkbox.addEventListener('click', () => checkActive(pledgeCheckEl));
});

function inputContainer(button) {
  return button.closest('.pledge__enter__input-button-container');
}

function closerInput(button) {
  return inputContainer(button).getElementsByClassName('pledge__enter__input')[0];
}

function thisPledge(el) {
  return el.closest('.pledge');
}

function thisReward(button) {
  return thisPledge(button).getAttribute('data-reward');
}

function thisPledgeAmount(button) {
  return thisPledge(button).getElementsByClassName('pledge__enter__input')[0].value;
}

// function thisLeft(button) {
//   return thisPledge(button).querySelector('.pledge__left span');
// }

// SET DATA
function setTotalAmount() {
  totalAmountEl.innerText = data.total.toLocaleString('en-US');
}

function setBackers() {
  backersEl.innerText = data.backers.toLocaleString('en-US');
}

function setDaysLeft() {
  daysLeft.innerText = data.daysLeft.toLocaleString('en-US');
}

function setRewardsLeft() {
  Array.from(pledgeEl).forEach((pledge) => {
    if (pledge.querySelector('.pledge__left span') !== null) {
      const currentPledgeLeftEl = pledge.querySelector('.pledge__left span');
      currentPledgeLeftEl.innerText = data.rewards[thisReward(pledge)].left;
    }
  });
}

setRewardsLeft();

function setProgressBarValue() {
  // eslint-disable-next-line
  anime({
    targets: progressBarEl,
    value: [0, data.percent()],
    duration: 1500,
    easing: 'easeInOutExpo',
  });
}

// Update function
function updateEverything() {
  setTotalAmount();
  setBackers();
  setDaysLeft();
  setProgressBarValue();
  setRewardsLeft();
}

updateEverything();

// VALIDATION
Array.from(enterButton).forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (closerInput(button).checkValidity()) {
      inputContainer(button).classList.remove('error');
      // eslint-disable-next-line no-undef
      MicroModal.show('modal-2');

      // UPDATE DATA
      data.rewards[thisReward(button)].left -= 1;
      data.backers += 1;
      data.total += Number(thisPledgeAmount(button));

      // UPDATE DOM
      thisPledge(button).getElementsByClassName('pledge__enter__input')[0].value = data.rewards[thisReward(button)].minPledge;
      updateEverything();
    } else {
      inputContainer(button).classList.add('error');
    }
  });
});
