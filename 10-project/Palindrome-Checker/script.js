function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

function palindromeChecker() {
    const inputText = document.getElementById('inputText');
    const result = document.getElementById('result');
    const text = inputText.value.trim();

    if (text === "") {
        result.textContent = "⚠️ Please enter a word!";
        result.style.color = "#d9534f";
    } else if (isPalindrome(text)) {
        result.textContent = `✅ "${text}" is a palindrome!`;
        result.style.color = "#28a745";
    } else {
        result.textContent = `❌ "${text}" is not a palindrome.`;
        result.style.color = "#dc3545";
    }

    result.classList.add('show');
    inputText.value = '';
}

document.getElementById('checkButton').addEventListener('click', palindromeChecker);