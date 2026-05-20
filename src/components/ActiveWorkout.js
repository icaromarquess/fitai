import React, { useState, useEffect, useRef } from 'react';
import ExerciseVideo from './ExerciseVideo';
import { saveWorkoutLog, loadWorkoutLog, saveWorkoutHistory, makeWorkoutKey } from '../utils/storage';

const C = {
  bg:'#060a12', card:'rgba(10,16,30,0.95)', border:'rgba(255,255,255,0.07)',
  accent:'#f59e0b', accent2:'#3b82f6', green:'#22c55e', red:'#ef4444',
  muted:'#475569', text:'#f1f5f9',
};

const MC = {
  Peito:'#ef4444',Costas:'#3b82f6',Ombros:'#a855f7',Bíceps:'#f59e0b',
  Tríceps:'#10b981',Pernas:'#f97316',Glúteo:'#ec4899',Core:'#06b6d4','Full Body':'#8b5cf6',
};

function Muscles({ list }) {
  return (
    <div style={{ marginTop:4 }}>
      {(list||[]).map(m=>(
        <span key={m} style={{ background:`${MC[m]||'#64748b'}18`, border:`1px solid ${MC[m]||'#64748b'}44`, color:MC[m]||'#94a3b8', borderRadius:6, padding:'2px 8px', fontSize:10, fontWeight:700, display:'inline-block', marginRight:4, marginTop:4 }}>{m}</span>
      ))}
    </div>
  );
}

