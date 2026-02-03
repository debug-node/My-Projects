const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');

const redValueSpan = document.getElementById('redValue');
const greenValueSpan = document.getElementById('greenValue');
const blueValueSpan = document.getElementById('blueValue');

const colorBox = document.getElementById('color-box');
const copyButton = document.getElementById('copyButton');
const randomButton = document.getElementById('randomButton');
const inputTypeRGBValue = document.getElementById('inputType');

redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);
copyButton.addEventListener('click', copyRGBValue);

function updateColor() {
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;

    // console.log(redValue, greenValue, blueValue);

    const rgbColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
    colorBox.style.backgroundColor = rgbColor;

    redValueSpan.textContent = redValue;
    greenValueSpan.textContent = greenValue;
    blueValueSpan.textContent = blueValue;

    inputTypeRGBValue.textContent = rgbColor;

    colorBox.classList.add('pulse');
    clearTimeout(colorBox._pulseTimeout);
    colorBox._pulseTimeout = setTimeout(() => {
        colorBox.classList.remove('pulse');
    }, 220);
}
randomButton.addEventListener('click', () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    redSlider.value = r;
    greenSlider.value = g;
    blueSlider.value = b;
    updateColor();
});
updateColor();

function copyRGBValue() {
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;

    const rgbColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

    navigator.clipboard.writeText(rgbColor)
        .then(() => {
            // Change button text temporarily
            const original = copyButton.textContent;
            copyButton.textContent = 'Copied!';
            // small highlight on box
            const prevShadow = colorBox.style.boxShadow;
            colorBox.style.boxShadow = '0 20px 48px rgba(15,23,42,0.42)';
            setTimeout(() => {
                copyButton.textContent = original;
                colorBox.style.boxShadow = prevShadow;
            }, 900);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy. Please try again.');
        });

}