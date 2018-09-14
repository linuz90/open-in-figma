var storage = chrome.storage.local;
var action = chrome.browserAction;
var toggle = false;

// Get Extension status from Chrome local storage
storage.get("OpenInFigmaStat", function(data) {
  if (data.OpenInFigmaStat || data.OpenInFigmaStat == undefined) {
    toggle = true;
  }
  setAppearance(toggle);
});

// On/Off Extension
action.onClicked.addListener(function() {
  toggle = !toggle;
  setAppearance(toggle);
  storage.set({ OpenInFigmaStat: toggle });
});

// Get response from content_scripts
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request === "closeTab") {
    chrome.tabs.remove(sender.tab.id);
  }
});

function setAppearance(argument) {
  if (argument) {
    action.setIcon({
      path: {
        "16": "./icons/icon-on-16.png",
        "32": "./icons/icon-on-32.png",
        "48": "./icons/icon-on-48.png",
        "128": "./icons/icon-on-128.png"
      }
    });
    action.setBadgeText({ text: "" });
  } else {
    action.setIcon({
      path: {
        "16": "./icons/icon-off-16.png",
        "32": "./icons/icon-off-32.png",
        "48": "./icons/icon-off-48.png",
        "128": "./icons/icon-off-128.png"
      }
    });
    action.setBadgeText({ text: "OFF" });
    action.setBadgeBackgroundColor({ color: "#F24E1E" });
  }
}
