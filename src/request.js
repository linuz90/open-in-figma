

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    return detectRedirect(details);
}, {
        urls: ["<all_urls>"]
    }, ["blocking"]);

function detectRedirect(details) {

    if (!!details.url.match('https://www.figma.com/file/')) {
        var url = details.url.replace("https://www.figma.com/file/", "figma://file/");
        return {
            redirectUrl: url
        };
    }
}
