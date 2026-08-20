// Helper function to get a specific voice by name
function getSelectedVoice(voiceName) {
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.name === voiceName) || null;
}

// Initialize Text-To-Speech functionality
function initTTS() {
  const mainContent = document.getElementById("main") || document.body;
  const blockElements = mainContent.querySelectorAll(
    "h1, h2, h3, h4, p, ul, ol, div.ws-note, div.w3-example",
  );

  blockElements.forEach((el) => {
    if (
      el.dataset.ttsInitialized ||
      el.closest(".tts-btn") ||
      el.parentElement.closest("ul, ol, div.ws-note, div.w3-example")
    ) {
      return;
    }

    const textToRead = el.innerText.trim();
    if (!textToRead) return;

    el.dataset.ttsInitialized = "true";

    const btn = document.createElement("button");
    btn.className = "tts-btn";
    btn.type = "button";
    btn.innerHTML = "🔊 השמע";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      window.speechSynthesis.cancel();

      if (btn.classList.contains("speaking")) {
        btn.classList.remove("speaking");
        btn.innerHTML = "🔊 השמע";
        return;
      }

      document.querySelectorAll(".tts-btn").forEach((b) => {
        b.classList.remove("speaking");
        b.innerHTML = "🔊 השמע";
      });

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "en-US";

      // Select your preferred English voice from your available list:
      // Options: 'Google UK English Female', 'Google UK English Male', 'Google US English', 'Microsoft Zira', 'Microsoft Mark', 'Microsoft David'
      const chosenVoice = getSelectedVoice("Google UK English Female");
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      btn.classList.add("speaking");
      btn.innerHTML = "⏹ עצור";

      utterance.onend = () => {
        btn.classList.remove("speaking");
        btn.innerHTML = "🔊 השמע";
      };

      utterance.onerror = () => {
        btn.classList.remove("speaking");
        btn.innerHTML = "🔊 השמע";
      };

      window.speechSynthesis.speak(utterance);
    });

    el.insertBefore(btn, el.firstChild);
  });
}

// Ensure voices are loaded if triggered lazily by Chrome
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTTS);
} else {
  initTTS();
}
