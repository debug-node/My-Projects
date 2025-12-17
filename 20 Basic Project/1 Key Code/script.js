/**
 * Generates HTML markup displaying key event information.
 *
 * @param {string} key - The key value pressed by the user.
 * @param {string} code - The physical key code identifier.
 * @param {number|string} keyCode - The Unicode value of the key pressed.
 * @returns {string} HTML string containing key, code, and key code information.
 */
const container = document.getElementById("keyContainer");

container.innerHTML = generateHTML("-", "-", "-")

window.addEventListener("keydown", (e) => {

  container.innerHTML = generateHTML(e.key, e.code, e.key.charCodeAt(0));

});

function generateHTML(key, code, keyCode) {

  return `
    <div class="key-container">
      <h4>Key</h4>
      <div class="key-content">${key === " " ? "Space" : key}
      </div>
    </div>

    <div class="key-container">
      <h4>Code</h4>
      <div class="key-content">${code}
      </div>
    </div>

    <div class="key-container">
      <h4>Key Code</h4>
      <div class="key-content">${keyCode}
      </div>
    </div>

    `;

}

