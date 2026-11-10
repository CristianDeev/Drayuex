const introVideo = document.getElementById("introVideo");
const enterBtn = document.getElementById("enterBtn");

function goToHome() {
  window.location.href = "home.html";
}

enterBtn.addEventListener("click", async () => {
  try {
    introVideo.currentTime = 0;
    introVideo.volume = 1;

    await introVideo.play();

    introVideo.addEventListener("ended", goToHome, { once: true });

    const checkDuration = () => {
      if (introVideo.duration && introVideo.duration < 1) {
        setTimeout(goToHome, 4000);
      }
    };

    if (introVideo.readyState >= 1) {
      checkDuration();
    } else {
      introVideo.addEventListener("loadedmetadata", checkDuration, { once: true });
    }

  } catch (error) {
    goToHome();
  }
});
