const port = chrome.runtime.connect();

window.addEventListener('message', tabsRequestHandler);

function tabsRequestHandler(event) {
    if (event.source !== window) {
        return;
    }

    if (event.data.type && event.data.type === 'REQUEST_TABS') {
        getTabs(sendTabsResponse);
    }
}

function sendTabsResponse(tabs) {
    window.postMessage({type: 'TABS_RESPONSE', tabs}, '*');
}

function getTabs(callback) {
    chrome.runtime.sendMessage({}, response => {
        callback(response.tabs);
    });
}

function createTabsList(tabs) {
    const container = document.getElementsByClassName('container')[0];
    const tabsList = document.createElement('ul');
    
    for (const tab of tabs) {
        const tabListItem = document.createElement('li');
        tabListItem.innerHTML = tab;
        tabsList.appendChild(tabListItem);
    }

    container.appendChild(tabsList);
}

// getTabs(createTabsList);