chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "blockURL") {
        const confirmBlock = confirm("Do you want to block this URL?");

        if (confirmBlock) {
            // Send a response to continue loading
            sendResponse({ continueLoading: true });
        } else {
            // Send a response to revert to the previous page
            sendResponse({ revertToPreviousPage: true });
        }
    }

    // Make sure to return true to keep the message channel open
    return true;
});
