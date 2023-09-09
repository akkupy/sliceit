"use strict";

const SliceitInput = document.querySelector(".url-input");
const SliceitBackInput = document.querySelector(".back-input");
const shortlyBtn = document.querySelector(".url-button");
const parentNode = document.querySelector(".search-result-block");
const errorMsg = document.querySelector(".error-msg");
const errorMsg1 = document.querySelector(".error-msg1");
const resetResults = document.querySelector(".reset-results");
const sectionThree = document.querySelector(".section-3");

let resultSkeleton = ''
let resultStorage = [];



//URL Validiation
function urlValidation(defaultUrl) {
  const urlRule =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (defaultUrl.match(urlRule)) {
    return true;
  } else {
    return false;
  }
}

// URL Submission Click Event
shortlyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = SliceitInput.value;
  let backValue = SliceitBackInput.value;
  //URL Validation
  if (!urlValidation(inputValue)) {
    errorMsg.classList.add("shown");
   SliceitInput.classList.add("shown");
    errorMsg.innerHTML = "Please enter a link";
  } else {
    errorMsg.classList.remove("shown");
   SliceitInput.classList.remove("shown");
    //Passed Validation - init API
    fetch(`http://127.0.0.1:8000/api/slice/?backhalf=` + backValue + `&url=` + inputValue)
      .then((response) => response.json())
      .then((response) => { 
        if (response.stat == 'false')  {
          errorMsg1.classList.add("shown");
          SliceitBackInput.classList.add("shown");
          errorMsg1.innerHTML = "Back Half is already used.";
        }
        else {
          errorMsg1.classList.remove("shown");
          SliceitBackInput.classList.remove("shown");
          let shortlyCode = response.result.code;

          resultSkeleton = `<div class="result">
          <p class="inserted-link">${inputValue}</p>
          <hr class="result-block-hr">
          <div class="results">
            <p class="short-code">${shortlyCode}</p>
            <button class="copy-btn">Copy</button>
          </div>
          </div>`;

          //check if I have some storage and show results from it
          if (sessionStorage.getItem("resultsStorage") !== null) {
            resultStorage = [resultSkeleton, sessionStorage.getItem("resultsStorage")].reverse();
            parentNode.innerHTML = [resultStorage].join().replaceAll(',', "");

            sessionStorage.setItem("resultsStorage", [resultStorage].join().replaceAll(',', ""));
            resetResults.classList.add("active");
          }
          //if I don't have storage just show the first/current result
          else {
            parentNode.innerHTML = resultSkeleton;
            //then push this first result to my storage and then session storage
            resultStorage.push(resultSkeleton);
            sessionStorage.setItem("resultsStorage", resultStorage);
            resetResults.classList.add("active");
          }
        }
      });
  }
});

parentNode.addEventListener("click", function (e) {
  e.stopPropagation();
  let copyBtn;
  if (e.target.parentNode !== null) {
    copyBtn = e.target.parentNode.querySelector(".copy-btn");
  }

  if (e.target.classList.value === 'copy-btn') {
    let textToCopy = e.target.parentNode.querySelector(".short-code").textContent;
    navigator.clipboard.writeText(textToCopy);
  }
  else {
    return null;
  }
  //Change CSS
  copyBtn.textContent = "Copied!";
  copyBtn.style.backgroundColor = "var(--dark-violet)";
  setTimeout(function () {
    copyBtn.textContent = "Copy";
    copyBtn.style.backgroundColor = "var(--cyan)";
  }, 1000);
});



sectionThree.addEventListener("click", (e) => {
  if (e.target.classList.value === resetResults.classList.value) {
    sessionStorage.clear();
    parentNode.innerHTML = "";
   SliceitInput.value = "";
   SliceitBackInput.value = "";
    resultStorage = [];
    resetResults.classList.remove("active");
  }
  else sectionThree.removeEventListener("click");

})


// Reload function
window.addEventListener("load", () => {
  if (sessionStorage.getItem("resultsStorage") !== null) {
    parentNode.innerHTML = sessionStorage.getItem("resultsStorage");
    resetResults.classList.add("active");
  }
  else {
    parentNode.innerHTML = "";

  }

})


//Hamburger Menu
const burgerIcon = document.querySelector(".fa-bars");
const navMenu = document.querySelector(".menu-section");
const mainElement = document.querySelector(".main-container");

//Toggle Menu
const menuToggle = () => navMenu.classList.toggle("show");
//Remove Menu
const removeMenu = () => navMenu.classList.remove("show");

//Toggle menu with hamburger
burgerIcon.addEventListener("click", function () {
  menuToggle();
});

//Remove menu by clicking outside navigation
mainElement.addEventListener("click", function () {
  removeMenu();
});

/* Login Stuff */

const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", disableScroll);
formCloseBtn.addEventListener("click", enableScroll);

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});


/* Scroll */

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  home.classList.add("show")
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  home.classList.remove("show")
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

/* password validation */

const password = document.getElementById("password");
const password1 = document.getElementById("password1");

var lowerUpperNumberSpclLetters = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

password.addEventListener("input", (event) => {
  if (password.value.match(lowerUpperNumberSpclLetters)) {
    password.setCustomValidity("");
  } else {
    password.setCustomValidity("Password should contain 8-15 characters and lowerCase,upperCase,numericals & special characters.");
  }

});

password1.addEventListener("input", (event) => {
  if (password1.value!=password.value) {
    password1.setCustomValidity("Password Mismatch !");
  } else {
    password1.setCustomValidity("");
  }
});
