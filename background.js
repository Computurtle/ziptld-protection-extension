chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
    const urlToBlock = "https://www.milwaukeetool.com.au/hand-tools/"; // Replace with the URL you want to block

    if (details.url.includes(urlToBlock)) {
        try {
            const tab = await chrome.tabs.get(details.tabId);
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["content.js"],
            });
            console.log("Content script injected successfully.");

            // Send a message to the content script
            chrome.tabs.sendMessage(tab.id, { action: "blockURL" }, (response) => {
                if (chrome.runtime.lastError) {
                    // Handle the case where no response is received within the timeframe
                    console.error(chrome.runtime.lastError);
                } else if (response && response.cancelNavigation) {
                    // Stop the ongoing navigation
                    chrome.webNavigation.onCommitted.addListener(stopNavigation, { tabId: tab.id });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
});

function stopNavigation(details) {
    if (details.transitionType === "auto_subframe") {
        // Only stop the main frame navigation
        return;
    }

    if (details.url.includes("https://www.milwaukeetool.com.au/hand-tools/")) {
        // Stop the ongoing navigation
        chrome.webNavigation.stop(details.tabId);
    }

    // Remove the listener after stopping the navigation
    chrome.webNavigation.onCommitted.removeListener(stopNavigation);
}

// Listen for navigation events to cancel the loading
chrome.webNavigation.onBeforeNavigate.addListener(stopNavigation);
