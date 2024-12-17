// Existing download functionality wrapped in a function
async function downloadHTML(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        // Try multiple methods to get the name
        const nameElement = document.querySelector('._name_1g9o3_46');
        console.log('Found name container:', nameElement); // Debug log

        let chatName = 'manychat';
        
        if (nameElement) {
          const spanElement = nameElement.querySelector('span[data-test-id="contact-name"] > span');
          console.log('Found span element:', spanElement); // Debug log
          
          if (spanElement && spanElement.textContent) {
            chatName = spanElement.textContent.trim();
          }
        }
        
        console.log('Final chat name:', chatName); // Debug log
        
        const htmlContent = document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Only replace spaces and special characters, keep Cyrillic and Latin letters
        const filename = chatName.replace(/[^a-zA-Zа-яА-Я0-9]/g, '_');
        console.log('Final filename:', filename); // Debug log
        
        return { url, filename: `${filename}.html` };
      }
    });

    if (results && results[0] && results[0].result) {
      const { url, filename } = results[0].result;
      await chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Listen for messages from popup and content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadHTML') {
    // If request comes from interface button, use sender tab
    const tabId = request.source === 'interface' ? 
      sender.tab.id : 
      request.tabId;
      
    downloadHTML(tabId);
  } else if (request.action === 'downloadImage') {
    chrome.downloads.download({
      url: request.imageUrl,
      filename: request.filename,
      saveAs: false
    });
  }
}); 

// GitHub repository configuration
const GITHUB_REPO = {
    owner: 'vladpenev',
    repo: 'manychattools',
    branch: 'main'
};

const FEATURE_FILES = [
    'input-focus.js',
    'snippet-navigation.js',
    'react-logger.js'
];

// Check for updates every hour
const UPDATE_INTERVAL = 60 * 60 * 1000;

// Function to fetch file content from GitHub
async function fetchFileFromGithub(filename) {
    const url = `https://raw.githubusercontent.com/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/${GITHUB_REPO.branch}/${filename}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.status}`);
    }
    return await response.text();
}

// Function to get stored file hash
async function getStoredHash(filename) {
    const result = await chrome.storage.local.get(filename);
    return result[filename];
}

// Function to calculate file hash
async function calculateHash(content) {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Function to update feature file
async function updateFeatureFile(filename) {
    try {
        console.log(`Checking for updates: ${filename}`);
        const content = await fetchFileFromGithub(filename);
        const newHash = await calculateHash(content);
        const storedHash = await getStoredHash(filename);

        if (newHash !== storedHash) {
            console.log(`Updating ${filename}`);
            
            // Store the new content in storage
            await chrome.storage.local.set({
                [filename]: newHash,
                [`${filename}_content`]: content
            });

            // Notify content script to reload the feature
            const tabs = await chrome.tabs.query({url: "*://*.manychat.com/*"});
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, {
                    action: 'updateFeature',
                    filename: filename,
                    content: content
                });
            });
        }
    } catch (error) {
        console.error(`Error updating ${filename}:`, error);
    }
}

// Function to check all features for updates
async function checkForUpdates() {
    console.log('Checking for feature updates...');
    for (const file of FEATURE_FILES) {
        await updateFeatureFile(file);
    }
}

// Set up periodic update checks
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed. Setting up update checks...');
    checkForUpdates();
    setInterval(checkForUpdates, UPDATE_INTERVAL);
});

// Listen for manual update checks
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'checkForUpdates') {
        checkForUpdates();
    }
}); 