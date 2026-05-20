/* eslint-disable */
import React, { useState, useEffect } from 'react';
import ExerciseLibrary from './components/ExerciseLibrary';
import ProfileScreen   from './components/ProfileScreen';
import HistoryScreen   from './components/HistoryScreen';
import ActiveWorkout   from './components/ActiveWorkout';
import { GOALS, LEVELS, getPlan } from './data/plans';
import { loadProfile, loadHistory } from './utils/storage';
import {
  getCurrentWeek, getCycleWeek, getWeekLabel,
  applyWeeklyProgression, daysUntilNextWeek,
  getStoredWeek, setStoredWeek, resetStoredWeek,
} from './utils/weeklyProgression';

/* ── TEMA CLARO ─────────────────────────────────────────────────── */
const C = {
  bg:      '#f0f4f8',
  bg2:     '#e2e8f0',
  card:    '#ffffff',
  border:  '#e2e8f0',
  accent:  '#f97316',
  accent2: '#6366f1',
  green:   '#22c55e',
  red:     '#ef4444',
  muted:   '#94a3b8',
  text:    '#1e293b',
  text2:   '#475569',
};

const MC = {
  Peito:'#ef4444',Costas:'#3b82f6',Ombros:'#a855f7',Bíceps:'#f59e0b',
  Tríceps:'#10b981',Pernas:'#f97316',Glúteo:'#ec4899',Core:'#06b6d4','Full Body':'#8b5cf6',
};

