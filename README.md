# W3Schools Text-to-Speech Chrome Extension

A Chrome Extension that injects a dedicated **Text-to-Speech (TTS)** button alongside major text block elements on [W3Schools](https://www.w3schools.com/). Clicking a button reads the corresponding section aloud using the Web Speech API. Clicking another button stops the active narration and starts reading the newly selected text block.

---

## 📁 File Structure

```text
w3schools-tts-extension/
├── manifest.json
├── styles.css
├── content.js
└── README.md
```

---

## 🛠️ Installation Instructions

1. **Clone or Download** this repository/folder to your local computer.
2. Open Google Chrome and navigate to:
   ```text
   chrome://extensions/
   ```
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click on **Load unpacked** in the top-left area.
5. Select the `w3schools-tts-extension` folder containing the extension files.
6. Navigate to any tutorial page on [W3Schools](https://www.w3schools.com/) and refresh the page.

---

## 🎙️ Voice Selection & Customization

The extension utilizes the browser's built-in `window.speechSynthesis` API. You can change the narration voice inside `content.js`.

### How to Change the Active Voice

In `content.js`, locate the voice assignment section within the button click event handler:

```javascript
// Select your preferred voice by passing its exact name
const chosenVoice = getSelectedVoice('Google UK English Female');
if (chosenVoice) {
  utterance.voice = chosenVoice;
}
```

Replace `'Google UK English Female'` with any voice name supported by your browser environment.

---

## 🔍 How to View Available Voices in Chrome DevTools

Because the list of installed speech engines depends on your operating system (Windows, macOS, Linux) and browser configuration, you can list all active voices directly from Chrome:

1. Open Chrome and press **F12** (or right-click anywhere on a webpage and select **Inspect**).
2. Switch to the **Console** tab in DevTools.
3. Paste the following snippet and press **Enter**:

```javascript
window.speechSynthesis.getVoices().forEach(voice => console.log(`${voice.name} (${voice.lang})`));
```

4. An array of available voices along with their language tags will print to the console.

---

## 📜 Complete List of Detected System & Cloud Voices

Below is the complete list of system and cloud voices retrieved from Chrome DevTools:

### 🇬🇧 / 🇺🇸 English Options (Recommended for W3Schools)
* `Microsoft Mark - English (United States) (en-US)`
* `Microsoft Zira - English (United States) (en-US)`
* `Microsoft David - English (United States) (en-US)`
* `Google US English (en-US)`
* `Google UK English Female (en-GB)`
* `Google UK English Male (en-GB)`

### 🇮🇱 Hebrew
* `Microsoft Asaf - Hebrew (Israel) (he-IL)`

### 🌍 Additional International Voices
* `Google Deutsch (de-DE)`
* `Google español (es-ES)`
* `Google español de Estados Unidos (es-US)`
* `Google français (fr-FR)`
* `Google हिन्दी (hi-IN)`
* `Google Bahasa Indonesia (id-ID)`
* `Google italiano (it-IT)`
* `Google 日本語 (ja-JP)`
* `Google 한국의 (ko-KR)`
* `Google Nederlands (nl-NL)`
* `Google polski (pl-PL)`
* `Google português do Brasil (pt-BR)`
* `Google русский (ru-RU)`
* `Google 普通话（中国大陆） (zh-CN)`
* `Google 粤語（香港） (zh-HK)`
* `Google 國語（臺灣） (zh-TW)`

---

## 📄 License

This project is open-source and intended for educational and personal accessibility enhancement.