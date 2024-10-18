"use strict";

//accounts array

let accountsArr = [
  {
    firstName: "Ammar",
    lastName: "Bouzenka",
    transactions: [600, 5000, -1000, 200, 6250.2, 50],
    intrestRate: 1.25,
    user: "Ammar25",
    pin: "1234",
    currency: 0,
  },
  {
    firstName: "Iyed",
    lastName: "Kabel",
    transactions: [1600, -5000, 15000],
    intrestRate: 1.0,
    user: "Iyed13",
    pin: "1234",
    currency: 1,
  },
  {
    firstName: "Brahim",
    lastName: "Bouzenka",
    transactions: [8800, -1000, -1000],
    intrestRate: 0.7,
    user: "Ibra89",
    pin: "1234",
    currency: 2,
  },
];

//currencies
let currencies = [" € ", " $ ", " £ "];

//current user object
let currentUser = {
  firstName: "",
  lastName: "",
  transactions: [],
  intrestRate: 0,
  user: "",
  pin: "",
  currency: 0,
};

//system date
let now = new Date();

//var to store the interval id to stop the timer whenever we log out
let intervalId;

let hasInterval = false;

//DOM ELEMENTS
let userInputEl = document.querySelector(".user-input");
let pinInputEl = document.querySelector(".pin-input");
let logInBtnEl = document.querySelector(".log-in-btn");

let welcomeMessageEl = document.querySelector(".welcom-message");
let clientNameEl = document.querySelector(".client-name");
let assetsEl = document.querySelector(".assets");
let currencyEl = document.querySelectorAll(".currency");
let dateTimeEl = document.querySelector(".date-time");

let inAmmountEl = document.querySelector(".in-ammount");
let outAmmountEl = document.querySelector(".out-ammount");
let intrestAmmountEl = document.querySelector(".intrest-ammount");
let sortBtnEl = document.querySelector(".sort-btn");

let timerEl = document.querySelector(".timer");

let destinationInputEl = document.querySelector(".destination-input");
let ammountInputEl = document.querySelector(".ammount-input");
let sendBtnEl = document.querySelector(".send-btn");

let loanAmmountInputEl = document.querySelector(".loan-ammount-input");
let loanRequestBtnEl = document.querySelector(".request-btn");

let comfirmUserInputEl = document.querySelector(".comfirm-user-input");
let comfirmPinInputEl = document.querySelector(".comfirm-pin-input");
let closeAccountBtnEl = document.querySelector(".close-account-btn");

let mainScreenEl = document.querySelector(".body-inner-container");

let transactionsContainerEl = document.querySelector(".transactions-container");

/*console.log(userInputEl);
console.log(pinInputEl);
console.log(logInBtnEl);*/

/*declaring functions*/

function logIn(user, pin) {
  let isFound = false;

  accountsArr.forEach((acc) => {
    if (acc.user === user && acc.pin === pin) {
      findCurrentUser(acc);

      isFound = true;
    }
  });

  return isFound;
}

//set the current user properties as the logged in user
function findCurrentUser(user) {
  currentUser = user;
}

function displayTheMainScreen() {
  mainScreenEl.style.opacity = "1";
}

function clearTextBoxes(input) {
  input.value = "";
}

function calculateAssets(currentuser) {
  let balance = 0;

  currentuser.transactions.forEach((item) => {
    balance += item;
  });

  return balance;
}

function calculateInAmmount(currentuser) {
  let deposits = 0;

  currentuser.transactions.forEach((item) => {
    if (item > 0) {
      deposits += item;
    }
  });

  return deposits;
}

function calculateOutAmmount(currentuser) {
  let withdrawls = 0;

  currentuser.transactions.forEach((item) => {
    if (item < 0) {
      withdrawls += item;
    }
  });

  return Math.abs(withdrawls);
}

function calculateIntrest(currentuser) {
  let intrest = (calculateAssets(currentuser) * currentuser.intrestRate) / 100;
  return intrest;
}

function updateCurrency(currentuser) {
  currencyEl.forEach((el) => {
    el.textContent = currencies[currentuser.currency];
  });
}

function formatMoney(ammount) {
  return ammount.toFixed(2).replace(".", ",");
}

