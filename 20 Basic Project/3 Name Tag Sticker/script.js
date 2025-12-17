let wrapper = document.getElementsByClassName("wrapper")[0];
let template = document.getElementsByTagName("template")[0];

let names = ["Aditya", "Ritik", "Satyam", "Abhishek"];

let colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#800000",
  "#8B0000", "#FFA500", "#FFD700", "#6B8E23", "#7CFC00", "#000080", "#8B008B",
  "#F4A460", "#FF3855", "#FD3A4A", "#FB4D46", "#FA5B3D", "#FFAA1D",
  "#FFF700", "#299617", "#A7F432", "#2243B6", "#5DADEC", "#5946B2", "#9C51B6"
];

// Create each sticker
function sticker(name) {
  let div = template.content.firstElementChild.cloneNode(true);
  let nameOfStick = div.querySelector(".name");

  nameOfStick.innerHTML = name;

  // Random color and initial rotation
  div.style.background = colors[Math.floor(Math.random() * colors.length)];
  div.style.transform = "rotate(" + (Math.random() * 40 - 20) + "deg)";
  div.style.transition = "transform 1.5s ease, background 1.5s ease";

  wrapper.appendChild(div);
}

names.forEach(sticker);

// Function to update color and rotation smoothly
function updateStickers() {
  let stickers = document.querySelectorAll(".container");
  stickers.forEach(div => {
    // New random color
    div.style.background = colors[Math.floor(Math.random() * colors.length)];
    // Smoothly rotate to a new random angle
    div.style.transform = "rotate(" + (Math.random() * 40 - 20) + "deg)";
  });
}

// Change color + rotation every 2 seconds
setInterval(updateStickers, 1000);
