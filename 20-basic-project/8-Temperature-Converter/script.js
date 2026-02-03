function convertTemperature() {
    const celsiusInput = document.getElementById("celsius");
    const fahrenheitInput = document.getElementById("fahrenheit");
    const kelvinInput = document.getElementById("kelvin");

    const celsiusRaw = celsiusInput.value.trim();
    const fahrenheitRaw = fahrenheitInput.value.trim();
    const kelvinRaw = kelvinInput.value.trim();

    const celsiusProvided = celsiusRaw !== "";
    const fahrenheitProvided = fahrenheitRaw !== "";
    const kelvinProvided = kelvinRaw !== "";

    // Prefer Celsius if user entered more than one value
    if (celsiusProvided && !isNaN(Number(celsiusRaw))) {

        const c = Number(celsiusRaw);
        const f = (c * 9 / 5) + 32;
        const k = c + 273.15;

        fahrenheitInput.value = f.toFixed(2);
        kelvinInput.value = k.toFixed(2);
        return;
    }

    // Fahrenheit → Celsius + Kelvin
    if (fahrenheitProvided && !isNaN(Number(fahrenheitRaw))) {

        const f = Number(fahrenheitRaw);
        const c = (f - 32) * 5 / 9;
        const k = c + 273.15;

        celsiusInput.value = c.toFixed(2);
        kelvinInput.value = k.toFixed(2);
        return;
    }

    // Kelvin → Celsius + Fahrenheit
    if (kelvinProvided && !isNaN(Number(kelvinRaw))) {

        const k = Number(kelvinRaw);
        const c = k - 273.15;
        const f = (c * 9 / 5) + 32;

        celsiusInput.value = c.toFixed(2);
        fahrenheitInput.value = f.toFixed(2);
        return;
    }

    // If nothing valid
    alert("Please enter a valid number in Celsius, Fahrenheit or Kelvin.");
}

function resetInputs() {
    document.getElementById("celsius").value = "";
    document.getElementById("fahrenheit").value = "";
    document.getElementById("kelvin").value = "";
    document.getElementById("celsius").focus();
}
