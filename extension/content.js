// Function to determine the platform
function identifyPlatform() {
    const platformButton = document.querySelector("#appContent > div > div._chatColumn_1jrdl_1.shadow-x.col > div > div:nth-child(1) > div._tabsContainer_40h9i_5._tabs_1gohe_142 > div > ul > li > button");
    
    if (!platformButton) {
        return null;
    }

    const isInstagram = platformButton.getAttribute('data-value') === 'instagram';
    const isFacebook = platformButton.getAttribute('data-value') === 'facebook';
    
    return isInstagram ? 'instagram' : (isFacebook ? 'facebook' : null);
}

// Toast utility functions
function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = createToastContainer();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Remove the toast after duration
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.2s ease-out';
        setTimeout(() => {
            container.removeChild(toast);
            if (container.children.length === 0) {
                document.body.removeChild(container);
            }
        }, 200);
    }, duration);
}

// Inject styles for toasts
const style = document.createElement('style');
style.textContent = `
    .toast-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .toast {
        background: #ffffff;
        color: #09090b;
        padding: 16px;
        border-radius: 8px;
        font-size: 14px;
        line-height: 1.4;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(0, 0, 0, 0.08);
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.2s ease-out;
        position: relative;
    }

    .toast::before {
        content: '';
        width: 14px;
        height: 14px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        flex-shrink: 0;
    }

    .toast.success {
        background: #dcfce7;
        color: #14532d;
        border-color: #bbf7d0;
    }

    .toast.success::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2316a34a'%3E%3Cpath fill-rule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z' clip-rule='evenodd'/%3E%3C/svg%3E");
    }

    .toast.error {
        background: #fee2e2;
        color: #7f1d1d;
        border-color: #fecaca;
    }

    .toast.error::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23dc2626'%3E%3Cpath fill-rule='evenodd' d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z' clip-rule='evenodd'/%3E%3C/svg%3E");
    }

    .toast.info {
        background: #e0f2fe;
        color: #0c4a6e;
        border-color: #bae6fd;
    }

    .toast.info::before {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230ea5e9'%3E%3Cpath fill-rule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z' clip-rule='evenodd'/%3E%3C/svg%3E");
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Update the download button styles
const downloadButtonStyles = document.createElement('style');
downloadButtonStyles.textContent = `
    .lightbox__download {
        position: absolute;
        top: 16px;
        right: 60px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        background: transparent;
        border: none;
        padding: 0;
    }

    .lightbox__download:hover svg {
        opacity: 0.8;
    }
