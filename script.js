const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const freqText = document.getElementById("frequencyText");
const broadcastText = document.getElementById("broadcastText");
const freqDisplay = document.querySelector(".frequency-display");
const broadcastDisplay = document.querySelector(".broadcast-message");

// --- AUDIO ASSETS ---
const bgMusic = new Audio('audio/radio-station-tuning.mp3');
const clickSound = new Audio('audio/click-audio.mp3');

bgMusic.loop = true;
bgMusic.volume = 0.4; 


startScreen.addEventListener("click", () => {
    // 1. CLICK SOUND (Plays immediately)
    clickSound.currentTime = 0;
    clickSound.play();

    // 2. UNLOCK BACKGROUND AUDIO
    // We 'start' it here so the phone allows it, then pause so it 
    // doesn't actually make noise until the tuning starts.
    bgMusic.play().then(() => {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }).catch(error => {
        console.log("Mobile audio auto-play blocked:", error);
    });

    // 3. TRANSITION
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    gameScreen.style.opacity = "1";

    // 4. DELAYED TUNING
    setTimeout(startRadioTuning, 1000); 
});

function startRadioTuning() {
    bgMusic.play();

    const targetFreq = 49.0;
    const totalJumps = 6;
    let currentJump = 0;

    // Adjusted to 1.2 seconds per jump to hit the ~7s mark for the final lock
    function jump() {
        if (currentJump < totalJumps) {
            let randomFreq = (Math.random() * 20 + 88.1).toFixed(1);
            freqText.textContent = randomFreq;
            
            currentJump++;
            setTimeout(jump, 1200); 
        } else {
            // NO CLICK HERE - Purely visual lock-on
            freqText.textContent = targetFreq.toFixed(1);
            showFinalLockOn();
        }
    }

    jump();
}

function showFinalLockOn() {
    freqDisplay.classList.add("locked");
    broadcastDisplay.classList.add("locked");

    broadcastText.textContent = "SIGNAL ACQUIRED";
    
    // Final messages appearing within the 10s window
    setTimeout(() => { broadcastText.textContent = "STRONG."; }, 800);
    setTimeout(() => { broadcastText.textContent = "STEADY."; }, 1600);
    setTimeout(() => { broadcastText.textContent = "ALWAYS THERE."; }, 2400);
    setTimeout(() => { broadcastText.textContent = "HAPPY BIRTHDAY!"; }, 3600);

}