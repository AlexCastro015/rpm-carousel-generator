import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';

export async function captureSlideAsBlob(slideElement) {
  if (!slideElement) throw new Error('Slide DOM element not found');

  const dataUrl = await toPng(slideElement, {
    pixelRatio: 2,
    cacheBust: true,
    quality: 0.98,
    style: {
      transform: 'none',
      transformOrigin: 'top left'
    }
  });

  return dataUrl;
}

export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportCarouselToZip(slideElements, carouselMeta, onProgress) {
  const zip = new JSZip();
  const folder = zip.folder('carrusel-rpm-instagram');

  for (let i = 0; i < slideElements.length; i++) {
    if (onProgress) onProgress(i + 1, slideElements.length, 'Procesando slide ' + (i + 1) + ' de ' + slideElements.length + '...');
    
    const element = slideElements[i];
    const dataUrl = await captureSlideAsBlob(element);
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    
    const slideNumber = String(i + 1).padStart(2, '0');
    folder.file('slide-' + slideNumber + '.png', base64Data, { base64: true });
  }

  if (carouselMeta.caption) {
    folder.file('instagram-caption.txt', carouselMeta.caption);
  }

  if (onProgress) onProgress(slideElements.length, slideElements.length, 'Comprimiendo archivo ZIP...');

  const content = await zip.generateAsync({ type: 'blob' });
  const zipUrl = URL.createObjectURL(content);

  const cleanTitle = (carouselMeta.title || 'carrusel-rpm')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  downloadDataUrl(zipUrl, 'carrusel-rpm-' + cleanTitle + '.zip');
  URL.revokeObjectURL(zipUrl);
}

export async function exportCarouselToPDF(slideElements, carouselMeta, onProgress) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [1080, 1350]
  });

  for (let i = 0; i < slideElements.length; i++) {
    if (onProgress) onProgress(i + 1, slideElements.length, 'Renderizando diapositiva ' + (i + 1) + ' en PDF...');
    if (i > 0) pdf.addPage([1080, 1350], 'portrait');

    const element = slideElements[i];
    const dataUrl = await captureSlideAsBlob(element);
    pdf.addImage(dataUrl, 'PNG', 0, 0, 1080, 1350, undefined, 'FAST');
  }

  const cleanTitle = (carouselMeta.title || 'carrusel-rpm')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  pdf.save('carrusel-rpm-' + cleanTitle + '.pdf');
}