const S = {
  app:{ minHeight:'100vh', background:C.bg, color:C.text, fontFamily:"'Barlow Condensed','Oswald','Impact',sans-serif", display:'flex', flexDirection:'column', alignItems:'center', padding:'0 14px 80px' },
  logo:{ fontSize:34, fontWeight:900, letterSpacing:6, background:'linear-gradient(135deg,#f97316,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' },
  card:{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'20px 16px', width:'100%', maxWidth:480, marginTop:14, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' },
  btn:(bg,tc)=>({ background:bg||`linear-gradient(135deg,#f97316,#ea580c)`, border:'none', borderRadius:12, padding:15, fontSize:16, fontWeight:900, letterSpacing:2, color:tc||'#fff', cursor:'pointer', width:'100%', marginTop:14, textTransform:'uppercase', boxShadow:'0 4px 14px rgba(249,115,22,0.3)' }),
  goalCard:(s)=>({ background:s?'rgba(249,115,22,0.08)':'#fff', border:`2px solid ${s?C.accent:C.border}`, borderRadius:16, padding:'18px 10px', cursor:'pointer', textAlign:'center', transition:'all 0.2s', transform:s?'scale(1.04)':'scale(1)', boxShadow:s?'0 4px 20px rgba(249,115,22,0.2)':'0 2px 8px rgba(0,0,0,0.06)' }),
  lvlCard:(s)=>({ background:s?'rgba(99,102,241,0.06)':'#fff', border:`2px solid ${s?C.accent2:C.border}`, borderRadius:16, padding:'14px 16px', cursor:'pointer', textAlign:'left', marginBottom:10, display:'flex', alignItems:'center', gap:14, transition:'all 0.2s', boxShadow:s?'0 4px 16px rgba(99,102,241,0.2)':'0 2px 8px rgba(0,0,0,0.04)' }),
  tabBtn:(a)=>({ flex:1, padding:'10px 4px', borderRadius:10, border:'none', cursor:'pointer', fontWeight:900, fontSize:11, letterSpacing:1, textTransform:'uppercase', background:a?'rgba(249,115,22,0.1)':'transparent', color:a?C.accent:C.muted, borderBottom:a?`2px solid ${C.accent}`:'2px solid transparent' }),
  tag:(c)=>({ display:'inline-block', background:`${c}15`, border:`1px solid ${c}40`, color:c, borderRadius:8, padding:'3px 10px', fontSize:11, fontWeight:700 }),
  macroBox:(c)=>({ background:`${c}10`, border:`1px solid ${c}30`, borderRadius:14, padding:'12px 6px', textAlign:'center', flex:1 }),
  dot:(done,curr)=>({ width:8, height:8, borderRadius:'50%', background:curr?C.accent:done?C.green:C.border, boxShadow:curr?`0 0 8px ${C.accent}`:done?`0 0 6px ${C.green}`:'none', transition:'all 0.3s' }),
};

function Muscles({ list }) {
  return (
    <div style={{ marginTop:6 }}>
      {(list||[]).map(m=>(
        <span key={m} style={{ background:`${MC[m]||'#64748b'}15`, border:`1px solid ${MC[m]||'#64748b'}40`, color:MC[m]||'#64748b', borderRadius:6, padding:'2px 8px', fontSize:10, fontWeight:700, display:'inline-block', marginRight:4, marginTop:4 }}>{m}</span>
      ))}
    </div>
  );
}

const btnSmall = { background:'#fff', border:`1px solid ${C.border}`, borderRadius:8, padding:'4px 10px', color:C.text2, cursor:'pointer', fontSize:12, boxShadow:'0 1px 4px rgba(0,0,0,0.08)' };

function WeekBanner({ absoluteWeek, cycleWeek, weekInfo, onPrev, onNext, onReset }) {
  return (
    <div style={{ background:'#fff', border:`1px solid ${C.border}`, borderRadius:16, padding:'14px 16px', width:'100%', maxWidth:480, marginTop:12, boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:12, color:weekInfo.color, fontWeight:900, letterSpacing:2 }}>{weekInfo.icon} SEMANA {absoluteWeek} — {weekInfo.label.toUpperCase()}</div>
          <div style={{ color:C.text2, fontSize:12, marginTop:3 }}>{weekInfo.desc}</div>
          <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>🔄 Ciclo {cycleWeek}/4 · próxima em {daysUntilNextWeek()} dias</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={onPrev} style={btnSmall}>◀</button>
            <button onClick={onNext} style={btnSmall}>▶</button>
          </div>
          <button onClick={onReset} style={{ ...btnSmall, fontSize:9, padding:'3px 8px', color:C.muted }}>AUTO</button>
        </div>
      </div>
      <div style={{ display:'flex', gap:5, marginTop:10 }}>
        {[1,2,3,4].map(w=>(
          <div key={w} style={{ flex:1, height:5, borderRadius:4, background:w===cycleWeek?weekInfo.color:w<cycleWeek?`${weekInfo.color}50`:C.bg2, transition:'all 0.3s' }}/>
        ))}
      </div>
      <div style={{ display:'flex', gap:6, marginTop:4 }}>
        {[['Base','#3b82f6'],['Volume','#f59e0b'],['Intensidade','#ef4444'],['Deload','#22c55e']].map(([label,color])=>(
          <div key={label} style={{ flex:1, textAlign:'center', fontSize:8, color, fontWeight:700 }}>{label}</div>
        ))}
      </div>
    </div>
  );
}

function BottomNav({ screen, onNavigate, hasPlan }) {
  const tabs = [
    { id:'plan',    icon:'🏠', label:'Início'    },
    { id:'library', icon:'📚', label:'Exercícios'},
    { id:'history', icon:'📊', label:'Histórico' },
    { id:'profile', icon:'👤', label:'Perfil'    },
  ];
  return (
    <div style={{ position:'fixed', bottom:0, left:0, right:0, background:'#fff', borderTop:`1px solid ${C.border}`, display:'flex', zIndex:100, boxShadow:'0 -4px 20px rgba(0,0,0,0.08)', paddingBottom:'env(safe-area-inset-bottom)' }}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>{ if(t.id==='plan'&&!hasPlan) onNavigate('goals'); else onNavigate(t.id); }}
          style={{ flex:1, padding:'10px 0 8px', background:'none', border:'none', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
          <span style={{ fontSize:20 }}>{t.icon}</span>
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:0.5, color:screen===t.id?C.accent:C.muted, textTransform:'uppercase' }}>{t.label}</span>
          {screen===t.id && <div style={{ width:20, height:3, borderRadius:2, background:C.accent }}/>}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen]   = useState('welcome');
  const [goals, setGoals]     = useState([]);
  const [level, setLevel]     = useState(null);
  const [plan, setPlan]       = useState(null);
  const [tab, setTab]         = useState('treino');
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [absoluteWeek, setAbsoluteWeek]   = useState(() => getStoredWeek() || getCurrentWeek());
  const [profile, setProfile] = useState(null);
  const [historyCount, setHistoryCount]   = useState(0);

  const cycleWeek = getCycleWeek(absoluteWeek);
  const weekInfo  = getWeekLabel(cycleWeek);

  useEffect(() => { setProfile(loadProfile()); setHistoryCount(loadHistory().length); }, [screen]);

  const changeWeek = (d) => { const n=Math.max(1,absoluteWeek+d); setAbsoluteWeek(n); setStoredWeek(n); };
  const resetWeek  = () => { resetStoredWeek(); setAbsoluteWeek(getCurrentWeek()); };
  const getProgressivePlan = (p) => p ? { ...p, treinos: applyWeeklyProgression(p.treinos, cycleWeek) } : null;
  const progressivePlan = getProgressivePlan(plan);
  const navigate = (s) => setScreen(s);

  if (screen==='library') return (<><ExerciseLibrary onClose={()=>setScreen('plan')}/><BottomNav screen={screen} onNavigate={navigate} hasPlan={!!plan}/></>);
  if (screen==='profile') return (<><ProfileScreen onClose={()=>setScreen('plan')}/><BottomNav screen={screen} onNavigate={navigate} hasPlan={!!plan}/></>);
  if (screen==='history') return (<><HistoryScreen onClose={()=>setScreen('plan')}/><BottomNav screen={screen} onNavigate={navigate} hasPlan={!!plan}/></>);
  if (screen==='workout'&&activeWorkout) return (
    <ActiveWorkout workout={activeWorkout} absoluteWeek={absoluteWeek} weekInfo={weekInfo}
      onFinish={()=>{ setScreen('plan'); setActiveWorkout(null); setHistoryCount(c=>c+1); }}
      onStop={()=>{ setScreen('plan'); setActiveWorkout(null); }}/>
  );

  /* WELCOME */
  if (screen==='welcome') return (
    <div style={S.app}>
      <div style={{ textAlign:'center', paddingTop:60 }}>
        <div style={S.logo}>FITAI</div>
        <div style={{ color:C.muted, fontSize:11, letterSpacing:4, marginTop:4 }}>PERSONAL TRAINER INTELIGENTE</div>
      </div>
      <div style={{ ...S.card, textAlign:'center', marginTop:36 }}>
        <div style={{ fontSize:60, marginBottom:12 }}>⚡</div>
        <h2 style={{ margin:'0 0 10px', fontSize:28, fontWeight:900, color:C.text }}>Treino que Evolui<br/>Com Você.</h2>
        <p style={{ color:C.text2, lineHeight:1.7, margin:'0 0 16px', fontSize:14 }}>
          GIFs reais dos exercícios, log de treino, histórico e biblioteca completa — grátis.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, justifyContent:'center', marginBottom:8 }}>
          {['🎬 GIFs Reais','📊 Log de Treino','📈 Histórico','⚖️ IMC','📚 +160 Exercícios'].map(t=>(
            <span key={t} style={{ background:'rgba(249,115,22,0.08)', border:'1px solid rgba(249,115,22,0.2)', borderRadius:20, padding:'4px 12px', fontSize:11, color:C.accent, fontWeight:700 }}>{t}</span>
          ))}
        </div>
        <button style={S.btn()} onClick={()=>setScreen('goals')}>Começar Agora →</button>
      </div>
    </div>
  );

  /* GOALS */
  if (screen==='goals') return (
    <div style={S.app}>
      <div style={{ textAlign:'center', paddingTop:28 }}>
        <div style={S.logo}>FITAI</div>
        <div style={{ color:C.accent, fontSize:11, letterSpacing:3, marginTop:4, fontWeight:700 }}>PASSO 1 DE 2</div>
      </div>
      <div style={S.card}>
        <h2 style={{ margin:'0 0 4px', fontSize:22, fontWeight:900, color:C.text }}>Qual é seu objetivo?</h2>
        <p style={{ color:C.muted, fontSize:13, margin:'0 0 16px' }}>Selecione um ou mais</p>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {GOALS.map(g=>(
            <button key={g.id} style={S.goalCard(goals.includes(g.id))} onClick={()=>setGoals(gs=>gs.includes(g.id)?gs.filter(x=>x!==g.id):[...gs,g.id])}>
              <div style={{ fontSize:34, marginBottom:8 }}>{g.icon}</div>
              <div style={{ fontWeight:900, fontSize:15, color:C.text }}>{g.label}</div>
              <div style={{ color:C.muted, fontSize:11, marginTop:3 }}>{g.desc}</div>
            </button>
          ))}
        </div>
        <button style={{ ...S.btn(), opacity:goals.length?1:0.4 }} disabled={!goals.length} onClick={()=>setScreen('level')}>Próximo →</button>
      </div>
    </div>
  );

  /* LEVEL */
  if (screen==='level') return (
    <div style={S.app}>
      <div style={{ textAlign:'center', paddingTop:28 }}>
        <div style={S.logo}>FITAI</div>
        <div style={{ color:C.accent2, fontSize:11, letterSpacing:3, marginTop:4, fontWeight:700 }}>PASSO 2 DE 2</div>
      </div>
      <div style={S.card}>
        <h2 style={{ margin:'0 0 4px', fontSize:22, fontWeight:900, color:C.text }}>Seu nível atual?</h2>
        <p style={{ color:C.muted, fontSize:13, margin:'0 0 16px' }}>Seja honesto para o melhor plano</p>
        {LEVELS.map(l=>(
          <button key={l.id} style={S.lvlCard(level===l.id)} onClick={()=>setLevel(l.id)}>
            <span style={{ fontSize:30 }}>{l.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:900, fontSize:16, color:C.text }}>{l.label}</div>
              <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{l.desc}</div>
            </div>
            {level===l.id && <span style={{ color:C.accent2, fontSize:20 }}>✓</span>}
          </button>
        ))}
        <button style={{ ...S.btn(`linear-gradient(135deg,#6366f1,#4f46e5)`), opacity:level?1:0.4 }} disabled={!level}
          onClick={()=>{ setPlan(getPlan(goals,level)); setTab('treino'); setScreen('plan'); }}>
          Gerar Meu Plano ✦
        </button>
      </div>
    </div>
  );

  /* PLAN */
  if (screen==='plan'&&progressivePlan) return (
    <div style={{ ...S.app, paddingBottom:90 }}>
      <div style={{ textAlign:'center', paddingTop:20, width:'100%', maxWidth:480 }}>
        <div style={S.logo}>FITAI</div>
        {profile?.name && <div style={{ color:C.muted, fontSize:12, letterSpacing:1, marginTop:3 }}>Olá, <strong style={{ color:C.text }}>{profile.name}</strong>! 💪</div>}
      </div>

      {/* Cards de resumo */}
      <div style={{ display:'flex', gap:8, width:'100%', maxWidth:480, marginTop:12 }}>
        {[
          ['📊', historyCount, 'Treinos', C.accent2],
          ['🔥', `S${absoluteWeek}`, 'Semana', weekInfo.color],
          ['⚖️', profile?.weight?`${profile.weight}kg`:'—', 'Peso', C.green],
        ].map(([ic,v,l,cl])=>(
          <div key={l} style={{ flex:1, background:'#fff', border:`1px solid ${C.border}`, borderRadius:14, padding:'12px 6px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize:20 }}>{ic}</div>
            <div style={{ color:cl, fontWeight:900, fontSize:16, marginTop:3 }}>{v}</div>
            <div style={{ color:C.muted, fontSize:9, marginTop:2, letterSpacing:1 }}>{l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Header do plano */}
      <div style={{ ...S.card, background:`linear-gradient(135deg,rgba(249,115,22,0.05),rgba(99,102,241,0.05))`, borderColor:`${C.accent}30` }}>
        <div style={{ fontSize:10, color:C.accent, fontWeight:900, letterSpacing:2, marginBottom:6 }}>
          {LEVELS.find(l=>l.id===level)?.label?.toUpperCase()} · {goals.map(g=>GOALS.find(x=>x.id===g)?.label).join(' + ')}
        </div>
        <h2 style={{ margin:'0 0 8px', fontSize:19, fontWeight:900, color:C.text }}>{progressivePlan.titulo}</h2>
        <p style={{ color:C.text2, fontSize:13, margin:0, lineHeight:1.6 }}>{progressivePlan.resumo}</p>
      </div>

      <WeekBanner absoluteWeek={absoluteWeek} cycleWeek={cycleWeek} weekInfo={weekInfo} onPrev={()=>changeWeek(-1)} onNext={()=>changeWeek(1)} onReset={resetWeek}/>

      {/* Tabs */}
      <div style={{ display:'flex', background:'#fff', border:`1px solid ${C.border}`, borderRadius:12, padding:4, width:'100%', maxWidth:480, marginTop:12, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
        {[['treino','🏋️ Treinos'],['nutri','🥗 Nutrição'],['dicas','💡 Dicas']].map(([id,label])=>(
          <button key={id} style={S.tabBtn(tab===id)} onClick={()=>setTab(id)}>{label}</button>
        ))}
      </div>

      {/* ABA TREINOS */}
      {tab==='treino'&&(
        <div style={{ width:'100%', maxWidth:480 }}>
          {progressivePlan.treinos?.map((t,i)=>(
            <div key={i} style={S.card}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div>
                  <div style={{ fontWeight:900, fontSize:18, color:C.text }}>{t.dia}</div>
                  <div style={{ display:'flex', gap:6, marginTop:5, flexWrap:'wrap' }}>
                    <span style={S.tag(C.accent)}>{t.foco}</span>
                    <span style={S.tag('#64748b')}>{t.local}</span>
                    <span style={S.tag(weekInfo.color)}>{weekInfo.icon} {weekInfo.label}</span>
                  </div>
                </div>
                <button style={{ background:`linear-gradient(135deg,#16a34a,#22c55e)`, border:'none', borderRadius:12, padding:'10px 16px', fontSize:12, fontWeight:900, color:'#fff', cursor:'pointer', boxShadow:'0 4px 12px rgba(34,197,94,0.3)', letterSpacing:1 }}
                  onClick={()=>{ setActiveWorkout(t); setScreen('workout'); }}>▶ INICIAR</button>
              </div>
              {t.exercicios?.map((ex,j)=>(
                <div key={j} style={{ padding:'10px 0', borderBottom:j<t.exercicios.length-1?`1px solid ${C.border}`:'none' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:900, fontSize:14, color:C.text }}>{ex.nome}</div>
                      <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{ex.series}x{ex.repeticoes} · {ex.descanso}</div>
                      {ex.weekNote&&<div style={{ color:weekInfo.color, fontSize:11, marginTop:3, fontWeight:700 }}>↑ {ex.weekNote}</div>}
                      <Muscles list={ex.musculos}/>
                    </div>
                    <span style={{ ...S.tag(C.accent2), marginLeft:8, whiteSpace:'nowrap' }}>{ex.series}x</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ABA NUTRIÇÃO */}
      {tab==='nutri'&&progressivePlan.alimentacao&&(
        <div style={{ width:'100%', maxWidth:480 }}>
          <div style={S.card}>
            <h3 style={{ margin:'0 0 14px', fontSize:17, fontWeight:900, color:C.text }}>📊 MACROS DIÁRIOS</h3>
            <div style={{ display:'flex', gap:8 }}>
              {[['🔥','Kcal',progressivePlan.alimentacao.calorias,'#f59e0b'],['💪','Prot',progressivePlan.alimentacao.proteina,'#22d3ee'],['⚡','Carbo',progressivePlan.alimentacao.carboidrato,'#a78bfa'],['🫒','Gord',progressivePlan.alimentacao.gordura,'#f472b6']].map(([ic,lb,vl,cl])=>(
                <div key={lb} style={S.macroBox(cl)}>
                  <div style={{ fontSize:20 }}>{ic}</div>
                  <div style={{ color:cl, fontWeight:900, fontSize:12, marginTop:4 }}>{vl}</div>
                  <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>{lb}</div>
                </div>
              ))}
            </div>
          </div>
          {progressivePlan.alimentacao.refeicoes?.map((r,i)=>(
            <div key={i} style={{ ...S.card, display:'flex', gap:12, alignItems:'flex-start' }}>
              <div style={{ background:`${C.accent}15`, border:`1px solid ${C.accent}30`, borderRadius:10, padding:'6px 10px', fontSize:12, fontWeight:900, color:C.accent, whiteSpace:'nowrap', minWidth:52, textAlign:'center' }}>{r.horario}</div>
              <div>
                <div style={{ fontWeight:900, fontSize:14, color:C.text }}>{r.nome}</div>
                <div style={{ color:C.text2, fontSize:12, marginTop:4, lineHeight:1.5 }}>{r.exemplo}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ABA DICAS */}
      {tab==='dicas'&&(
        <div style={{ width:'100%', maxWidth:480 }}>
          {progressivePlan.dicas?.map((d,i)=>(
            <div key={i} style={{ ...S.card, display:'flex', gap:12, alignItems:'flex-start' }}>
              <span style={{ fontSize:22 }}>{'⚡🎯💡🔑'[i]||'⚡'}</span>
              <p style={{ margin:0, fontSize:14, lineHeight:1.7, color:C.text2 }}>{d}</p>
            </div>
          ))}
        </div>
      )}

      <button style={{ ...S.btn('rgba(0,0,0,0.06)','#64748b'), boxShadow:'none', maxWidth:480, border:`1px solid ${C.border}`, marginTop:8 }}
        onClick={()=>{ setGoals([]); setLevel(null); setPlan(null); setScreen('goals'); }}>
        ↩ Trocar Objetivo
      </button>

      <BottomNav screen={screen} onNavigate={navigate} hasPlan={!!plan}/>
    </div>
  );

  return <div style={S.app}><p style={{ color:C.muted, marginTop:80 }}>Carregando...</p></div>;
}
