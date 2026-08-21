import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  Palette, 
  Type, 
  Layers, 
  Check, 
  Upload,
  Image as ImageIcon,
  X,
  Sliders,
  FolderOpen,
  Sparkles,
  Bot,
  Gauge,
  Activity,
  ListChecks,
  Quote,
  Flame,
  Wrench,
  Zap,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { THEMES } from '../data/themes';
import { AUTOMOTIVE_IMAGE_PRESETS, rewriteSlideWithAI } from '../utils/aiEngine';

export default function SlideEditor({
  slides,
  activeSlideIndex,
  onSelectSlide,
  onUpdateSlide,
  onAddSlide,
  onDeleteSlide,
  onDuplicateSlide,
  onMoveSlide,
  currentTheme,
  onSelectTheme,
  brandConfig,
  onUpdateBrandConfig
}) {
  const [editorTab, setEditorTab] = useState('content'); // 'content', 'visual', 'slides', 'theme'
  const [dragOverImage, setDragOverImage] = useState(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const fileInputRef = useRef(null);

  const activeSlide = slides[activeSlideIndex] || slides[0] || {};

  const handleFieldChange = (field, value) => {
    onUpdateSlide(activeSlideIndex, {
      ...activeSlide,
      [field]: value
    });
  };

  const handleImageFileChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      handleFieldChange('image', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    setDragOverImage(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    handleFieldChange('image', null);
  };

  const handleRunCopilotAction = (actionType) => {
    const updated = rewriteSlideWithAI(activeSlide, actionType);
    onUpdateSlide(activeSlideIndex, updated);
  };

  const handleUpdateChecklistItem = (idx, value) => {
    const items = [...(activeSlide.checklistItems || [])];
    items[idx] = value;
    handleFieldChange('checklistItems', items);
  };

  const handleAddChecklistItem = () => {
    const items = [...(activeSlide.checklistItems || [])];
    items.push('Nuevo síntoma o punto a verificar');
    handleFieldChange('checklistItems', items);
  };

  const handleRemoveChecklistItem = (idx) => {
    const items = (activeSlide.checklistItems || []).filter((_, i) => i !== idx);
    handleFieldChange('checklistItems', items);
  };

  const archetypeOptions = [
    { id: 'hook', label: 'Portada (Hook)', icon: Flame },
    { id: 'point', label: 'Diagnóstico', icon: Wrench },
    { id: 'vs', label: 'Comparativa VS', icon: Activity },
    { id: 'stat', label: 'Métrica Stat', icon: Gauge },
    { id: 'checklist', label: 'Checklist Test', icon: ListChecks },
    { id: 'quote', label: 'Regla de Oro', icon: Quote },
    { id: 'cta', label: 'Cierre WhatsApp', icon: Zap }
  ];

  return (
    <div className="bg-[#15181C] border border-[#2B3036] rounded-2xl flex flex-col h-full overflow-hidden shadow-xl">
      
      {/* Editor Tabs Header */}
      <div className="flex border-b border-[#2B3036] bg-[#1A1E23] p-1.5 gap-1">
        <button
          onClick={() => setEditorTab('content')}
          className={'flex-1 py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ' + (
            editorTab === 'content'
              ? 'bg-[#2B3036] text-[#FFC400] shadow-sm'
              : 'text-[#AAAAAA] hover:text-[#F7F7F7]'
          )}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Contenido</span>
        </button>

        <button
          onClick={() => setEditorTab('visual')}
          className={'flex-1 py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ' + (
            editorTab === 'visual'
              ? 'bg-[#2B3036] text-[#FFC400] shadow-sm'
              : 'text-[#AAAAAA] hover:text-[#F7F7F7]'
          )}
        >
          <Upload className="w-3.5 h-3.5 text-[#FFC400]" />
          <span>Fotos</span>
        </button>

        <button
          onClick={() => setEditorTab('slides')}
          className={'flex-1 py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ' + (
            editorTab === 'slides'
              ? 'bg-[#2B3036] text-[#FFC400] shadow-sm'
              : 'text-[#AAAAAA] hover:text-[#F7F7F7]'
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Slides ({slides.length})</span>
        </button>

        <button
          onClick={() => setEditorTab('theme')}
          className={'flex-1 py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ' + (
            editorTab === 'theme'
              ? 'bg-[#2B3036] text-[#FFC400] shadow-sm'
              : 'text-[#AAAAAA] hover:text-[#F7F7F7]'
          )}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Estilo</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        
        {/* ================= TAB 1: TEXT CONTENT ================= */}
        {editorTab === 'content' && (
          <div className="space-y-3.5">
            
            {/* Top Slide Selector & Archetype Dropdown */}
            <div className="flex items-center justify-between pb-2 border-b border-[#2B3036]">
              <span className="text-xs font-bold text-[#FFC400] font-barlow tracking-wider">
                SLIDE {activeSlideIndex + 1} DE {slides.length}
              </span>

              <select
                value={activeSlide.type || 'point'}
                onChange={(e) => handleFieldChange('type', e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs font-semibold focus:outline-none focus:border-[#FFC400]"
              >
                <option value="hook">🔥 Portada (Hook)</option>
                <option value="point">🔧 Diagnóstico / Paso</option>
                <option value="vs">⚡ Comparativa VS (Antes/Después)</option>
                <option value="stat">📊 Métrica / Dato Crítico</option>
                <option value="checklist">📋 Checklist de Test</option>
                <option value="quote">💬 Regla de Oro / Consejo</option>
                <option value="cta">📲 Cierre WhatsApp (CTA)</option>
              </select>
            </div>

            {/* Quick Archetype Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {archetypeOptions.map((arch) => {
                const Icon = arch.icon;
                const isSelected = (activeSlide.type || 'point') === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => handleFieldChange('type', arch.id)}
                    className={'px-2 py-1 rounded-lg text-[10px] font-semibold font-barlow tracking-wider shrink-0 flex items-center gap-1 transition-all ' + (
                      isSelected
                        ? 'bg-[#FFC400] text-black shadow-md'
                        : 'bg-[#1A1E23] border border-[#2B3036] text-[#AAAAAA] hover:text-[#F7F7F7]'
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{arch.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live AI Copilot Bar */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#1A1E23] to-[#22272E] border border-[#FFC400]/30 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FFC400] font-barlow tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>IA COPILOT INSTAGRAM</span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#FFC400]/15 text-[#FFC400]">
                  1-Clic
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <button
                  onClick={() => handleRunCopilotAction('viral')}
                  className="px-2 py-1 rounded-lg bg-[#15181C] hover:bg-[#FFC400]/15 border border-[#2B3036] hover:border-[#FFC400]/40 text-[10px] font-semibold text-[#F7F7F7] truncate"
                  title="Aumentar gancho y viralidad"
                >
                  🔥 Más Viral
                </button>
                <button
                  onClick={() => handleRunCopilotAction('technical')}
                  className="px-2 py-1 rounded-lg bg-[#15181C] hover:bg-[#FFC400]/15 border border-[#2B3036] hover:border-[#FFC400]/40 text-[10px] font-semibold text-[#F7F7F7] truncate"
                  title="Enfoque técnico mecánico"
                >
                  🔧 Más Técnico
                </button>
                <button
                  onClick={() => handleRunCopilotAction('concise')}
                  className="px-2 py-1 rounded-lg bg-[#15181C] hover:bg-[#FFC400]/15 border border-[#2B3036] hover:border-[#FFC400]/40 text-[10px] font-semibold text-[#F7F7F7] truncate"
                  title="Resumir para lectura rápida"
                >
                  ⚡ Más Conciso
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleRunCopilotAction('to_vs')}
                  className="px-2 py-1 rounded-lg bg-[#15181C] hover:bg-[#FFC400]/15 border border-[#2B3036] hover:border-[#FFC400]/40 text-[10px] font-semibold text-[#AAAAAA] hover:text-[#F7F7F7] truncate"
                >
                  ⚡ A Comparativa
                </button>
                <button
                  onClick={() => handleRunCopilotAction('to_checklist')}
                  className="px-2 py-1 rounded-lg bg-[#15181C] hover:bg-[#FFC400]/15 border border-[#2B3036] hover:border-[#FFC400]/40 text-[10px] font-semibold text-[#AAAAAA] hover:text-[#F7F7F7] truncate"
                >
                  📋 A Checklist
                </button>
                <button
                  onClick={() => handleRunCopilotAction('to_stat')}
                  className="px-2 py-1 rounded-lg bg-[#15181C] hover:bg-[#FFC400]/15 border border-[#2B3036] hover:border-[#FFC400]/40 text-[10px] font-semibold text-[#AAAAAA] hover:text-[#F7F7F7] truncate"
                >
                  📊 A Métrica
                </button>
              </div>
            </div>

            {/* General Fields */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                  Eyebrow / Alerta:
                </label>
                <input
                  type="text"
                  value={activeSlide.eyebrow || ''}
                  onChange={(e) => handleFieldChange('eyebrow', e.target.value)}
                  placeholder="MECÁNICA VITAL"
                  className="w-full px-3 py-1.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                  Badge Superior:
                </label>
                <input
                  type="text"
                  value={activeSlide.badge || ''}
                  onChange={(e) => handleFieldChange('badge', e.target.value)}
                  placeholder="ALERTA TÉCNICA"
                  className="w-full px-3 py-1.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                />
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                Titular Principal (Barlow Condensed):
              </label>
              <textarea
                rows={2}
                value={activeSlide.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="TITULAR DE ALTO IMPACTO EN MAYÚSCULAS"
                className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs font-barlow font-bold uppercase focus:outline-none focus:border-[#FFC400] resize-none"
              />
            </div>

            {/* ================= ARCHETYPE SPECIFIC EDITORS ================= */}

            {/* 1. VS COMPARISON FIELDS */}
            {activeSlide.type === 'vs' && (
              <div className="space-y-2.5 p-3 rounded-xl bg-[#121418] border border-[#2B3036]">
                <span className="text-[11px] font-bold text-[#FFC400] uppercase font-barlow tracking-wider block">
                  Configuración de Comparativa VS:
                </span>

                <div>
                  <label className="block text-[10px] font-semibold text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> ❌ Error Común / Pieza Mala:
                  </label>
                  <textarea
                    rows={2}
                    value={activeSlide.vsWrong || ''}
                    onChange={(e) => handleFieldChange('vsWrong', e.target.value)}
                    placeholder="Instalar pastillas sobre discos rayados o piezas usadas..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#1A1E23] border border-red-500/30 text-[#F7F7F7] text-xs focus:outline-none focus:border-red-400 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ✅ Solución Repuestos RPM:
                  </label>
                  <textarea
                    rows={2}
                    value={activeSlide.vsRight || ''}
                    onChange={(e) => handleFieldChange('vsRight', e.target.value)}
                    placeholder="Instalar repuestos 100% nuevos garantizados con tolerancia de fábrica..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#1A1E23] border border-emerald-500/30 text-[#F7F7F7] text-xs focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>
              </div>
            )}

            {/* 2. STAT METRIC FIELDS */}
            {activeSlide.type === 'stat' && (
              <div className="space-y-2.5 p-3 rounded-xl bg-[#121418] border border-[#2B3036]">
                <span className="text-[11px] font-bold text-[#FFC400] uppercase font-barlow tracking-wider block">
                  Configuración de Métrica Crítica:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                      Número / Métrica Gigante:
                    </label>
                    <input
                      type="text"
                      value={activeSlide.statNumber || ''}
                      onChange={(e) => handleFieldChange('statNumber', e.target.value)}
                      placeholder="2 MM / 80.000 KM"
                      className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#FFC400] font-barlow font-black text-base focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                      Etiqueta del Dato:
                    </label>
                    <input
                      type="text"
                      value={activeSlide.statLabel || ''}
                      onChange={(e) => handleFieldChange('statLabel', e.target.value)}
                      placeholder="Límite crítico de pastillas"
                      className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                    Explicación del Riesgo:
                  </label>
                  <textarea
                    rows={2}
                    value={activeSlide.description || ''}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    placeholder="Al llegar a este límite el calor deforma metales..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400] resize-none"
                  />
                </div>
              </div>
            )}

            {/* 3. CHECKLIST FIELDS */}
            {activeSlide.type === 'checklist' && (
              <div className="space-y-2.5 p-3 rounded-xl bg-[#121418] border border-[#2B3036]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#FFC400] uppercase font-barlow tracking-wider">
                    Ítems del Test de Diagnóstico:
                  </span>
                  <button
                    onClick={handleAddChecklistItem}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FFC400] text-black hover:bg-[#FFD13A]"
                  >
                    + Añadir Ítem
                  </button>
                </div>

                <div className="space-y-2">
                  {(activeSlide.checklistItems || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-xs text-[#FFC400] font-bold font-barlow">{idx + 1}.</span>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleUpdateChecklistItem(idx, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                      />
                      <button
                        onClick={() => handleRemoveChecklistItem(idx)}
                        className="p-1 rounded text-red-400 hover:bg-red-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. QUOTE FIELDS */}
            {activeSlide.type === 'quote' && (
              <div className="space-y-2.5 p-3 rounded-xl bg-[#121418] border border-[#2B3036]">
                <span className="text-[11px] font-bold text-[#FFC400] uppercase font-barlow tracking-wider block">
                  Frase de Autoridad / Regla de Oro:
                </span>

                <div>
                  <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                    Cita o Consejo:
                  </label>
                  <textarea
                    rows={3}
                    value={activeSlide.quoteText || ''}
                    onChange={(e) => handleFieldChange('quoteText', e.target.value)}
                    placeholder="«Un repuesto 100% nuevo garantiza tolerancias de fábrica...»"
                    className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs font-semibold focus:outline-none focus:border-[#FFC400] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                    Firma / Autor:
                  </label>
                  <input
                    type="text"
                    value={activeSlide.quoteAuthor || ''}
                    onChange={(e) => handleFieldChange('quoteAuthor', e.target.value)}
                    placeholder="Equipo Técnico · Repuestos RPM"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                  />
                </div>
              </div>
            )}

            {/* 5. STANDARD POINT / HOOK FIELDS */}
            {(activeSlide.type === 'point' || activeSlide.type === 'hook') && (
              <div>
                <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                  {activeSlide.type === 'hook' ? 'Subtítulo / Contexto Gancho:' : 'Descripción / Explicación:'}
                </label>
                <textarea
                  rows={3}
                  value={activeSlide.subtitle || activeSlide.description || ''}
                  onChange={(e) => handleFieldChange(activeSlide.type === 'hook' ? 'subtitle' : 'description', e.target.value)}
                  placeholder="Explicación clara y directa..."
                  className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs leading-relaxed focus:outline-none focus:border-[#FFC400] resize-none"
                />
              </div>
            )}

            {/* Takeaway Box for all educational slides */}
            {activeSlide.type !== 'cta' && (
              <div>
                <label className="block text-[10px] font-semibold text-[#FFC400] uppercase tracking-wider mb-1">
                  💡 Consejo RPM / Conclusión Destacada:
                </label>
                <input
                  type="text"
                  value={activeSlide.keyTakeaway || ''}
                  onChange={(e) => handleFieldChange('keyTakeaway', e.target.value)}
                  placeholder="Ej: Cotiza siempre con Marca, Modelo y Año"
                  className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                />
              </div>
            )}

            {/* 6. CTA FIELDS */}
            {activeSlide.type === 'cta' && (
              <div className="space-y-3 pt-2 border-t border-[#2B3036]">
                <div>
                  <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                    Texto Botón WhatsApp:
                  </label>
                  <input
                    type="text"
                    value={activeSlide.ctaButtonText || ''}
                    onChange={(e) => handleFieldChange('ctaButtonText', e.target.value)}
                    placeholder="COTIZAR POR WHATSAPP (+56 9 7546 7525)"
                    className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1">
                    Dirección / Sucursales:
                  </label>
                  <input
                    type="text"
                    value={activeSlide.locations || ''}
                    onChange={(e) => handleFieldChange('locations', e.target.value)}
                    placeholder="📍 Quilpué (Chorrillos 782) · Viña del Mar (Galería San Antonio)"
                    className="w-full px-3 py-2 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: ATTACH IMAGES / UPLOAD ================= */}
        {editorTab === 'visual' && (
          <div className="space-y-4">
            
            {/* Current Image Preview & Actions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider">
                  Foto de la Diapositiva {activeSlideIndex + 1}:
                </label>
                {activeSlide.image && (
                  <button
                    onClick={handleRemoveImage}
                    className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                  >
                    <X className="w-3 h-3" /> Quitar foto
                  </button>
                )}
              </div>
              
              {activeSlide.image ? (
                <div className="relative rounded-xl overflow-hidden border border-[#2B3036] aspect-video group shadow-lg">
                  <img 
                    src={activeSlide.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-2 rounded-xl bg-[#FFC400] text-black font-barlow font-bold text-xs flex items-center gap-1.5 shadow-lg hover:bg-[#FFD13A]"
                    >
                      <Upload className="w-4 h-4" />
                      Cambiar Archivo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed border-[#2B3036] text-center text-xs text-[#AAAAAA] bg-[#121418]">
                  Esta diapositiva se mostrará en formato solo texto / tipografía.
                </div>
              )}
            </div>

            {/* Drag & Drop File Upload Box */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOverImage(true); }}
              onDragLeave={() => setDragOverImage(false)}
              onDrop={handleDropImage}
              onClick={() => fileInputRef.current?.click()}
              className={'border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ' + (
                dragOverImage
                  ? 'border-[#FFC400] bg-[#FFC400]/10'
                  : 'border-[#2B3036] hover:border-[#FFC400]/50 bg-[#1A1E23]/60'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(e) => handleImageFileChange(e.target.files?.[0])}
              />
              
              <div className="w-10 h-10 rounded-full bg-[#FFC400]/15 text-[#FFC400] flex items-center justify-center">
                <Upload className="w-5 h-5" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#F7F7F7]">
                  Haz clic para <span className="text-[#FFC400]">adjuntar foto de tu equipo</span> o arrástrala aquí
                </p>
                <p className="text-[10px] text-[#AAAAAA] mt-0.5">
                  Soporta formatos JPG, PNG y WEBP (alta resolución para Instagram)
                </p>
              </div>

              <button 
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#FFC400] hover:bg-[#FFD13A] text-black font-barlow font-bold text-xs flex items-center gap-1 shadow-md mt-1"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>EXAMINAR ARCHIVO...</span>
              </button>
            </div>

            {/* Layout Mode Selector */}
            <div className="pt-2 border-t border-[#2B3036]">
              <label className="block text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-2">
                Modo de Integración en el Carrusel:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleFieldChange('imageLayout', 'card-3d')}
                  className={'p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ' + (
                    (activeSlide.imageLayout || 'card-3d') === 'card-3d'
                      ? 'border-[#FFC400] bg-[#1A1E23] text-[#FFC400]'
                      : 'border-[#2B3036] bg-[#121418] text-[#AAAAAA]'
                  )}
                >
                  <span>Tarjeta 3D Centrada</span>
                  <span className="text-[9px] text-[#AAAAAA]">Foto de repuesto sobre fondo grafito</span>
                </button>

                <button
                  onClick={() => handleFieldChange('imageLayout', 'full-bleed')}
                  className={'p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all ' + (
                    activeSlide.imageLayout === 'full-bleed'
                      ? 'border-[#FFC400] bg-[#1A1E23] text-[#FFC400]'
                      : 'border-[#2B3036] bg-[#121418] text-[#AAAAAA]'
                  )}
                >
                  <span>Fondo Completo (Fade)</span>
                  <span className="text-[9px] text-[#AAAAAA]">Foto en toda la diapositiva con degradado</span>
                </button>
              </div>
            </div>

            {/* Quick RPM Presets Library */}
            <div className="pt-2 border-t border-[#2B3036]">
              <label className="block text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-2">
                O elige una foto de nuestra biblioteca de estudio:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(AUTOMOTIVE_IMAGE_PRESETS).slice(0, 6).map(([key, url]) => (
                  <div
                    key={key}
                    onClick={() => handleFieldChange('image', url)}
                    className="aspect-square rounded-lg overflow-hidden border border-[#2B3036] hover:border-[#FFC400] cursor-pointer relative group"
                  >
                    <img src={url} alt={key} className="w-full h-full object-cover" crossOrigin="anonymous" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[9px] font-bold text-white uppercase text-center p-1">
                      {key.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: SLIDE LIST / REORDER ================= */}
        {editorTab === 'slides' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#AAAAAA]">Organiza el orden de las diapositivas:</span>
              <button
                onClick={onAddSlide}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FFC400] text-black hover:bg-[#FFD13A] transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir</span>
              </button>
            </div>

            <div className="space-y-2">
              {slides.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectSlide(idx)}
                  className={'p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ' + (
                    activeSlideIndex === idx
                      ? 'bg-[#1A1E23] border-[#FFC400]'
                      : 'bg-[#121418] border-[#2B3036] hover:border-[#AAAAAA]/30'
                  )}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-6 h-6 rounded-md bg-[#2B3036] text-[#FFC400] font-barlow font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <div className="text-[10px] uppercase font-bold text-[#FFC400]">{s.type || 'point'}</div>
                      <div className="text-xs font-medium text-[#F7F7F7] truncate">{s.title || 'Sin título'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      disabled={idx === 0}
                      onClick={() => onMoveSlide(idx, idx - 1)}
                      className="p-1 rounded text-[#AAAAAA] hover:text-[#F7F7F7] disabled:opacity-20"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === slides.length - 1}
                      onClick={() => onMoveSlide(idx, idx + 1)}
                      className="p-1 rounded text-[#AAAAAA] hover:text-[#F7F7F7] disabled:opacity-20"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDuplicateSlide(idx)}
                      className="p-1 rounded text-[#AAAAAA] hover:text-[#FFC400]"
                      title="Duplicar"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {slides.length > 1 && (
                      <button
                        onClick={() => onDeleteSlide(idx)}
                        className="p-1 rounded text-[#AAAAAA] hover:text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: THEME & BRAND ================= */}
        {editorTab === 'theme' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider mb-2">
                Paleta de Diseño:
              </label>
              <div className="space-y-2">
                {THEMES.map((th) => (
                  <div
                    key={th.id}
                    onClick={() => onSelectTheme(th)}
                    className={'p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ' + (
                      currentTheme.id === th.id
                        ? 'border-[#FFC400] bg-[#1A1E23]'
                        : 'border-[#2B3036] bg-[#121418] hover:border-[#AAAAAA]/30'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-7 h-7 rounded-lg border border-white/20 flex items-center justify-center font-bold text-xs"
                        style={{ background: th.accent, color: '#000000' }}
                      >
                        ⚡
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#F7F7F7]">{th.name}</div>
                        <div className="text-[10px] text-[#AAAAAA]">{th.description}</div>
                      </div>
                    </div>

                    {currentTheme.id === th.id && (
                      <div className="w-5 h-5 rounded-full bg-[#FFC400] text-black flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#2B3036] space-y-2.5">
              <label className="block text-[11px] font-semibold text-[#AAAAAA] uppercase tracking-wider">
                Ajustes de Marca (RPM):
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-xs cursor-pointer">
                <span>Mostrar Logo RPM Superior</span>
                <input
                  type="checkbox"
                  checked={brandConfig.showLogo}
                  onChange={(e) => onUpdateBrandConfig('showLogo', e.target.checked)}
                  className="accent-[#FFC400]"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-xs cursor-pointer">
                <span>Mostrar Indicador de Deslizar (👉)</span>
                <input
                  type="checkbox"
                  checked={brandConfig.showSwipeArrow}
                  onChange={(e) => onUpdateBrandConfig('showSwipeArrow', e.target.checked)}
                  className="accent-[#FFC400]"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-xs cursor-pointer">
                <span>Mostrar Footer con @repuestos_rpm</span>
                <input
                  type="checkbox"
                  checked={brandConfig.showAuthorTag}
                  onChange={(e) => onUpdateBrandConfig('showAuthorTag', e.target.checked)}
                  className="accent-[#FFC400]"
                />
              </label>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
