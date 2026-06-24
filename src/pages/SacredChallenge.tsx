import React from 'react';
import { Award, Calendar, CheckCircle2, Circle, Flame, RotateCcw, Sparkles } from 'lucide-react';
import { useChallengeStore } from '../store/challengeStore';


export const SacredChallenge: React.FC = () => {
  const { challenges, startChallenge, toggleTask, completeDay, resetChallenge } = useChallengeStore();

  const handleStart = (id: string) => {
    startChallenge(id);
  };

  const handleToggle = (challengeId: string, taskId: string) => {
    toggleTask(challengeId, taskId);
  };

  const handleComplete = (challengeId: string) => {
    completeDay(challengeId);
  };

  const handleReset = (challengeId: string) => {
    if (confirm('Tem certeza que deseja reiniciar o progresso deste desafio espiritual?')) {
      resetChallenge(challengeId);
    }
  };

  // Divide entre desafios iniciados e disponíveis
  const activeChallenges = challenges.filter((c) => c.startDate && !c.completed);
  const completedChallenges = challenges.filter((c) => c.completed);
  const availableChallenges = challenges.filter((c) => !c.startDate && !c.completed);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Desafio <span className="gold-text-gradient font-serif">Sagrado de Fé</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Assuma um compromisso de oração e meditação. Desenvolva o hábito diário e sintonize seu espírito com o Criador.
        </p>
      </div>

      {/* 1. Desafios Ativos */}
      {activeChallenges.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-slate-200">Desafios em Andamento</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {activeChallenges.map((c) => {
              const allTasksDone = c.dailyTasks.every((t) => t.completed);
              
              return (
                <div
                  key={c.id}
                  className="rounded-3xl glass-effect p-6 md:p-8 border border-spiritual-gold/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden"
                >
                  {/* Detalhe Dourado */}
                  <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-spiritual-gold/5 blur-xl pointer-events-none" />

                  {/* Informações Básicas */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-slate-100">{c.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{c.description}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      {/* Streak */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/25">
                        <Flame className="w-4 h-4 fill-current" />
                        <span className="text-xs font-bold">{c.streak} Dias Seguidos</span>
                      </div>
                      
                      {/* Dias Concluídos */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-spiritual-gold/15 text-spiritual-gold border border-spiritual-gold/20">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-bold">Dia {c.completedDays + 1} de {c.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lista de Tarefas do Dia */}
                  <div className="space-y-3 mb-6 bg-spiritual-dark/50 p-4 md:p-6 rounded-2xl border border-white/5">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                      Lista de Tarefas de Hoje (Dia {c.completedDays + 1})
                    </h4>
                    
                    <div className="space-y-3">
                      {c.dailyTasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => handleToggle(c.id, task.id)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/5"
                        >
                          <button className="shrink-0 text-slate-400 hover:text-spiritual-gold transition-colors">
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-spiritual-gold fill-spiritual-gold/15" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>
                          <span className={`text-xs ${task.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                            {task.taskName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Barra de Progresso do Desafio */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Progresso Total do Desafio</span>
                      <span className="font-bold text-slate-200">
                        {c.completedDays} de {c.duration} dias concluídos ({Math.round((c.completedDays / c.duration) * 100)}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full gold-bg-gradient rounded-full transition-all duration-500"
                        style={{ width: `${(c.completedDays / c.duration) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Ações da Base */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/5">
                    <button
                      onClick={() => handleComplete(c.id)}
                      disabled={!allTasksDone}
                      className="w-full sm:flex-1 py-3 rounded-xl gold-bg-gradient text-slate-900 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Concluir Consagração de Hoje</span>
                    </button>
                    
                    <button
                      onClick={() => handleReset(c.id)}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-white/10 transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reiniciar Desafio</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Desafios Concluídos */}
      {completedChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-200">Desafios Completados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedChallenges.map((c) => (
              <div
                key={c.id}
                className="rounded-3xl glass-effect p-6 border border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute right-0 top-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 mb-3">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">Desafio Cumprido!</span>
                  </div>
                  
                  <h3 className="font-serif font-bold text-slate-100 text-lg leading-tight">{c.name}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Parabéns por completar os {c.duration} dias de consagração e purificação espiritual. Que a luz divina guie seus caminhos!
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold">Finalizado com sucesso</span>
                  <button
                    onClick={() => handleReset(c.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reiniciar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Desafios Disponíveis */}
      {availableChallenges.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-slate-200">Desafios de Consagração Disponíveis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availableChallenges.map((c) => (
              <div
                key={c.id}
                className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 hover:border-spiritual-gold/25 transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-spiritual-indigo/60 border border-white/10 flex items-center justify-center mb-4 text-spiritual-gold group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-serif font-bold text-slate-100 text-lg leading-snug group-hover:text-spiritual-gold-light transition-colors">
                    {c.name}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">{c.duration} Dias</span>
                  
                  <button
                    onClick={() => handleStart(c.id)}
                    className="px-4 py-2 rounded-full gold-bg-gradient text-slate-900 font-bold text-[10px] uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Iniciar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