/* ── Timer de descanso visual ────────────────────────────────────── */
function RestTimer({ seconds, total, onSkip }) {
  const pct = ((total - seconds) / total) * 100;
  return (
    <div style={styles.restBanner}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ color:C.accent2, fontWeight:900, fontSize:16 }}>😮‍💨 DESCANSO</span>
        <span style={{ color:C.accent, fontWeight:900, fontSize:22, letterSpacing:2 }}>{seconds}s</span>
        <button onClick={onSkip} style={styles.skipBtn}>PULAR →</button>
      </div>
      <div style={{ height:4, background:'rgba(255,255,255,0.08)', borderRadius:4, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${C.accent2},${C.accent})`, transition:'width 1s linear', borderRadius:4 }}/>
      </div>
    </div>
  );
}

/* ── Log de uma série ────────────────────────────────────────────── */
function SerieRow({ serie, index, onUpdate, onToggle, lastSerie }) {
  return (
    <div style={{ ...styles.serieRow, ...(serie.done ? styles.serieDone : {}) }}>
      <div style={styles.serieNum}>{index + 1}</div>

      {/* Reps */}
      <div style={styles.serieField}>
        <div style={styles.serieFieldLabel}>REPS</div>
        <input
          type="number" min="0" max="999"
          value={serie.reps}
          onChange={e => onUpdate('reps', e.target.value)}
          style={styles.serieInput}
          placeholder={lastSerie?.reps || '0'}
        />
      </div>

      {/* Peso */}
      <div style={styles.serieField}>
        <div style={styles.serieFieldLabel}>PESO kg</div>
        <input
          type="number" min="0" max="999" step="0.5"
          value={serie.peso}
          onChange={e => onUpdate('peso', e.target.value)}
          style={styles.serieInput}
          placeholder={lastSerie?.peso || '0'}
        />
      </div>

      {/* Check */}
      <button onClick={onToggle} style={{ ...styles.checkBtn, ...(serie.done ? styles.checkBtnDone : {}) }}>
        {serie.done ? '✓' : '○'}
      </button>
    </div>
  );
}

/* ── Tela de treino ativo ────────────────────────────────────────── */
export default function ActiveWorkout({ workout, absoluteWeek, weekInfo, onFinish, onStop }) {
  const [exIdx, setExIdx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(true);
  const [rest, setRest] = useState(null);
  const [restTotal, setRestTotal] = useState(60);
  const [logs, setLogs] = useState({});
  const [showVideo, setShowVideo] = useState(true);
  const timerRef = useRef(null);
  const startTime = useRef(Date.now());
  const workoutKey = makeWorkoutKey(absoluteWeek, workout.dia, workout.foco);

  // Carrega logs salvos
  useEffect(() => {
    const saved = loadWorkoutLog(workoutKey);
    // Inicializa séries vazias para cada exercício
    const init = {};
    workout.exercicios.forEach(ex => {
      const savedSeries = saved[ex.nome]?.series || [];
      init[ex.nome] = {
        series: Array.from({ length: ex.series }, (_, i) => savedSeries[i] || { reps:'', peso:'', done:false }),
      };
    });
    setLogs(init);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer principal
  useEffect(() => {
    if (running) timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running]);

  // Timer de descanso
  useEffect(() => {
    if (rest === null) return;
    if (rest <= 0) { setRest(null); return; }
    const t = setTimeout(() => setRest(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [rest]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const ex = workout.exercicios[exIdx];
  const total = workout.exercicios.length;

  const updateSerie = (exNome, idx, field, val) => {
    setLogs(prev => {
      const updated = { ...prev };
      updated[exNome] = { ...updated[exNome] };
      updated[exNome].series = updated[exNome].series.map((s, i) => i === idx ? { ...s, [field]: val } : s);
      // Auto-salva
      saveWorkoutLog(workoutKey, updated);
      return updated;
    });
  };

  const toggleSerie = (exNome, idx) => {
    setLogs(prev => {
      const updated = { ...prev };
      updated[exNome] = { ...updated[exNome] };
      const wasDone = updated[exNome].series[idx].done;
      updated[exNome].series = updated[exNome].series.map((s, i) => i === idx ? { ...s, done: !s.done } : s);
      saveWorkoutLog(workoutKey, updated);

      // Inicia descanso ao marcar série como concluída
      if (!wasDone) {
        const descansoSeg = parseInt(ex.descanso) || 60;
        setRestTotal(descansoSeg);
        setRest(descansoSeg);
      }
      return updated;
    });
  };

  const goToExercise = (idx) => {
    setExIdx(idx);
    setRest(null);
  };

  const handleFinish = () => {
    setRunning(false);
    const duration = Math.floor((Date.now() - startTime.current) / 1000);
    const totalSeries = Object.values(logs).reduce((acc, ex) => acc + ex.series.filter(s => s.done).length, 0);
    const exercises = workout.exercicios.map(ex => ({
      nome: ex.nome,
      series: logs[ex.nome]?.series || [],
      maxPeso: Math.max(...(logs[ex.nome]?.series?.map(s => parseFloat(s.peso)||0) || [0])) || null,
    }));
    saveWorkoutHistory({
      date: new Date().toISOString(),
      dia: workout.dia,
      foco: workout.foco,
      local: workout.local,
      duration,
      totalSeries,
      exercises,
    });
    onFinish();
  };

  const allSeriesDone = workout.exercicios.every(ex =>
    logs[ex.nome]?.series?.every(s => s.done)
  );

  const exLogs = logs[ex?.nome] || { series: [] };
  const lastEx = exIdx > 0 ? logs[workout.exercicios[exIdx-1]?.nome] : null;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={{ textAlign:'center', paddingTop:16, paddingBottom:6 }}>
        <div style={{ fontSize:18, fontWeight:900, letterSpacing:6, color:C.accent }}>FITAI</div>
        <div style={{ color:C.muted, fontSize:11, letterSpacing:2 }}>
          {workout.dia} · {workout.foco} · <span style={{ color:weekInfo.color }}>{weekInfo.icon} {weekInfo.label}</span>
        </div>
      </div>

      {/* Progress bar geral */}
      <div style={{ width:'100%', height:3, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${((exIdx+1)/total)*100}%`, background:`linear-gradient(90deg,${C.accent2},${C.accent})`, transition:'width 0.5s' }}/>
      </div>

      <div style={styles.content}>
        {/* Timer + contador */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
          <span style={{ background:`${C.accent2}18`, border:`1px solid ${C.accent2}44`, color:C.accent2, borderRadius:8, padding:'3px 10px', fontSize:11, fontWeight:700 }}>
            {exIdx+1} / {total}
          </span>
          <span style={{ color:C.accent, fontWeight:900, fontSize:22, letterSpacing:3 }}>⏱ {fmt(timer)}</span>
          <button onClick={() => setShowVideo(v => !v)} style={{ background:'rgba(255,255,255,0.06)', border:`1px solid ${C.border}`, borderRadius:8, padding:'4px 10px', color:C.muted, cursor:'pointer', fontSize:11 }}>
            {showVideo ? '🎬 Ocultar' : '🎬 Vídeo'}
          </button>
        </div>

        {/* Vídeo do exercício */}
        {showVideo && (
          <div style={{ background:'rgba(0,0,0,0.3)', borderRadius:16, overflow:'hidden', border:`1px solid ${C.border}`, marginBottom:12 }}>
            <ExerciseVideo name={ex.nome}/>
          </div>
        )}

        {/* Nome e músculos */}
        <h2 style={{ margin:'0 0 4px', fontSize:26, fontWeight:900, letterSpacing:2, textTransform:'uppercase' }}>{ex.nome}</h2>
        <Muscles list={ex.musculos||[]}/>
        {ex.weekNote && (
          <div style={{ background:`${weekInfo.color}15`, border:`1px solid ${weekInfo.color}35`, borderRadius:10, padding:'7px 12px', marginTop:8 }}>
            <span style={{ color:weekInfo.color, fontWeight:700, fontSize:12 }}>{weekInfo.icon} {ex.weekNote}</span>
          </div>
        )}
        <p style={{ color:C.muted, fontSize:13, margin:'8px 0 14px', lineHeight:1.5, fontStyle:'italic' }}>{ex.dica}</p>

        {/* Timer de descanso */}
        {rest !== null && rest > 0 && (
          <RestTimer seconds={rest} total={restTotal} onSkip={() => setRest(0)}/>
        )}

        {/* Log de séries */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden', marginBottom:12 }}>
          {/* Header da tabela */}
          <div style={{ display:'flex', padding:'10px 14px', background:'rgba(255,255,255,0.03)', borderBottom:`1px solid ${C.border}` }}>
            <div style={{ width:32, color:C.muted, fontSize:11, fontWeight:700 }}>#</div>
            <div style={{ flex:1, color:C.muted, fontSize:11, fontWeight:700, letterSpacing:1 }}>REPS</div>
            <div style={{ flex:1, color:C.muted, fontSize:11, fontWeight:700, letterSpacing:1 }}>PESO kg</div>
            <div style={{ width:44, color:C.muted, fontSize:11, fontWeight:700, textAlign:'center' }}>OK</div>
          </div>
          {exLogs.series.map((serie, i) => (
            <SerieRow
              key={i}
              serie={serie}
              index={i}
              lastSerie={lastEx?.series?.[i]}
              onUpdate={(field, val) => updateSerie(ex.nome, i, field, val)}
              onToggle={() => toggleSerie(ex.nome, i)}
            />
          ))}
        </div>

        {/* Navegação entre exercícios */}
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          {exIdx > 0 && (
            <button onClick={() => goToExercise(exIdx-1)} style={{ ...styles.navBtn, flex:1 }}>← Anterior</button>
          )}
          {exIdx < total-1 ? (
            <button onClick={() => goToExercise(exIdx+1)} style={{ ...styles.nextBtn, flex:2 }}>Próximo →</button>
          ) : (
            <button onClick={handleFinish} style={{ ...styles.finishBtn, flex:2 }}>🏁 Finalizar Treino!</button>
          )}
        </div>

        {/* Mini mapa de exercícios */}
        <div style={styles.exMap}>
          {workout.exercicios.map((e, i) => {
            const done = logs[e.nome]?.series?.every(s => s.done);
            const partial = logs[e.nome]?.series?.some(s => s.done);
            return (
              <button key={i} onClick={() => goToExercise(i)} style={{
                ...styles.exMapBtn,
                background: done ? `${C.green}22` : partial ? `${C.accent}15` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${i===exIdx ? C.accent : done ? C.green : partial ? `${C.accent}44` : C.border}`,
                color: i===exIdx ? C.accent : done ? C.green : C.muted,
              }}>
                <div style={{ fontSize:10, fontWeight:700 }}>{i+1}</div>
                <div style={{ fontSize:9, marginTop:1, lineHeight:1.2 }}>{e.nome.split(' ').slice(0,2).join(' ')}</div>
                {done && <div style={{ fontSize:8, color:C.green }}>✓</div>}
              </button>
            );
          })}
        </div>

        {/* Botão parar */}
        <button onClick={onStop} style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:`1px solid ${C.border}`, borderRadius:12, padding:12, color:C.muted, cursor:'pointer', fontSize:13, fontWeight:700, marginTop:4 }}>
          ✕ Parar Treino
        </button>
      </div>
    </div>
  );
}

const styles = {
  page:{ minHeight:'100vh', background:`radial-gradient(ellipse 100% 50% at 50% -10%, #0d1f3c, ${C.bg} 60%)`, color:C.text, fontFamily:"'Barlow Condensed','Oswald','Impact',sans-serif", paddingBottom:20 },
  content:{ padding:'0 14px' },
  serieRow:{ display:'flex', alignItems:'center', padding:'10px 14px', borderBottom:`1px solid rgba(255,255,255,0.04)`, gap:8, transition:'background 0.2s' },
  serieDone:{ background:'rgba(34,197,94,0.06)' },
  serieNum:{ width:24, color:C.muted, fontSize:13, fontWeight:700, textAlign:'center' },
  serieField:{ flex:1 },
  serieFieldLabel:{ fontSize:9, color:C.muted, letterSpacing:1, marginBottom:3 },
  serieInput:{ width:'100%', background:'rgba(255,255,255,0.06)', border:`1px solid ${C.border}`, borderRadius:8, padding:'8px 10px', color:C.text, fontSize:18, fontWeight:900, outline:'none', fontFamily:'inherit', textAlign:'center' },
  checkBtn:{ width:40, height:40, borderRadius:10, border:`2px solid ${C.border}`, background:'transparent', color:C.muted, cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' },
  checkBtnDone:{ background:`${C.green}22`, border:`2px solid ${C.green}`, color:C.green },
  restBanner:{ background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:14, padding:'12px 14px', marginBottom:12 },
  skipBtn:{ background:'rgba(59,130,246,0.2)', border:'1px solid rgba(59,130,246,0.4)', borderRadius:8, padding:'5px 12px', color:C.accent2, cursor:'pointer', fontSize:11, fontWeight:700 },
  navBtn:{ background:'rgba(255,255,255,0.06)', border:`1px solid ${C.border}`, borderRadius:12, padding:13, color:C.muted, cursor:'pointer', fontSize:13, fontWeight:700 },
  nextBtn:{ background:`linear-gradient(135deg,#15803d,#22c55e)`, border:'none', borderRadius:12, padding:13, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:900, letterSpacing:1 },
  finishBtn:{ background:`linear-gradient(135deg,#dc2626,#f97316)`, border:'none', borderRadius:12, padding:13, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:900, letterSpacing:1 },
  exMap:{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(72px,1fr))', gap:6, marginBottom:10 },
  exMapBtn:{ borderRadius:10, padding:'8px 4px', cursor:'pointer', textAlign:'center', transition:'all 0.2s' },
};
