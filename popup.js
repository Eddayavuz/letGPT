document.getElementById('toggleCoach').addEventListener('click', () => {
    chrome.storage.sync.get('writingCoachEnabled', (data) => {
        const isEnabled = data.writingCoachEnabled || false;
        chrome.storage.sync.set({ writingCoachEnabled: !isEnabled });
    });
});

document.getElementById('toneSelect').addEventListener('change', (event) => {
    const selectedTone = event.target.value;
    chrome.storage.sync.set({ preferredTone: selectedTone });
});