`;
document.head.appendChild(downloadButtonStyles);

// Function to create download button
function createDownloadButton() {
    const button = document.createElement('a');
    button.className = 'lightbox__download';
    button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L7 11H17L12 16Z" fill="white"/>
            <path d="M12 2V11M12 16L7 11H17L12 16ZM6 22H18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    return button;
}

// Function to handle image download
function downloadImage(imageUrl, filename) {
    // Send message to background script to handle download
    chrome.runtime.sendMessage({
        action: 'downloadImage',
        imageUrl: imageUrl,
        filename: `${filename}.jpg`
    });
}

// Function to extract filename from URL and clean it
function getFilenameFromUrl(url) {
    try {
        const urlObj = new URL(url);
        const searchParams = new URLSearchParams(urlObj.search);
        
        // Try to get asset_id from URL
        const assetId = searchParams.get('asset_id');
        if (assetId) {
            return `manychat_image_${assetId}`;
        }
        
        // Fallback to timestamp if no asset_id found
        return `manychat_image_${Date.now()}`;
    } catch (e) {
        return `manychat_image_${Date.now()}`;
    }
}

// Watch for lightbox changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'lightbox') {
            const lightbox = mutation.target;
            const wrapper = lightbox.querySelector('.lightbox__wrapper');
            
            if (wrapper && !wrapper.querySelector('.lightbox__download')) {
                console.log('Adding download button to lightbox');
                const closeButton = wrapper.querySelector('.lightbox__close');
                if (closeButton) {
                    const downloadButton = createDownloadButton();
                    
                    downloadButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const img = wrapper.querySelector('img');
                        if (img) {
                            const imageUrl = img.src;
                            const filename = getFilenameFromUrl(imageUrl);
                            downloadImage(imageUrl, filename);
                            showToast('Image download started', 'success');
                        }
                    });
                    
                    closeButton.parentNode.insertBefore(downloadButton, closeButton);
                }
            }
        }
    });
});

// Start observing the document for lightbox
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class']
});

// Add initialization log
console.log('Content script loaded and initialized');

// Add a manual check for existing lightbox on script load
const existingLightbox = document.getElementById('lightbox');
if (existingLightbox) {
    console.log('Found existing lightbox on load'); // Debug log
    const img = existingLightbox.querySelector('img');
    if (img && !existingLightbox.querySelector('.lightbox__download')) {
        console.log('Adding button to existing lightbox'); // Debug log
        const downloadButton = createDownloadButton();
        
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const imageUrl = img.src;
            const filename = getFilenameFromUrl(imageUrl);
            downloadImage(imageUrl, filename);
            
            showToast('Image download started', 'success');
        });
        
        const wrapper = existingLightbox.querySelector('.lightbox__wrapper');
        if (wrapper) {
            wrapper.appendChild(downloadButton);
        } else {
            existingLightbox.appendChild(downloadButton);
        }
    }
}

document.addEventListener('copy', async (e) => {
    const platform = identifyPlatform();
    let instagramUsername = '';
    let manychatId = '';

    if (platform === 'instagram') {
        // Get Instagram username
        const instagramElement = document.querySelector("#appContent > div > div._userColumn_1jrdl_8.col > div > div:nth-child(1) > div._info_1g9o3_1.m-x.m-t > div > a");
        instagramUsername = instagramElement?.textContent?.trim() || '';

        // Get ManyChat ID for Instagram
        const manychatElement = document.querySelector("#appContent > div > div._userColumn_1jrdl_8.col > div > div:nth-child(1) > div._info_1g9o3_1.m-x.m-t > div > span:nth-child(3)");
        manychatId = manychatElement?.textContent?.trim() || '';
        
        if (instagramUsername) {
            showToast(`Instagram: ${instagramUsername}`, 'info');
        }
    } else if (platform === 'facebook') {
        // Get ManyChat ID for Facebook
        const manychatElement = document.querySelector("#appContent > div > div._userColumn_1jrdl_8.col > div > div:nth-child(1) > div._info_1g9o3_1.m-x.m-t > div > span:nth-child(5)");
        manychatId = manychatElement?.textContent?.trim() || '';
    }

    if (manychatId) {
        showToast(`ManyChat ID: ${manychatId}`, 'success');
    }

    console.log('Copy detected:', {
        platform: platform || 'unknown',
        ...(instagramUsername && { instagramUsername }),
        manychatId: manychatId || 'not found'
    });
    
    const settings = await chrome.storage.local.get(['clipboardFeatureEnabled', 'minCharCount']);
    console.log('Clipboard feature enabled:', settings.clipboardFeatureEnabled);
    
    if (!settings.clipboardFeatureEnabled) {
        showToast('Clipboard feature is disabled', 'error');
        return;
    }

    const selection = window.getSelection().toString();
    console.log('Selected text:', selection);

    // Check character count
    if (selection.length < (settings.minCharCount ?? 600)) {
        showToast(`Text too short (${selection.length}/${settings.minCharCount ?? 600} chars)`, 'error');
        return;
    }

    // Only append if we have content to add
    if (instagramUsername || manychatId) {
        console.log('Found content to append, preventing default copy');
        e.preventDefault();
        
        const appendText = [
            selection,
            instagramUsername ? `Instagram: ${instagramUsername}` : '',
            manychatId ? `ManyChat ID: ${manychatId}` : ''
        ].filter(Boolean).join('\n\n');
        
        console.log('Final text to be copied:', appendText);
        
        try {
            await navigator.clipboard.writeText(appendText);
            console.log('Successfully wrote to clipboard');
            showToast('Content copied successfully!', 'success');
        } catch (err) {
            console.error('Failed to write to clipboard:', err);
            e.clipboardData.setData('text/plain', appendText);
            showToast('Failed to copy content', 'error');
        }
    } else {
        console.log('No Instagram or ManyChat content found to append');
    }
}); 

async function hideSystemMessages() {
    try {
        // Find and click the kebab menu
        const kebabButton = document.querySelector('div[data-test-id="user-context-menu"]');
        if (!kebabButton) {
            throw new Error('Could not find kebab menu button');
        }
        kebabButton.click();

        // Wait for menu to appear
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find menu item by text content
        const menuItems = Array.from(document.querySelectorAll('.menu-item'));
        const hideSystemItem = menuItems.find(item => item.textContent.includes('Hide System Messages'));
        
        if (!hideSystemItem) {
            // If we can't find the option, system messages might already be hidden
            // Close menu by clicking outside
            document.body.click();
            return; // Continue with selection process
        }

        // Click the hide system messages option
        hideSystemItem.click();
        
        // Wait for UI to update
        await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
        console.error('Error in hideSystemMessages:', error);
        // Don't throw error, just log it and continue
        // System messages might already be hidden
        document.body.click(); // Ensure menu is closed
    }
}

async function selectAllMessages() {
    // Find the chat column container
    const chatColumn = document.querySelector('div[class^="_chatColumn_"]');
    // Find the scrollable container inside the base div
    const scrollableDiv = document.querySelector('div[class^="_base_"][class*="notranslate"]')
        ?.querySelector('div[style*="position: absolute"][style*="overflow: scroll"]');
    
    if (!chatColumn || !scrollableDiv) {
        showToast('Chat container not found', 'error');
        return;
    }

    // Get auto-scroll setting
    const { autoScrollEnabled } = await chrome.storage.local.get(['autoScrollEnabled']);
    
    // Show loading toast
    showToast('Loading messages...', 'info');

    try {
        // First hide system messages
        await hideSystemMessages();

        // Save initial scroll position
        const initialScrollTop = scrollableDiv.scrollTop;
        const isAlreadyAtTop = scrollableDiv.scrollTop === 0;

        // Only scroll if we're not at the top and auto-scroll is enabled
        if (autoScrollEnabled && !isAlreadyAtTop) {
            // Scroll to top gradually to trigger message loading
            const scrollStep = Math.max(scrollableDiv.scrollHeight / 10, 1000);
            const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            
            while (scrollableDiv.scrollTop > 0) {
                const currentPos = scrollableDiv.scrollTop;
                scrollableDiv.scrollTop = Math.max(0, currentPos - scrollStep);
                await delay(500);
                
                if (currentPos === scrollableDiv.scrollTop && currentPos !== 0) {
                    break;
                }
            }
            
            scrollableDiv.scrollTop = 0;
            await delay(2000);
        } else if (isAlreadyAtTop) {
            // Small delay to ensure any pending UI updates are complete
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Create range and selection
        const range = document.createRange();
        const selection = window.getSelection();
        
        // Clear any existing selection
        selection.removeAllRanges();
        
        // Find all message wrappers
        const messageWrappers = scrollableDiv.querySelectorAll('div[class^="_wrapper_"]');
        
        if (messageWrappers.length > 0) {
            // Select from first to last message
            range.setStartBefore(messageWrappers[0]);
            range.setEndAfter(messageWrappers[messageWrappers.length - 1]);
            selection.addRange(range);
        } else {
            showToast('No messages found to select', 'error');
        }

        // Restore original scroll position if we scrolled
        if (autoScrollEnabled && !isAlreadyAtTop) {
            scrollableDiv.scrollTop = initialScrollTop;
        }
        
        showToast('Messages selected!', 'success');

        // Get the select+copy setting
        const { selectAndCopyEnabled } = await chrome.storage.local.get(['selectAndCopyEnabled']);
        
        // If enabled, trigger the copy
        if (selectAndCopyEnabled) {
            document.execCommand('copy');
        }
    } catch (error) {
        console.error('Error selecting messages:', error);
        showToast('Failed to select messages', 'error');
        
        if (autoScrollEnabled && !isAlreadyAtTop) {
            scrollableDiv.scrollTop = initialScrollTop;
        }
    }
}

// Add message listener for the new command
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'selectAllMessages') {
        selectAllMessages();
    }
}); 

function createInterfaceButtons() {
    const rightPanel = document.querySelector('div[class^="_rightPanel_"]');
    if (!rightPanel) return;

    // Create separator
    const separator = document.createElement('div');
    separator.className = '_separator_1gohe_88';

    // Create Download HTML button
    const downloadButton = document.createElement('div');
    downloadButton.className = '_btn_1gohe_62 text-h-primary pointer text-secondary';
    downloadButton.setAttribute('data-title', 'Download HTML');
    downloadButton.setAttribute('data-title-at', 'bottom');
    downloadButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
        </svg>
    `;

    // Create Select All Messages button with new icon
    const selectButton = document.createElement('div');
    selectButton.className = '_btn_1gohe_62 text-h-primary pointer text-secondary';
    selectButton.setAttribute('data-title', 'Select All Messages');
    selectButton.setAttribute('data-title-at', 'bottom');
    selectButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <path d="M4 4v16h16V4H4zm14 14H6V6h12v12zm-3-7H9v2h6v-2z" fill="currentColor"/>
            <path d="M9 9h6v2H9z" fill="currentColor"/>
            <path d="M9 13h6v2H9z" fill="currentColor"/>
        </svg>
    `;

    // Add click handlers
    downloadButton.addEventListener('click', () => {
        // Send message to background script directly
        chrome.runtime.sendMessage({ 
            action: 'downloadHTML',
            source: 'interface'
        });
        showToast('Starting download...', 'info');
    });

    selectButton.addEventListener('click', () => {
        selectAllMessages();
    });

    // Add buttons to panel
    rightPanel.appendChild(separator.cloneNode(true));
    rightPanel.appendChild(downloadButton);
    rightPanel.appendChild(separator.cloneNode(true));
    rightPanel.appendChild(selectButton);
}

// Set up observer to handle dynamic panel updates
const panelObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            const rightPanel = document.querySelector('div[class^="_rightPanel_"]');
            if (rightPanel && !rightPanel.querySelector('[data-title="Download HTML"]')) {
                createInterfaceButtons();
            }
        }
    }
});

// Start observing the document for the panel
panelObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial creation attempt
createInterfaceButtons();

// Add this function to select all loaded messages without scrolling
async function selectLoadedMessages() {
    try {
        const scrollableDiv = document.querySelector('div[class^="_base_"][class*="notranslate"]')
            ?.querySelector('div[style*="position: absolute"][style*="overflow: scroll"]');
        
        if (!scrollableDiv) {
            showToast('Chat container not found', 'error');
            return;
        }

        // Hide system messages first
        await hideSystemMessages();

        // Create range and selection
        const range = document.createRange();
        const selection = window.getSelection();
        
        // Clear any existing selection
        selection.removeAllRanges();
        
        // Find all message wrappers that are currently loaded
        const messageWrappers = Array.from(scrollableDiv.querySelectorAll('div[class^="_wrapper_"]'));
        
        if (messageWrappers.length > 0) {
            // Select from first to last loaded message
            range.setStartBefore(messageWrappers[0]);
            range.setEndAfter(messageWrappers[messageWrappers.length - 1]);
            selection.addRange(range);
            showToast(`${messageWrappers.length} messages selected!`, 'success');

            // Get the select+copy setting
            const { selectAndCopyEnabled } = await chrome.storage.local.get(['selectAndCopyEnabled']);
            
            // If enabled, trigger the copy
            if (selectAndCopyEnabled) {
                document.execCommand('copy');
            }
        } else {
            showToast('No messages found to select', 'error');
        }
    } catch (error) {
        console.error('Error selecting loaded messages:', error);
        showToast('Failed to select messages', 'error');
    }
}

// Update keyboard shortcut listener
document.addEventListener('keydown', async (e) => {
    // Shift+C: Select all loaded messages
    if (e.shiftKey && !e.metaKey && !e.ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault(); // Prevent default browser behavior
        await selectLoadedMessages();
    }
    
    // Shift+Cmd/Ctrl+C: Select all loaded messages and trigger copy
    if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        await selectLoadedMessages();
        // Trigger the copy event to use existing handler
        document.execCommand('copy');
    }
    
    // Cmd/Ctrl+C: Let the existing copy event handler handle it
    // (no need to do anything here as it's handled by the copy event listener)
});

// Function to load feature from storage or GitHub
async function loadFeature(filename) {
    try {
        // Try to get feature content from storage
        const { [`${filename}_content`]: content } = await chrome.storage.local.get(`${filename}_content`);
        
        if (content) {
            // Create and inject script
            const script = document.createElement('script');
            script.textContent = content;
            script.setAttribute('data-feature', filename);
            
            // Remove existing feature if it exists
            const existingScript = document.querySelector(`script[data-feature="${filename}"]`);
            if (existingScript) {
                existingScript.remove();
            }
            
            // Inject new script
            (document.head || document.documentElement).appendChild(script);
            console.log(`ManyChat Tools: Loaded feature from storage: ${filename}`);
        } else {
            console.log(`ManyChat Tools: No stored content for ${filename}, requesting update`);
            // Request update from background script
            chrome.runtime.sendMessage({ action: 'checkForUpdates' });
        }
    } catch (error) {
        console.error(`ManyChat Tools: Error loading feature ${filename}:`, error);
    }
}

// Load all features on startup
async function initializeFeatures() {
    const features = ['input-focus.js', 'snippet-navigation.js', 'react-logger.js'];
    for (const feature of features) {
        await loadFeature(feature);
    }
}

// Listen for feature updates from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateFeature') {
        console.log(`ManyChat Tools: Received update for ${request.filename}`);
        const script = document.createElement('script');
        script.textContent = request.content;
        script.setAttribute('data-feature', request.filename);
        
        // Remove existing feature if it exists
        const existingScript = document.querySelector(`script[data-feature="${request.filename}"]`);
        if (existingScript) {
            existingScript.remove();
        }
        
        // Inject updated script
        (document.head || document.documentElement).appendChild(script);
        console.log(`ManyChat Tools: Updated feature: ${request.filename}`);
    }
});

// Initialize features
initializeFeatures();