function updateClientInfos(currentuser) {
  clientNameEl.textContent = currentuser.firstName;
  assetsEl.textContent = formatMoney(calculateAssets(currentuser));
  inAmmountEl.textContent = formatMoney(calculateInAmmount(currentuser));
  outAmmountEl.textContent = formatMoney(calculateOutAmmount(currentuser));
  intrestAmmountEl.textContent = formatMoney(calculateIntrest(currentuser));

  //set the currency symbol based on the current client's currency
  updateCurrency(currentuser);
}

function logInAndUpdateScreen() {
  if (logIn(userInputEl.value, pinInputEl.value)) {
    updateSystemDate();
    increaseTime();
    displayTheMainScreen();
    updateClientInfos(currentUser);
    displayWelcomeMessage();
    updateWelcomeMessage();
    clearTextBoxes(userInputEl);
    clearTextBoxes(pinInputEl);

    renderTransactionsList(currentUser);
  }
}

function displayWelcomeMessage() {
  welcomeMessageEl.style.opacity = "1";
  clientNameEl.style.cssText = `
        opacity:1;
        font-size:22px;
        font-weight:600;
    `;
}

function updateSystemDate() {
  now.setTime(Date.now());

  dateTimeEl.textContent = formatDate(now);
}

//update the app time accordingly with the system date time
function increaseTime()
{
  let sec = now.getSeconds();
  setInterval(()=>{
    now.setSeconds(sec++);
    dateTimeEl.textContent = formatDate(now);
    if(sec>60)
      sec=1;

  },1000);
}

function updateWelcomeMessage() {
  now.setTime(Date.now());

  if (now.getHours() >= 0 && now.getHours() < 4) {
    welcomeMessageEl.textContent =
      "Good Night ," + clientNameEl.textContent + " !";
  } else if (now.getHours() >= 4 && now.getHours() < 12) {
    welcomeMessageEl.textContent =
      "Good Morning ," + clientNameEl.textContent + " !";
  } else if (now.getHours() >= 12 && now.getHours() < 19) {
    welcomeMessageEl.textContent =
      "Good afternoon ," + clientNameEl.textContent + " !";
  } else if (now.getHours() >= 19 && now.getHours() <= 23) {
    welcomeMessageEl.textContent =
      "Good evening ," + clientNameEl.textContent + " !";
  }
}

function formatDate(date , showTime = true) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2,"0");
  const mins = String(date.getMinutes()).padStart(2,"0");
  return showTime? `${day}/${month}/${year}  ${hours}:${mins}`: `${day}/${month}/${year}`;
}

function updateTransactionsWindow(tran, i, currentuser) {
  now.setTime(Date.now());

  //specify the transaction type
  let transactionName = tran > 0 ? " deposit " : " withdraw ";

  let transaction = document.createElement("div");
  let transactionInfoContainer = document.createElement("div");
  let transactionType = document.createElement("span");
  let transactionNumber = document.createElement("span");
  let transactionDate = document.createElement("span");

  let transactionAmmountContainer = document.createElement(
    "transaction-ammount-container"
  );
  let transactionAmmount = document.createElement("span");
  let transactionCurrency = document.createElement("sapn");

  transaction.className = "transaction";
  transactionInfoContainer.className = "transaction-infos-container";
  transactionType.className = "transaction-type";
  transactionNumber.className = "transaction-number";
  transactionDate.className = "transaction-date";

  transactionAmmountContainer.className = "transaction-ammount-container";
  transactionAmmount.className = "transaction-ammount-container";
  transactionCurrency.className = "transaction-ammount-container";

  transactionNumber.textContent = i + 1;
  transactionType.textContent = transactionName;
  transactionDate.textContent = formatDate(now,false);
  transactionAmmount.textContent = formatMoney(tran);
  transactionCurrency.textContent = currencies[currentuser.currency];

  //set the background of the transactiontype based on the transaction type itself
  transactionType.style.backgroundColor =
    tran > 0 ? "rgba(4, 131, 4, 0.712)" : "crimson";

  //apend elements
  transactionType.prepend(transactionNumber);
  transactionInfoContainer.append(transactionType);
  transactionInfoContainer.append(transactionDate);

  transactionAmmount.append(transactionCurrency);
  transactionAmmountContainer.append(transactionAmmount);

  transaction.append(transactionInfoContainer);
  transaction.append(transactionAmmountContainer);

  transactionsContainerEl.prepend(transaction);
}

function renderTransactionsList(currentuser) {
  transactionsContainerEl.innerHTML = "";
  currentuser.transactions.forEach((tran, i) => {
    updateTransactionsWindow(tran, i, currentuser);
  });
}

