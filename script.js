const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const showBtn = document.getElementById("showBtn");

const strengthText = document.getElementById("strengthText");
const strengthFill = document.getElementById("strengthFill");
const message = document.getElementById("message");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}<>?";


// Password length display
lengthInput.addEventListener("input", function () {
    lengthValue.textContent = lengthInput.value;
});


// Generate password
function generatePassword() {

    let characters = "";

    if (uppercase.checked) {
        characters += upperChars;
    }

    if (lowercase.checked) {
        characters += lowerChars;
    }

    if (numbers.checked) {
        characters += numberChars;
    }

    if (symbols.checked) {
        characters += symbolChars;
    }

    // No option selected
    if (characters.length === 0) {
        passwordInput.value = "";
        strengthText.textContent = "None";
        strengthFill.style.width = "0%";
        message.textContent = "Select at least one option.";
        return;
    }

    const passwordLength = parseInt(lengthInput.value);
    let password = "";

    // Generate password
    for (let i = 0; i < passwordLength; i++) {

        const randomIndex = Math.floor(
            Math.random() * characters.length
        );

        password += characters[randomIndex];
    }

    // Put password in input
    passwordInput.value = password;

    // Update strength
    updateStrength(password);

    message.textContent = "Password generated successfully!";
}


// Password strength
function updateStrength(password) {

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    }

    if (score <= 2) {

        strengthText.textContent = "Weak";
        strengthText.style.color = "#ef4444";

        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ef4444";

    } else if (score <= 4) {

        strengthText.textContent = "Medium";
        strengthText.style.color = "#f59e0b";

        strengthFill.style.width = "65%";
        strengthFill.style.background = "#f59e0b";

    } else {

        strengthText.textContent = "Strong";
        strengthText.style.color = "#22c55e";

        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
    }
}


// Generate button
generateBtn.addEventListener("click", function () {
    generatePassword();
});


// Show / Hide button
showBtn.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showBtn.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        showBtn.textContent = "Show";
    }
});


// Copy button
copyBtn.addEventListener("click", function () {

    if (passwordInput.value === "") {
        message.textContent = "Generate a password first.";
        return;
    }

    navigator.clipboard.writeText(passwordInput.value)
        .then(function () {
            message.textContent = "Password copied!";
        })
        .catch(function () {
            message.textContent = "Copy failed. Copy manually.";
        });
});


// Generate password when page loads
generatePassword();