import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileSpreadsheet, 
  Sparkles, 
  Layers, 
  Eye, 
  Heart, 
  ArrowRight, 
  X, 
  HelpCircle, 
  CheckCircle2, 
  Wand2,
  Bot
} from 'lucide-react';
import { parseSortFeedCSV, parseSortFeedJSON } from '../utils/sortFeedParser';
import { executeMultiAgentCarouselPipeline } from '../utils/agents/orchestrator';
import { generateFullRPMCarouselFromAI } from '../utils/aiEngine';
import { AUTOMOTIVE_PRESETS } from '../data/presets';
import AgentPipelineMonitor from './AgentPipelineMonitor';

export default function SortFeedImporter({ isOpen, onClose, onLoadCarousel }) {
  const [activeTab, setActiveTab] = useState('upload');
  const [rawText, setRawText] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [parsedPosts, setParsedPosts] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [agentTelemetry, setAgentTelemetry] = useState([]);

  if (!isOpen) return null;

  const handleFileUpload = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      if (file.name.endsWith('.json')) {
        const posts = parseSortFeedJSON(content);
        setParsedPosts(posts);
      } else {
        const posts = parseSortFeedCSV(content);
        setParsedPosts(posts);
      }
    };

    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPostFromFeed = async (post) => {
    setSelectedPostId(post.id);
    setIsProcessingAI(true);
    setAgentTelemetry([]);

    const textToTransform = post.transcript || post.caption || post.rawTitle || post.title || 'Guía Automotriz RPM';
    const topic = post.rawTitle || post.title || customTopic || 'Guía Automotriz RPM';
    
    try {
      const { carousel, telemetry } = await executeMultiAgentCarouselPipeline(
        { caption: textToTransform, transcript: textToTransform, title: topic, views: post.views, likes: post.likes },
        (step, allLogs) => {
          setAgentTelemetry([...allLogs]);
        }
      );

      setTimeout(() => {
        if (carousel) {
          onLoadCarousel(carousel);
          setIsProcessingAI(false);
          setSelectedPostId(null);
          onClose();
        }
      }, 500);
    } catch (err) {
      console.error('Error en pipeline multi-agente:', err);
      // Fallback
      const generated = generateFullRPMCarouselFromAI(textToTransform, topic);
      onLoadCarousel(generated);
      setIsProcessingAI(false);
      setSelectedPostId(null);
      onClose();
    }
  };

  const handleTransformText = async () => {
    const textToUse = rawText.trim() || customTopic.trim();
    if (!textToUse) return;
    
    setIsProcessingAI(true);
    setAgentTelemetry([]);

    try {
      const { carousel } = await executeMultiAgentCarouselPipeline(
        { caption: textToUse, transcript: textToUse, title: customTopic },
        (step, allLogs) => {
          setAgentTelemetry([...allLogs]);
        }
      );

      setTimeout(() => {
        if (carousel) {
          onLoadCarousel(carousel);
          setIsProcessingAI(false);
          onClose();
        }
      }, 500);
    } catch (err) {
      console.error('Error en pipeline multi-agente:', err);
      const generated = generateFullRPMCarouselFromAI(textToUse, customTopic);
      onLoadCarousel(generated);
      setIsProcessingAI(false);
      onClose();
    }
  };

  const handleSelectPreset = (preset) => {
    onLoadCarousel(preset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#15181C] border border-[#2B3036] rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#2B3036] flex items-center justify-between bg-[#1A1E23]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFC400]/15 text-[#FFC400] flex items-center justify-center border border-[#FFC400]/30 shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-barlow font-bold text-lg text-[#F7F7F7] tracking-wide flex items-center gap-2">
                <span>ESTUDIO SUBAGÉNTICO & SORT FEED</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#FFC400] text-black">
                  5 Subagentes
                </span>
              </h3>
              <p className="text-xs text-[#AAAAAA]">
                Pipeline autónomo: Trend Analyst → Copywriter → Visual Art → Social SEO → QA Layout
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#AAAAAA] hover:text-[#F7F7F7] p-1.5 rounded-lg hover:bg-[#2B3036] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#2B3036] bg-[#121418] px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={'pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ' + (
              activeTab === 'upload'
                ? 'border-[#FFC400] text-[#FFC400]'
                : 'border-transparent text-[#AAAAAA] hover:text-[#F7F7F7]'
            )}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Subir Archivo Sort Feed (.CSV / .JSON)</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={'pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ' + (
              activeTab === 'paste'
                ? 'border-[#FFC400] text-[#FFC400]'
                : 'border-transparent text-[#AAAAAA] hover:text-[#F7F7F7]'
            )}
          >
            <Sparkles className="w-4 h-4" />
            <span>Pegar Transcripción o Guion</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={'pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ' + (
              activeTab === 'presets'
                ? 'border-[#FFC400] text-[#FFC400]'
                : 'border-transparent text-[#AAAAAA] hover:text-[#F7F7F7]'
            )}
          >
            <Layers className="w-4 h-4" />
            <span>Plantillas Virales RPM</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Active Agent Pipeline Monitor during execution */}
          {isProcessingAI && (
            <AgentPipelineMonitor telemetry={agentTelemetry} isRunning={isProcessingAI} />
          )}

          {/* TAB 1: UPLOAD */}
          {activeTab === 'upload' && !isProcessingAI && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={'border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ' + (
                  dragOver
                    ? 'border-[#FFC400] bg-[#FFC400]/5'
                    : 'border-[#2B3036] hover:border-[#FFC400]/40 bg-[#1A1E23]/50'
                )}
                onClick={() => document.getElementById('sortfeed-file-input').click()}
              >
                <input
                  id="sortfeed-file-input"
                  type="file"
                  accept=".csv,.json"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
                
                <div className="w-12 h-12 rounded-full bg-[#FFC400]/10 text-[#FFC400] flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#F7F7F7]">
                    Arrastra aquí el archivo exportado por <span className="text-[#FFC400]">Sort Feed</span>
                  </p>
                  <p className="text-xs text-[#AAAAAA] mt-1">
                    Los subagentes analizarán el engagement y construirán el carrusel automáticamente
                  </p>
                </div>

                {fileName && (
                  <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/50 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Archivo cargado: {fileName}
                  </span>
                )}
              </div>

              {/* Parsed List */}
              {parsedPosts.length > 0 && (
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-xs text-[#AAAAAA]">
                    <span className="font-semibold text-[#F7F7F7]">
                      {parsedPosts.length} posts detectados (haz clic en cualquiera para iniciar pipeline subagéntico):
                    </span>
                    <span className="text-[#FFC400] font-semibold flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" /> Pipeline 5 Agentes
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {parsedPosts.map((post, idx) => (
                      <div
                        key={post.id || idx}
                        onClick={() => handleSelectPostFromFeed(post)}
                        className={'p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ' + (
                          selectedPostId === post.id
                            ? 'bg-[#FFC400]/15 border-[#FFC400]'
                            : 'bg-[#1A1E23] hover:bg-[#22272E] border-[#2B3036] hover:border-[#FFC400]/60'
                        )}
                      >
                        <div className="space-y-1 overflow-hidden flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#FFC400] font-barlow">#{idx + 1}</span>
                            <span className="text-xs font-semibold text-[#F7F7F7] truncate">{post.title}</span>
                          </div>
                          <p className="text-[11px] text-[#AAAAAA] line-clamp-2">
                            {post.transcript || post.caption || post.title}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {post.views > 0 && (
                            <div className="flex items-center gap-1 text-[11px] text-[#AAAAAA]">
                              <Eye className="w-3 h-3 text-[#FFC400]" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                          )}
                          {post.likes > 0 && (
                            <div className="flex items-center gap-1 text-[11px] text-[#AAAAAA]">
                              <Heart className="w-3 h-3 text-red-400" />
                              <span>{post.likes.toLocaleString()}</span>
                            </div>
                          )}
                          <button 
                            className="px-3 py-1.5 rounded-lg bg-[#FFC400] hover:bg-[#FFD13A] text-black font-barlow font-bold text-xs flex items-center gap-1 group-hover:scale-105 transition-transform"
                          >
                            <span>EJECUTAR AGENTES</span>
                            <Sparkles className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-[#1A1E23]/60 border border-[#2B3036] flex items-start gap-2.5 text-xs text-[#AAAAAA]">
                <HelpCircle className="w-4 h-4 text-[#FFC400] shrink-0 mt-0.5" />
                <p>
                  <strong>Pipeline Autónomo:</strong> Al seleccionar cualquier post, el Orquestador ejecuta a los 5 subagentes para extraer hooks virales, redactar guiones técnicos, generar prompts fotográficos, optimizar para WhatsApp y auditar los márgenes de diseño 4:5.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PASTE */}
          {activeTab === 'paste' && !isProcessingAI && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                  Tema o Nombre del Repuesto / Falla (Opcional):
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Ej: Fallas comunes en Kit de Embrague Chery Tiggo 2"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs focus:outline-none focus:border-[#FFC400]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                  Pega aquí la Transcripción de Sort Feed o Puntos Clave:
                </label>
                <textarea
                  rows={8}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Pega la transcripción del video viral o tus notas..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A1E23] border border-[#2B3036] text-[#F7F7F7] text-xs leading-relaxed focus:outline-none focus:border-[#FFC400] resize-none"
                />
              </div>

              <button
                onClick={handleTransformText}
                disabled={!rawText.trim() && !customTopic.trim()}
                className="w-full py-3 rounded-xl bg-[#FFC400] hover:bg-[#FFD13A] text-black font-barlow font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#FFC400]/15 transition-all disabled:opacity-50"
              >
                <Bot className="w-4 h-4" />
                <span>EJECUTAR PIPELINE SUBAGÉNTICO (5 AGENTES)</span>
              </button>
            </div>
          )}

          {/* TAB 3: PRESETS */}
          {activeTab === 'presets' && !isProcessingAI && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AUTOMOTIVE_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="p-4 rounded-xl bg-[#1A1E23] hover:bg-[#22272E] border border-[#2B3036] hover:border-[#FFC400]/50 transition-all cursor-pointer flex flex-col justify-between gap-3 group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-barlow font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFC400]/15 text-[#FFC400]">
                        {preset.category}
                      </span>
                      <span className="text-[10px] text-[#AAAAAA]">{preset.slides.length} diapositivas con fotos</span>
                    </div>
                    <h4 className="font-barlow font-bold text-base text-[#F7F7F7] group-hover:text-[#FFC400] transition-colors leading-tight">
                      {preset.title}
                    </h4>
                    <p className="text-xs text-[#AAAAAA] line-clamp-2 font-inter">
                      {preset.slides[0]?.subtitle || preset.slides[0]?.title}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2B3036]">
                    <span className="text-[10px] font-mono text-[#AAAAAA]">{preset.source}</span>
                    <span className="text-xs font-semibold text-[#FFC400] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Cargar carrusel con fotos <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
