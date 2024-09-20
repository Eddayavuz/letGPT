chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ writingCoachEnabled: false, preferredTone: 'formal' });
    console.log('AI Writing Coach installed.');
});

// Listen for changes in state and communicate with the content script
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.writingCoachEnabled) {
        chrome.scripting.executeScript({
            target: { allFrames: true },
            func: (enabled) => { isWritingCoachEnabled = enabled; },
            args: [changes.writingCoachEnabled.newValue]
        });
    }
});
