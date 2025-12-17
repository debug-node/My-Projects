function calculateLove() {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();
    const result = document.getElementById("result");

    // Validation
    if (name1 === "" || name2 === "") {
        alert("Please enter both names.");
        return;
    }

    // Generate random percentage
    const lovePercentage = Math.floor(Math.random() * 101);
    

    // Reset previous content and add fade-in effect
    result.classList.remove("show-result");
    result.innerHTML = "";

    setTimeout(() => {
        result.classList.add("show-result");

        // Animated percentage display
        let count = 0;
        const interval = setInterval(() => {
            result.innerHTML = `${name1} ❤️ ${name2}<br>Love Percentage: ${count}%`;
            count++;
            if (count > lovePercentage) {
                clearInterval(interval);

                // Final message based on percentage
                if (lovePercentage < 30) {
                    result.innerHTML += "<br>💔 Not a Great Match. Keep Looking!";
                } else if (lovePercentage >= 30 && lovePercentage < 70) {
                    result.innerHTML += "<br>😊 There is potential. Give it a try!";
                } else {
                    result.innerHTML += "<br>💖 Great Match! Love is in the Air!";
                }
            }
        }, 20); // Speed of animation (lower = faster)
    }, 100);
}
