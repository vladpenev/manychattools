document.getElementById('downloadBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.runtime.sendMessage({ action: 'downloadHTML', tabId: tab.id });
});

document.getElementById('clipboardFeature').addEventListener('change', (e) => {
  chrome.storage.local.set({ clipboardFeatureEnabled: e.target.checked });
});

document.getElementById('charCount').addEventListener('change', (e) => {
  const value = parseInt(e.target.value) || 0;
  chrome.storage.local.set({ minCharCount: value });
});

document.getElementById('selectAllBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: 'selectAllMessages' });
});

document.getElementById('autoScrollFeature').addEventListener('change', (e) => {
    chrome.storage.local.set({ autoScrollEnabled: e.target.checked });
});

document.getElementById('selectAndCopyFeature').addEventListener('change', (e) => {
    chrome.storage.local.set({ selectAndCopyEnabled: e.target.checked });
});

// Load saved state
chrome.storage.local.get(
    ['clipboardFeatureEnabled', 'minCharCount', 'autoScrollEnabled', 'selectAndCopyEnabled'], 
    (result) => {
        document.getElementById('clipboardFeature').checked = result.clipboardFeatureEnabled ?? false;
        document.getElementById('charCount').value = result.minCharCount ?? 600;
        document.getElementById('autoScrollFeature').checked = result.autoScrollEnabled ?? false;
        document.getElementById('selectAndCopyFeature').checked = result.selectAndCopyEnabled ?? false;
    }
); 