import * as pdfjsLib from './pdfjs/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs/pdf.worker.mjs';

const urlParams = new URLSearchParams(window.location.search);
const fileUrl = urlParams.get('file');

if (!fileUrl) {
  alert("No PDF file specified.");
} else {
  const container = document.createElement('div');
  document.body.appendChild(container);

  pdfjsLib.getDocument(fileUrl).promise.then(pdf => {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      pdf.getPage(pageNum).then(page => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        container.appendChild(canvas);

        page.render({
          canvasContext: context,
          viewport: viewport
        });
      });
    }
  }).catch(err => {
    console.error('PDF loading error:', err);
    alert("Failed to load PDF.");
  });
}
