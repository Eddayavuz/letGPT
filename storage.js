chrome.storage.sync.set({ apiKey: 'YOUR_OPENAI_API_KEY' });
chrome.storage.sync.get('apiKey', (data) => {
    console.log('API Key:', data.apiKey);
});
