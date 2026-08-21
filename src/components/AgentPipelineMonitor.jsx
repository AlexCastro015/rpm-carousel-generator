import React from 'react';
import { Bot, CheckCircle2, Loader2, Sparkles, ShieldCheck, Camera, FileText, Share2 } from 'lucide-react';
import { SUBAGENTS_MANIFEST } from '../utils/agents/orchestrator';

export default function AgentPipelineMonitor({ telemetry = [], isRunning = false }) {
  const getAgentIcon = (id) => {
    switch (id) {
      case 'trend': return Sparkles;
      case 'copywriter': return FileText;
      case 'visual': return Camera;
      case 'seo': return Share2;
      case 'qa': return ShieldCheck;
      default: return Bot;
    }
  };

  const getAgentStatus = (id) => {
    const entry = [...telemetry].reverse().find(t => t.agentId === id);
    if (!entry) return isRunning ? 'waiting' : 'idle';
    return entry.status;
  };

  const getAgentDetails = (id) => {
    const entry = [...telemetry].reverse().find(t => t.agentId === id);
    return entry ? entry.details : '';
  };

  return (
    <div className="bg-[#15181C] border border-[#2B3036] rounded-xl p-4 my-4">
      <div className="flex items-center justify-between mb-3 border-b border-[#2B3036] pb-2">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#FFC400]" />
          <h4 className="text-sm font-semibold text-[#F7F7F7] uppercase tracking-wider font-heading">
            Pipeline Multi-Agente RPM
          </h4>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1F242A] text-[#FFC400] border border-[#FFC400]/30">
          5 Subagentes Activos
        </span>
      </div>

      <div className="space-y-2.5">
        {SUBAGENTS_MANIFEST.map((agent) => {
          const Icon = getAgentIcon(agent.id);
          const status = getAgentStatus(agent.id);
          const details = getAgentDetails(agent.id);

          return (
            <div
              key={agent.id}
              className={`flex items-start gap-3 p-2.5 rounded-lg text-xs transition-all duration-300 ${
                status === 'running'
                  ? 'bg-[#FFC400]/10 border border-[#FFC400]/40'
                  : status === 'completed'
                  ? 'bg-[#1A1E23] border border-green-500/30'
                  : 'bg-[#111316] border border-transparent opacity-60'
              }`}
            >
              <div className="mt-0.5">
                {status === 'running' ? (
                  <Loader2 className="w-4 h-4 text-[#FFC400] animate-spin" />
                ) : status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <Icon className="w-4 h-4 text-zinc-500" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#F7F7F7] truncate">{agent.name}</span>
                  <span
                    className={`text-[10px] uppercase px-1.5 py-0.2 rounded font-mono ${
                      status === 'running'
                        ? 'text-[#FFC400]'
                        : status === 'completed'
                        ? 'text-green-400'
                        : 'text-zinc-500'
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <p className="text-zinc-400 text-[11px] mt-0.5 truncate">
                  {details || agent.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
