
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    getTabs(sendResponse);
    return true;
});

function getTabs(callback) {
    chrome.windows.getAll({populate: true}, (windows) => {
        const tabs = [];
    
        for (const windowData of windows) {
            for (const tab of windowData.tabs) {
                tabs.push(tab.url);
            }
        }
        return callback({tabs});
    });
}