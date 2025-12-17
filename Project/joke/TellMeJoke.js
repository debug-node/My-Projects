// Tell me a Joke

const myJokes = [
    "This line doesn't actually do anything, but the code stops working when I delete it.",
    "Honey, go to the store and buy some eggs.\nOK.\nOh and while you're there, get some milk.\nHe never returned.",
    "Saying that Java is nice because it works on every OS is like saying that something is nice because it works everywhere.",
    "Hey Girl,\nRoses are #ff0000,\nViolets are #0000ff,\nI use hex codes,\nBut I'd use RGB for you.",
    "We messed up the kerning again guys.",
    "A SQL statement walks into a bar and sees two tables.\nIt asks: may I join you?",
    "Two SQL tables sit at the bar.\nA query asks: Can I join you?",
    "Documentation is like life.\nWhen it's good, it's very good.\nWhen it's bad, it's still better than nothing.",
    "Can I tell you a TCP joke?\nPlease tell me a TCP joke.\nOK, I'll tell you a TCP joke.",
    "A byte walks into a bar.\nBartender: What's wrong?\nByte: Parity error.\nBartender: You do look a bit off.",
    "UDP is better sometimes because it avoids unnecessary handshakes.",
    "I'll never forget my granddad's last words to me:\nAre you still holding the ladder?",
    "My wife got angry because I have no sense of direction.\nSo I packed my bags and right.",
    "Debugging is like being the detective in a crime movie where you're also the criminal.",
    "The glass is neither half full nor half empty.\nThe glass is twice as big as it needs to be.",
    "Eight bytes walk into a bar.\nBartender: What will you have?\nBytes: Make us a double.",
    "How do you make holy water?\nYou boil the hell out of it.",
    "I've got a really good UDP joke to tell you, but I don’t know if you'll get it.",
    "I hate double standards.\nDo something officially and it's respectful.\nDo it privately and it's suspicious.",
    "What does a MacBook have in common with a famous politician?\nI won’t compare apples to oranges."
];

const jokeBtn = document.getElementById("jokeBtn");
const joke = document.getElementById("joke");
const home = document.getElementById("home");
const jokes = document.getElementById("jokes");

function showRandomJoke() {
    const randomIndex = Math.floor(Math.random() * myJokes.length);
    joke.innerText = myJokes[randomIndex];
}

function showAllJokes() {
    joke.innerHTML = myJokes
        .map((j, i) => `<p>${i + 1}. ${j}</p>`)
        .join("");
}

jokeBtn.addEventListener("click", showRandomJoke);

jokes.addEventListener("click", showAllJokes);
home.addEventListener("click", () => {
    joke.innerText = "";
});