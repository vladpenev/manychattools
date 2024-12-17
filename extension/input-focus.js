// Function to handle input focus
function setupInputFocusHandler() {
    // Get the input field using the exact class name
    const inputField = document.querySelector('textarea._input_okm14_1');
    if (!inputField) return;

    // Track focus state
    inputField.addEventListener('focus', () => {
        console.log('Textarea focused');
    });

    // Function to start refocus attempts
    function startRefocusAttempts() {
        const currentLength = inputField.value.length;
        
        // Try to refocus every 500ms until successful
        const refocusInterval = setInterval(() => {
            if (inputField.value.length < currentLength) {
                inputField.focus();
                if (document.activeElement === inputField) {
                    console.log('Successfully refocused');
                    clearInterval(refocusInterval);
                }
            }
        }, 500);

        // Clear interval after 5 seconds to prevent infinite attempts
        setTimeout(() => {
            clearInterval(refocusInterval);
        }, 5000);
    }

    // Handle Enter key press
    inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            startRefocusAttempts();
        }
    });

    // Handle send button clicks
    const sendButtonSelectors = [
        '#chat-form > div.p-x.b-t.justify-between.d-flex.flex-col._inputWrapper_1dxit_62 > div.p-y.d-flex.justify-between.align-center.tap-highlight-default.flex-shrink-0.o-hidden > div.m-l.d-flex.flex-grow-1.justify-end.o-hidden._sendWrapper_1dxit_104 > button:nth-child(1)',  // Facebook
        '#chat-form > div.p-x.b-t.justify-between.d-flex.flex-col._inputWrapper_1dxit_62 > div.p-y.d-flex.justify-between.align-center.tap-highlight-default.flex-shrink-0.o-hidden > div.m-l.d-flex.flex-grow-1.justify-end.o-hidden._sendWrapper_1dxit_104 > button:nth-child(2)'   // Instagram
    ];

    sendButtonSelectors.forEach(selector => {
        const button = document.querySelector(selector);
        if (button) {
            button.addEventListener('click', () => {
                startRefocusAttempts();
            });
        }
    });
}

// Create an observer to watch for chat interface changes
const chatObserver = new MutationObserver(() => {
    setupInputFocusHandler();
});

// Start observing the document body for changes
chatObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial setup
setupInputFocusHandler(); 