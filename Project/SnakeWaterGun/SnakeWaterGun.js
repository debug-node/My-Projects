// Snake Water Gun game

const buttons = document.querySelectorAll("button");
const resultText = document.getElementById("result");

const getChoiceName = (choice) => {
    if (choice === "S") return "🐍 Snake";
    if (choice === "W") return "💧 Water";
    if (choice === "G") return "🔫 Gun";
};

const match = (cpu, user) => {
    if (cpu === user) return "tie";
    else if (cpu === "S" && user === "W") return "cpu";
    else if (cpu === "S" && user === "G") return "user";
    else if (cpu === "G" && user === "W") return "user";
    else if (cpu === "G" && user === "S") return "cpu";
    else if (cpu === "W" && user === "S") return "user";
    else if (cpu === "W" && user === "G") return "cpu";
};

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const user = button.dataset.choice;
        const cpu = ["S", "W", "G"][Math.floor(Math.random() * 3)];

        const winner = match(cpu, user);

        let finalResult = "";
        if (winner === "user") {
            finalResult = "🎉 YOU WIN!";
        } else if (winner === "cpu") {
            finalResult = "❌ YOU LOSE!";
        } else {
            finalResult = "😐 MATCH TIED!";
        }

        resultText.innerHTML = `
        <p><b>CPU Choice:</b> ${getChoiceName(cpu)}</p>
        <p><b>Your Choice:</b> ${getChoiceName(user)}</p>
        <hr>
        <h2>${finalResult}</h2>
        `;
    });
});