const urlParams = new URLSearchParams(window.location.search);
const pdfUrl = urlParams.get('file');

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.js';

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  pdf.getPage(1).then(page => {
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = document.getElementById('pdfCanvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: context, viewport });
  });
});
