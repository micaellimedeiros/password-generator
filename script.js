let passwordLength = 16;

const inputElement = document.querySelector("#password");
const length = document.querySelector("#length");

const uppercaseCheck = document.querySelector("#uppercase-check");
const numbersCheck = document.querySelector("#numbers-check");
const symbolsCheck = document.querySelector("#symbols-check");

const indicatorBar = document.querySelector("#indicator-bar");

function calculateQuality() {
  const percentage = Math.round(
    (passwordLength / 64) * 25 +
      (uppercaseCheck.checked ? 15 : 0) +
      (numbersCheck.checked ? 25 : 0) +
      (symbolsCheck.checked ? 35 : 0)
  );

  indicatorBar.style.width = `${percentage}%`;

  if (percentage < 39) {
    indicatorBar.className = "bar critical";
  } else if (percentage < 65) {
    indicatorBar.className = "bar warning";
  } else {
    indicatorBar.className = "bar safe";
  }
}

function generatePassword() {
  let password = "";
  let chars = "abcdefghjklmnpqrstuvwxyz";

  const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const numbersChars = "123456789";
  const symbolsChars = "!@#$%&*";

  if (uppercaseCheck.checked) {
    chars += uppercaseChars;
  }

  if (numbersCheck.checked) {
    chars += numbersChars;
  }

  if (symbolsCheck.checked) {
    chars += symbolsChars;
  }

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);

    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputElement.value = password;
  calculateQuality();
}

function calculateFontSize() {
  if (passwordLength > 45) {
    inputElement.style.fontSize = "1.2rem";
  } else if (passwordLength > 35) {
    inputElement.style.fontSize = "1.8rem";
  } else if (passwordLength > 25) {
    inputElement.style.fontSize = "2.2rem";
  } else {
    inputElement.style.fontSize = "3rem";
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(inputElement.value);
}

function refreshPassword() {
  generatePassword();
  calculateFontSize();
}

length.addEventListener("input", function () {
  passwordLength = length.value;
  document.querySelector("#password-length-text").textContent = passwordLength;

  generatePassword();
  calculateFontSize();
});

document.querySelector("#copy-1").addEventListener("click", copyToClipboard);
document.querySelector("#copy-2").addEventListener("click", copyToClipboard);
document.querySelector("#refresh").addEventListener("click", refreshPassword);

uppercaseCheck.addEventListener("input", generatePassword);
numbersCheck.addEventListener("input", generatePassword);
symbolsCheck.addEventListener("input", generatePassword);

generatePassword();
