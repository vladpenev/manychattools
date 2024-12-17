console.log('React logger starting...');

// Function to watch preview content changes
function watchPreviewContent() {
    const previewContainer = document.querySelector('div._snippetContent_5q0vs_11.p-l');
    if (!previewContainer) return;

    console.log('Found preview container:', previewContainer);

    // Watch for changes to the preview content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const content = document.querySelector('div._content_okm14_17')?.textContent;
            console.log('Preview content changed:', {
                type: mutation.type,
                content: content,
                target: mutation.target,
                addedNodes: Array.from(mutation.addedNodes).map(node => ({
                    nodeType: node.nodeType,
                    content: node.textContent,
                    html: node.outerHTML
                }))
            });
        });
    });

    observer.observe(previewContainer, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true
    });
}

// Monitor all events on snippet items
['mouseover', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur'].forEach(eventType => {
    document.addEventListener(eventType, function(e) {
        const snippetItem = e.target.closest('li._snippetTitle_5q0vs_24');
        if (snippetItem) {
            console.log('Snippet event:', {
                type: eventType,
                text: snippetItem.textContent,
                target: e.target,
                currentTarget: e.currentTarget,
                content: document.querySelector('div._content_okm14_17')?.textContent,
                reactData: Object.keys(snippetItem).filter(key => key.startsWith('__react')).reduce((acc, key) => {
                    acc[key] = snippetItem[key];
                    return acc;
                }, {})
            });
        }
    }, true);
});

// Start watching for preview content changes
setTimeout(watchPreviewContent, 1000);

// Log when script is loaded
console.log('React logger ready');

// Monitor React state updates
const originalPushState = window.history.pushState;
window.history.pushState = function() {
    console.log('History state updated:', arguments);
    return originalPushState.apply(this, arguments);
};