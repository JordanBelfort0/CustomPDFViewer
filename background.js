chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    const pdfUrl = encodeURIComponent(details.url);
    return {
      redirectUrl: `chrome-extension://${chrome.runtime.id}/viewer.html?file=${pdfUrl}`
    };
  },
  { urls: ["*://*/*.pdf"], types: ["main_frame"] },
  ["blocking"]
);
