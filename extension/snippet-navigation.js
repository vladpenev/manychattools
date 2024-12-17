// Function to handle snippet navigation
function setupSnippetNavigation() {
    let currentIndex = -1;
    let snippetItems = [];

    // Function to update highlight and preview
    function updateHighlight(newIndex) {
        // Remove highlight from all items
        snippetItems.forEach(item => {
            item.classList.remove('_snippetTitleHover_5q0vs_28');
            // Simulate mouse leave
            const leaveEvent = new MouseEvent('mouseleave', {
                bubbles: true,
                cancelable: true,
                view: window,
                relatedTarget: document.body
            });
            item.dispatchEvent(leaveEvent);
        });

        // Add highlight to current item and show preview
        if (newIndex >= 0 && newIndex < snippetItems.length) {
            const currentItem = snippetItems[newIndex];
            currentIndex = newIndex;
            
            // Add highlight class
            currentItem.classList.add('_snippetTitleHover_5q0vs_28');

            // Simulate a complete mouse hover sequence
            const rect = currentItem.getBoundingClientRect();
            const events = [
                new MouseEvent('mouseenter', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2,
                    relatedTarget: document.body
                }),
                new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2,
                    relatedTarget: document.body
                })
            ];

            // Dispatch events in sequence
            events.forEach(event => {
                currentItem.dispatchEvent(event);
            });
            
            // Ensure the item is in view
            currentItem.scrollIntoView({ block: 'nearest' });
        }
    }

    // Function to handle keyboard navigation
    function handleKeyDown(e) {
        // Check if popup is visible
        const popup = document.querySelector('div._root_75r1k_1[data-testid="popover-root"]');
        if (!popup) return;

        // Get current snippet list
        const snippetList = document.querySelector('ul._snippetList_5q0vs_15');
        if (!snippetList) return;

        // Update snippetItems with current visible items
        snippetItems = Array.from(snippetList.querySelectorAll('li._snippetTitle_5q0vs_24'));
        if (snippetItems.length === 0) return;

        // Handle arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            e.stopPropagation();
            
            // Blur the search input if it's focused
            const searchInput = document.querySelector('input._searchInput_k1koq_1[type="search"]');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.blur();
            }

            // Calculate new index with wrap-around
            if (e.key === 'ArrowDown') {
                currentIndex = currentIndex === snippetItems.length - 1 || currentIndex === -1 ? 
                    0 : currentIndex + 1;
            } else {
                currentIndex = currentIndex <= 0 ? 
                    snippetItems.length - 1 : currentIndex - 1;
            }
            
            updateHighlight(currentIndex);
        }

        // Handle Enter and Escape
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                if (currentIndex >= 0 && currentIndex < snippetItems.length) {
                    snippetItems[currentIndex].click();
                }
                break;

            case 'Escape':
                updateHighlight(-1);
                break;
        }
    }

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown, true);

    // Reset index when mouse moves
    document.addEventListener('mousemove', (e) => {
        if (e.target.closest('li._snippetTitle_5q0vs_24')) {
            currentIndex = -1;
        }
    });

    // Observe snippet list for changes
    const snippetListObserver = new MutationObserver(() => {
        currentIndex = -1; // Reset index when list changes
    });

    // Start observing snippet list
    const snippetList = document.querySelector('ul._snippetList_5q0vs_15');
    if (snippetList) {
        snippetListObserver.observe(snippetList, {
            childList: true,
            subtree: true
        });
    }
}

// Track popup state
let isPopupOpen = false;

// Function to setup search input listeners
function setupSearchInputListeners() {
    const searchInput = document.querySelector('input._searchInput_k1koq_1[type="search"]');
    if (searchInput && !searchInput._hasListeners) {
        searchInput._hasListeners = true;
        
        // Add focus listener
        searchInput.addEventListener('focus', () => {
            console.log('Search input focused');
        });

        // Add blur listener
        searchInput.addEventListener('blur', () => {
            console.log('Search input unfocused');
        });

        // Clear the interval once we've set up the listeners
        if (window._searchInputInterval) {
            clearInterval(window._searchInputInterval);
            window._searchInputInterval = null;
        }
    }
}

// Create an observer to watch for popup appearance
const popupObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            const popup = document.querySelector('div._root_75r1k_1[data-testid="popover-root"]');
            
            // Handle popup open/close
            if (popup && !isPopupOpen) {
                isPopupOpen = true;
                console.log('Snippets popup opened');
                setupSnippetNavigation();

                // Start checking for search input
                if (!window._searchInputInterval) {
                    window._searchInputInterval = setInterval(setupSearchInputListeners, 100);
                }
            } else if (!popup && isPopupOpen) {
                isPopupOpen = false;
                console.log('Snippets popup closed');
                
                // Clear interval when popup closes
                if (window._searchInputInterval) {
                    clearInterval(window._searchInputInterval);
                    window._searchInputInterval = null;
                }
            }
        }
    }
});

// Start observing the document body for changes
popupObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial setup
setupSnippetNavigation();