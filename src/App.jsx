import React, { useState, useRef } from 'react';
import Header from './components/Header';
import SlideEditor from './components/SlideEditor';
import CarouselPreview from './components/CarouselPreview';
import SortFeedImporter from './components/SortFeedImporter';
import CaptionModal from './components/CaptionModal';
import WhatsAppCROModal from './components/WhatsAppCROModal';
import { AUTOMOTIVE_PRESETS } from './data/presets';
import { THEMES } from './data/themes';
import { exportCarouselToZip, exportCarouselToPDF } from './utils/exportEngine';

export default function App() {
  const [carousel, setCarousel] = useState(AUTOMOTIVE_PRESETS[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  
  const [brandConfig, setBrandConfig] = useState({
    showLogo: true,
    showSwipeArrow: true,
    showAuthorTag: true,
    authorHandle: '@repuestos_rpm',
    website: 'repuestosrpm.cl',
    whatsapp: '+56 9 7546 7525'
  });

  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isCaptionModalOpen, setIsCaptionModalOpen] = useState(false);
  const [isWhatsAppCROModalOpen, setIsWhatsAppCROModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState({ current: 0, total: 0, text: '' });

  const slideRefs = useRef([]);
  slideRefs.current = slideRefs.current.slice(0, carousel.slides.length);

  const handleUpdateSlide = (index, updatedSlide) => {
    const nextSlides = [...carousel.slides];
    nextSlides[index] = updatedSlide;
    setCarousel({ ...carousel, slides: nextSlides });
  };

  const handleAddSlide = () => {
    const newSlide = {
      type: 'point',
      stepNumber: String(carousel.slides.length).padStart(2, '0'),
      title: 'NUEVO PUNTO CLAVE',
      description: 'Describe el consejo técnico o síntoma automotriz con claridad para el conductor.',
      badge: 'CONSEJO RPM',
      keyTakeaway: 'Revisa siempre la compatibilidad antes de instalar.'
    };
    const nextSlides = [...carousel.slides];
    nextSlides.splice(activeSlideIndex + 1, 0, newSlide);
    setCarousel({ ...carousel, slides: nextSlides });
    setActiveSlideIndex(activeSlideIndex + 1);
  };

  const handleDeleteSlide = (index) => {
    if (carousel.slides.length <= 1) return;
    const nextSlides = carousel.slides.filter((_, i) => i !== index);
    setCarousel({ ...carousel, slides: nextSlides });
    if (activeSlideIndex >= nextSlides.length) {
      setActiveSlideIndex(nextSlides.length - 1);
    }
  };

  const handleDuplicateSlide = (index) => {
    const slideToCopy = { ...carousel.slides[index] };
    const nextSlides = [...carousel.slides];
    nextSlides.splice(index + 1, 0, slideToCopy);
    setCarousel({ ...carousel, slides: nextSlides });
    setActiveSlideIndex(index + 1);
  };

  const handleMoveSlide = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= carousel.slides.length) return;
    const nextSlides = [...carousel.slides];
    const [moved] = nextSlides.splice(fromIndex, 1);
    nextSlides.splice(toIndex, 0, moved);
    setCarousel({ ...carousel, slides: nextSlides });
    setActiveSlideIndex(toIndex);
  };

  const handleLoadCarousel = (newCarousel) => {
    setCarousel(newCarousel);
    setActiveSlideIndex(0);
  };

  const handleUpdateBrandConfig = (key, val) => {
    setBrandConfig(prev => ({ ...prev, [key]: val }));
  };

  const handleExportZip = async () => {
    try {
      setIsExporting(true);
      const elements = slideRefs.current.filter(Boolean);
      await exportCarouselToZip(elements, carousel, (current, total, text) => {
        setExportProgress({ current, total, text });
      });
    } catch (err) {
      console.error('Error exportando ZIP:', err);
      alert('Hubo un error al generar las imágenes. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
      setExportProgress({ current: 0, total: 0, text: '' });
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const elements = slideRefs.current.filter(Boolean);
      await exportCarouselToPDF(elements, carousel, (current, total, text) => {
        setExportProgress({ current, total, text });
      });
    } catch (err) {
      console.error('Error exportando PDF:', err);
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
      setExportProgress({ current: 0, total: 0, text: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F7F7F7] flex flex-col">
      
      <Header
        onOpenImporter={() => setIsImporterOpen(true)}
        onExportZip={handleExportZip}
        onExportPDF={handleExportPDF}
        onOpenCaptionModal={() => setIsCaptionModalOpen(true)}
        onOpenWhatsAppCROModal={() => setIsWhatsAppCROModalOpen(true)}
        isExporting={isExporting}
        exportProgress={exportProgress}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Slide & Theme Editor (5 cols) */}
        <div className="lg:col-span-5 h-[calc(100vh-6rem)] sticky top-20">
          <SlideEditor
            slides={carousel.slides}
            activeSlideIndex={activeSlideIndex}
            onSelectSlide={setActiveSlideIndex}
            onUpdateSlide={handleUpdateSlide}
            onAddSlide={handleAddSlide}
            onDeleteSlide={handleDeleteSlide}
            onDuplicateSlide={handleDuplicateSlide}
            onMoveSlide={handleMoveSlide}
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
            brandConfig={brandConfig}
            onUpdateBrandConfig={handleUpdateBrandConfig}
          />
        </div>

        {/* Right Column: Live Instagram 4:5 Previewer (7 cols) */}
        <div className="lg:col-span-7 h-[calc(100vh-6rem)] flex flex-col">
          <CarouselPreview
            slides={carousel.slides}
            activeSlideIndex={activeSlideIndex}
            onSelectSlide={setActiveSlideIndex}
            onUpdateSlide={handleUpdateSlide}
            theme={currentTheme}
            brandConfig={brandConfig}
            slideRefs={slideRefs}
          />
        </div>

      </main>

      <SortFeedImporter
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        onLoadCarousel={handleLoadCarousel}
      />

      <CaptionModal
        isOpen={isCaptionModalOpen}
        onClose={() => setIsCaptionModalOpen(false)}
        caption={carousel.caption || ''}
        onUpdateCaption={(cap) => setCarousel({ ...carousel, caption: cap })}
      />

      <WhatsAppCROModal
        isOpen={isWhatsAppCROModalOpen}
        onClose={() => setIsWhatsAppCROModalOpen(false)}
      />

    </div>
  );
}
