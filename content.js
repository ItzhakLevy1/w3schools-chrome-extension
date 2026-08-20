// English comments for codebase consistency

// Helper function to extract clean text without injected TTS buttons
function getCleanText(element) {
  const clone = element.cloneNode(true);
  clone
    .querySelectorAll(".tts-btn, .tts-btn-global")
    .forEach((btn) => btn.remove());
  return clone.innerText.trim();
}

// Helper function to get a specific voice by name
function getSelectedVoice(voiceName) {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find(
      (voice) => voice.name === voiceName || voice.name.includes(voiceName),
    ) || null
  );
}

// Reset all button UI states
function resetAllButtons() {
  document.querySelectorAll(".tts-btn, .tts-btn-global").forEach((b) => {
    b.classList.remove("speaking");
    if (b.classList.contains("tts-btn-global")) {
      b.innerHTML = "📢 הקרא את כל הדף";
    } else {
      b.innerHTML = "🔊 השמע";
    }
  });
}

// Initialize Text-To-Speech functionality
function initTTS() {
  const mainContent = document.getElementById("main") || document.body;
  const blockElements = mainContent.querySelectorAll(
    "h1, h2, h3, h4, p, ul, ol, div.ws-note, div.w3-example",
  );

  // --- 1. Add "Read All Page" Button in Navigation Bar ---
  if (!document.getElementById("tts-global-btn")) {
    const getCertifiedLink = Array.from(document.querySelectorAll("a")).find(
      (el) => el.textContent.trim().includes("Get Certified"),
    );

    if (getCertifiedLink) {
      const globalBtn = document.createElement("button");
      globalBtn.id = "tts-global-btn";
      globalBtn.className = "tts-btn-global";
      globalBtn.type = "button";
      globalBtn.innerHTML = "📢 הקרא את כל הדף";

      globalBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        window.speechSynthesis.cancel();

        if (globalBtn.classList.contains("speaking")) {
          resetAllButtons();
          return;
        }

        resetAllButtons();

        // Filter and extract clean text from top-level blocks
        const allTextBlocks = Array.from(blockElements)
          .filter(
            (el) =>
              !el.parentElement.closest("ul, ol, div.ws-note, div.w3-example"),
          )
          .map((el) => getCleanText(el))
          .filter((text) => text.length > 0);

        if (allTextBlocks.length === 0) return;

        globalBtn.classList.add("speaking");
        globalBtn.innerHTML = "⏹ עצור הקראה";

        // Queue clean text blocks sequentially
        allTextBlocks.forEach((text, index) => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = "en-US";

          const chosenVoice = getSelectedVoice("Google UK English Female");
          if (chosenVoice) {
            utterance.voice = chosenVoice;
          }

          if (index === allTextBlocks.length - 1) {
            utterance.onend = resetAllButtons;
            utterance.onerror = resetAllButtons;
          }

          window.speechSynthesis.speak(utterance);
        });
      });

      // Position between Get Certified and the 3-dots menu icon
      getCertifiedLink.insertAdjacentElement("afterend", globalBtn);
    }
  }

  // --- 2. Add Individual Block Buttons ---
  blockElements.forEach((el) => {
    if (
      el.dataset.ttsInitialized ||
      el.closest(".tts-btn") ||
      el.closest("#tts-global-btn") ||
      el.parentElement.closest("ul, ol, div.ws-note, div.w3-example")
    ) {
      return;
    }

    const cleanText = getCleanText(el);
    if (!cleanText) return;

    el.dataset.ttsInitialized = "true";

    const btn = document.createElement("button");
    btn.className = "tts-btn";
    btn.type = "button";
    btn.innerHTML = "🔊 השמע";

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      window.speechSynthesis.cancel();

      if (btn.classList.contains("speaking")) {
        resetAllButtons();
        return;
      }

      resetAllButtons();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-US";

      const chosenVoice = getSelectedVoice("Google UK English Female");
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      btn.classList.add("speaking");
      btn.innerHTML = "⏹ עצור";

      utterance.onend = resetAllButtons;
      utterance.onerror = resetAllButtons;

      window.speechSynthesis.speak(utterance);
    });

    el.insertBefore(btn, el.firstChild);
  });
}

// Ensure voices are loaded properly in Chrome
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