function sortTransactions() {
  let trans;
  let subUser;
  //make sure that the current user is already logged in to evade null value to object and trans arr
  if (currentUser) {
    //store a copy of user object in an other object to keep the unordered array transactions
    subUser = Object.assign({}, currentUser);
    //copy of the unsorted array of transactions
    trans = [...subUser.transactions];
  }

  let isSorted = false;

  sortBtnEl.addEventListener("click", () => {
    if (!isSorted) {
      currentUser.transactions.sort((a, b) => a - b);

      renderTransactionsList(currentUser);
      isSorted = true;
    } else {
      
      subUser.transactions = trans;
      renderTransactionsList(subUser);
      isSorted = false;
    }
  });
}

function startTheCountDown(mins, secs) {
 
  if(hasInterval)
    {
      clearInterval(intervalId);
      hasInterval = false;
    }

  let totalseconds = mins * 60 + secs;
  hasInterval = true
  let minutes = "";
  let seconds = "";
  intervalId = setInterval(() => {
    if (totalseconds <= 0) {
      clearInterval(intervalId);
      //perform log-out
      logOut();
      return;
    }

    totalseconds--;

    minutes = Math.floor(totalseconds / 60);
    seconds = totalseconds % 60;

    timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }, 1000);
}

function logOut() {
  currentUser = null;
  mainScreenEl.style.opacity = "0";
  welcomeMessageEl.style.opacity = "0";
  //stop the timer to restart it with every log in operation
  clearInterval(intervalId);
}

function isDegit(value) {
  //check if the input value is a number
  return /\d/g.test(value);
}

function performLogIn() {
  //log in using the log-in button
  logInBtnEl.addEventListener("click", () => {
    logInAndUpdateScreen();
    sortTransactions();
    startTheCountDown(10, 1);
  });

  //log in using the Enter button
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      logInAndUpdateScreen();
      sortTransactions();
      startTheCountDown(10, 1);
    }
  });
}

function deposit(client, ammount) {
  client.transactions.push(Number(ammount));
}

function withdraw(client, ammount) {
  client.transactions.push(Number(-ammount));
}

function transferMoney(value, destinationAccount, currentuser) {
  //find the destination client
  let destinationClient = accountsArr.find(
    (acc) => acc.user === destinationAccount
  );

  clearTextBoxes(destinationInputEl);
  clearTextBoxes(ammountInputEl);
  //check for valid data
  if (!destinationClient || !currentuser || !isDegit(value)) {
    return;
  }

  setTimeout(() => {
    withdraw(currentuser, value);
    deposit(destinationClient, value);
    renderTransactionsList(currentuser);
    updateClientInfos(currentuser);
  }, 2000);
}

function performTransfer() {
  sendBtnEl.addEventListener("click", () => {
    transferMoney(ammountInputEl.value, destinationInputEl.value, currentUser);
  });
}

function requestLoan(currentuser, value) {
  clearTextBoxes(loanAmmountInputEl);

  if (!currentuser || !isDegit(value)) return;

  setTimeout(() => {
    deposit(currentuser, value);
    renderTransactionsList(currentuser);
    updateClientInfos(currentuser);
  }, 2000);
}

function PerformLoanRequest() {
  loanRequestBtnEl.addEventListener("click", () => {
    requestLoan(currentUser, loanAmmountInputEl.value);
  });
}

function deleteAccount(user, pin) {
  accountsArr.forEach((acc, i, arr) => {
    if (acc.user === user && acc.pin === pin) {
      //perform deletion
      arr.splice(i, 1);
    }
  });
}

function closeAccount(user, pin) {
  clearTextBoxes(comfirmUserInputEl);
  clearTextBoxes(comfirmPinInputEl);
  if (!user || !pin) {
    return;
  }
  let accountToClose = accountsArr.find(
    (acc) => acc.user === user && acc.pin === pin
  );

  if (
    !accountToClose ||
    !(
      accountToClose.pin === currentUser.pin &&
      accountToClose.user === currentUser.user
    )
  )
    return;

  setTimeout(() => {
    deleteAccount(user, pin);
    logOut();
  }, 1500);
}

function performAccountDeletion() {
  closeAccountBtnEl.addEventListener("click", () => {
    closeAccount(comfirmUserInputEl.value, comfirmPinInputEl.value);
  });
}

//start the program

performLogIn();

performTransfer();

PerformLoanRequest();

performAccountDeletion();


