function factorial() {
    // Get the number from input box
    let input = document.getElementById("numberInput").value;
    let number = Number.parseInt(input);

    // Validate input
    if (isNaN(number)) {
        document.getElementById("result").innerText = "Please enter a valid number";
        return;
    }

    if (number < 0) {
        document.getElementById("result").innerText = "Factorial not defined for negative numbers";
        return;
    }

    if (number === 0) {
        document.getElementById("result").innerText = "Factorial of 0 is 1";
        return;
    }

    // Calculate factorial
    let result = 1;
    for (let index = 1; index <= number; index++) {
        result = result * index
    }

    // Display result
    document.getElementById("result").innerText = `Factorial of ${number} is ${result}`;
}
