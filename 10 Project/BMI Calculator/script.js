document.getElementById("bmiform").addEventListener("submit", function (e) {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const heightFeet = parseInt(document.getElementById("height-feet").value);
    const heightInches = parseInt(document.getElementById("height-inches").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const resultElement = document.getElementById("result");

    // Validation
    if (!gender || isNaN(age) || isNaN(heightFeet) || isNaN(heightInches) || isNaN(weight)) {
        alert("Please fill all fields correctly.");
        return;
    }

    // Convert height to meters
    const heightInMeters = ((heightFeet * 12) + heightInches) * 0.0254;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    let category = "";
    let tip = "";
    let cssClass = "";

    if (bmi < 18.5) {
        category = "Underweight";
        tip = "Increase your calorie intake with healthy food and consult a nutritionist.";
        cssClass = "underweight";
    } else if (bmi < 24.9) {
        category = "Normal Weight";
        tip = "Maintain your healthy lifestyle with a balanced diet and regular exercise.";
        cssClass = "normal";
    } else if (bmi < 29.9) {
        category = "Overweight";
        tip = "Consider a fitness plan and a balanced diet to reduce weight.";
        cssClass = "overweight";
    } else {
        category = "Obese";
        tip = "Seek medical advice and adopt a structured diet and exercise routine.";
        cssClass = "obese";
    }

    // Display result with category and tips
    resultElement.style.display = "block";
    resultElement.className = cssClass;
    resultElement.innerHTML = `
        Gender: ${gender} <br>
        Age: ${age} <br>
        Your BMI: <strong>${bmi.toFixed(2)}</strong> <br>
        Category: <strong>${category}</strong> <br>
        <small>${tip}</small>
    `;
});
