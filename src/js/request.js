var storage = chrome.storage.local;
var figmaRegex = /(https:\/\/www\.figma\.com\/(file))\/.+/;
var figmaAppURI = 'figma://';
var loc = document.location;
var tabUrl = loc.href;
var match = figmaRegex.exec(tabUrl);

// Get Extension status from Chrome local storage
storage.get('OpenInFigmaStat', function(data) {
  if (data.OpenInFigmaStat || data.OpenInFigmaStat == undefined) {
    if (match != null) {
      loc.replace(tabUrl.replace(match[1], figmaAppURI + match[2]));
      setTimeout(function() {
        closeTab();
      }, 500);
    }
  }
});

// Send a message to the background script to close the Figma tab
function closeTab() {
  chrome.runtime.sendMessage('closeTab');
}
