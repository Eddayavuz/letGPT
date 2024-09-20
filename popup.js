// Get the current tab content when the translate button is clicked
document.getElementById('translateButton').addEventListener('click', async () => {
    const selectedLanguage = document.getElementById('languageSelect').value;
    
    // Send message to the background script to get the tab content
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: getPageContent,
        }, async (results) => {
            const pageText = results[0].result;
            const translatedText = await translateText(pageText, selectedLanguage);
            displayTranslation(translatedText);
        });
    });
});

// Extract text content from the webpage (runs on the active tab)
function getPageContent() {
    return document.body.innerText;
}

// Translate text using GPT
async function translateText(text, targetLanguage) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                {"role": "system", "content": `Translate the following text to ${targetLanguage}:`},
                {"role": "user", "content": text}
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Display the translated content
function displayTranslation(translation) {
    document.getElementById('response').textContent = translation;
}
