const pdfUrl = encodeURIComponent(window.location.href);
window.location.href = chrome.runtime.getURL("viewer.html") + `?file=${pdfUrl}`;
