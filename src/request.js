var urls = { urls: ['<all_urls>'] };
var figmaRegex = /(https:\/\/www\.figma\.com\/(file))\/.+/;
var figmaAppURI = 'figma://';

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return detectRedirect(details);
}, urls, ['blocking'] );

function detectRedirect(details) {
    var match = figmaRegex.exec(details.url);
    if (match == null) return {};

    return {
      redirectUrl: details.url.replace(match[1], figmaAppURI + match[2])
    };
}

chrome.webRequest.onErrorOccurred.addListener(function(details) { 
    if (details.url.match(figmaRegex)) {
        removeCurrTab();
    }
}, urls);

function removeCurrTab () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        chrome.tabs.remove(currentTab.id);
    });
}