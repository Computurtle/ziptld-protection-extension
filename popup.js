document.getElementById("continueBtn").addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "continueLoading" });
});

document.getElementById("goBackBtn").addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "goBack" });
});
