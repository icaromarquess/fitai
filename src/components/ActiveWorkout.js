/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import ExerciseVideo from './ExerciseVideo';
import { saveWorkoutLog, loadWorkoutLog, saveWorkoutHistory, makeWorkoutKey } from '../utils/storage';

const C = {
  bg:'#f0f4f8', card:'#ffffff', border:'#e2e8f0',
  accent:'#f97316', accent2:'#6366f1', green:'#22c55e', red:'#ef4444',
  muted:'#94a3b8', text:'#1e293b', text2:'#475569',
};

const MC = {
  Peito:'#ef4444',Costas:'#3b82f6',Ombros:'#a855f7',Bíceps:'#f59e0b',
  Tríceps:'#10b981',Pernas:'#f97316',Glúteo:'#ec4899',Core:'#06b6d4','Full Body':'#8b5cf6',
};

function Muscles({ list }) {
  return (
    <div style={{ marginTop:4 }}>
      {(list||[]).map(m=>(
        <span key={m} style={{ background:`${MC[m]||'#64748b'}15`, border:`1px solid ${MC[m]||'#64748b'}40`, color:MC[m]||'#64748b', borderRadius:6, padding:'2px 8px', fontSize:10, fontWeight:700, display:'inline-block', marginRight:4, marginTop:4 }}>{m}</span>
      ))}
    </div>
  );
}

function RestTimer({ seconds, total, onSkip }) {
  const pct = ((total - seconds) / total) * 100;
  return (
    <div style={{ background:'#eff6ff', border:'1px solid #bfdbfe', borderRadius:14, padding:'12px 14px', marginBottom:12 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
        <span style={{ color:'#3b82f6', fontWeight:900, fontSize:15 }}>😮‍💨 DESCANSANDO</span>
        <span style={{ color:C.accent, fontWeight:900, fontSize:24, letterSpacing:2 }}>{seconds}s</span>
        <button onClick={onSkip} style={{ background:'#dbeafe', border:'1px solid #93c5fd', borderRadius:8, padding:'5px 12px', color:'#3b82f6', cursor:'pointer', fontSize:11, fontWeight:700 }}>PULAR →</button>
      </div>
      <div style={{ height:6, background:'#dbeafe', borderRadius:4, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#3b82f6,#6366f1)', transition:'width 1s linear', borderRadius:4 }}/>
      </div>
    </div>
  );
}

function SerieRow({ serie, index, onUpdate, onToggle, lastSerie }) {
  return (
    <div style={{ display:'flex', alignItems:'center', padding:'10px 14px', borderBottom:'1px solid #f1f5f9', gap:8, background:serie.done?'#f0fdf4':'#fff', transition:'background 0.2s' }}>
      <div style={{ width:24, color:serie.done?C.green:C.muted, fontSize:13, fontWeight:900, textAlign:'center' }}>{index+1}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:9, color:C.muted, letterSpacing:1, marginBottom:3 }}>REPS</div>
        <input type="number" min="0" max="999" value={serie.reps} onChange={e=>onUpdate('reps',e.target.value)}
          style={{ width:'100%', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:8, padding:'8px 10px', color:C.text, fontSize:18, fontWeight:900, outline:'none', fontFamily:'inherit', textAlign:'center' }}
          placeholder={lastSerie?.reps||'0'}/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:9, color:C.muted, letterSpacing:1, marginBottom:3 }}>PESO kg</div>
        <input type="number" min="0" max="999" step="0.5" value={serie.peso} onChange={e=>onUpdate('peso',e.target.value)}
          style={{ width:'100%', background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:8, padding:'8px 10px', color:C.text, fontSize:18, fontWeight:900, outline:'none', fontFamily:'inherit', textAlign:'center' }}
          placeholder={lastSerie?.peso||'0'}/>
      </div>
      <button onClick={onToggle} style={{ width:42, height:42, borderRadius:10, border:`2px solid ${serie.done?C.green:'#e2e8f0'}`, background:serie.done?'#dcfce7':'#f8fafc', color:serie.done?C.green:'#94a3b8', cursor:'pointer', fontSize:20, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.2s' }}>
        {serie.done?'✓':'○'}
      </button>
    </div>
  );
}

export default function ActiveWorkout({ workout, absoluteWeek, weekInfo, onFinish, onStop }) {
  const [exIdx, setExIdx]     = useState(0);
  const [timer, setTimer]     = useState(0);
  const [running, setRunning] = useState(true);
  const [rest, setRest]       = useState(null);
  const [restTotal, setRestTotal] = useState(60);
  const [logs, setLogs]       = useState({});
  const [showVideo, setShowVideo] = useState(true);
  const timerRef  = useRef(null);
  const startTime = useRef(Date.now());
  const workoutKey = makeWorkoutKey(absoluteWeek, workout.dia, workout.foco);

  useEffect(() => {
    const saved = loadWorkoutLog(workoutKey);
    const init = {};
    workout.exercicios.forEach(ex => {
      const savedSeries = saved[ex.nome]?.series || [];
      init[ex.nome] = { series: Array.from({ length: ex.series }, (_,i) => savedSeries[i] || { reps:'', peso:'', done:false }) };
    });
    setLogs(init);
  }, []);

  useEffect(() => {
    if (running) timerRef.current = setInterval(() => setTimer(t=>t+1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    if (rest===null) return;
    if (rest<=0) { setRest(null); return; }
    const t = setTimeout(() => setRest(r=>r-1), 1000);
    return () => clearTimeout(t);
  }, [rest]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const ex = workout.exercicios[exIdx];
  const total = workout.exercicios.length;
  const exLogs = logs[ex?.nome] || { series:[] };
  const lastEx = exIdx > 0 ? logs[workout.exercicios[exIdx-1]?.nome] : null;

  const updateSerie = (exNome, idx, field, val) => {
    setLogs(prev => {
      const updated = { ...prev, [exNome]: { ...prev[exNome], series: prev[exNome].series.map((s,i) => i===idx ? {...s,[field]:val} : s) } };
      saveWorkoutLog(workoutKey, updated);
      return updated;
    });
  };

  const toggleSerie = (exNome, idx) => {
    setLogs(prev => {
      const wasDone = prev[exNome].series[idx].done;
      const updated = { ...prev, [exNome]: { ...prev[exNome], series: prev[exNome].series.map((s,i) => i===idx ? {...s,done:!s.done} : s) } };
      saveWorkoutLog(workoutKey, updated);
      if (!wasDone) { const d = parseInt(ex.descanso)||60; setRestTotal(d); setRest(d); }
      return updated;
    });
  };

  const handleFinish = () => {
    setRunning(false);
    const duration = Math.floor((Date.now() - startTime.current) / 1000);
    const totalSeries = Object.values(logs).reduce((acc,ex) => acc + ex.series.filter(s=>s.done).length, 0);
    const exercises = workout.exercicios.map(ex => ({ nome:ex.nome, series:logs[ex.nome]?.series||[], maxPeso:Math.max(...(logs[ex.nome]?.series?.map(s=>parseFloat(s.peso)||0)||[0]))||null }));
    saveWorkoutHistory({ date:new Date().toISOString(), dia:workout.dia, foco:workout.foco, local:workout.local, duration, totalSeries, exercises });
    onFinish();
  };

  return (
    <div style={{ minHeight:'100vh', background:C.bg, color:C.text, fontFamily:"'Barlow Condensed','Oswald','Impact',sans-serif", paddingBottom:20 }}>
      {/* Header */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'14px 16px 10px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:18, fontWeight:900, letterSpacing:5, background:'linear-gradient(135deg,#f97316,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>FITAI</div>
          <div style={{ color:C.muted, fontSize:11, letterSpacing:1 }}>{workout.dia} · {workout.foco} · <span style={{ color:weekInfo.color, fontWeight:700 }}>{weekInfo.icon} {weekInfo.label}</span></div>
        </div>
        {/* Progress */}
        <div style={{ height:5, background:'#f1f5f9', borderRadius:4, marginTop:10, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${((exIdx+1)/total)*100}%`, background:'linear-gradient(90deg,#6366f1,#f97316)', transition:'width 0.5s', borderRadius:4 }}/>
        </div>
      </div>

      <div style={{ padding:'12px 14px' }}>
        {/* Timer + contador + toggle vídeo */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <span style={{ background:`${C.accent2}15`, border:`1px solid ${C.accent2}40`, color:C.accent2, borderRadius:8, padding:'4px 12px', fontSize:12, fontWeight:900 }}>{exIdx+1} / {total}</span>
          <span style={{ color:C.accent, fontWeight:900, fontSize:24, letterSpacing:3 }}>⏱ {fmt(timer)}</span>
          <button onClick={()=>setShowVideo(v=>!v)} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:'5px 10px', color:C.text2, cursor:'pointer', fontSize:11, fontWeight:700 }}>
            {showVideo?'Ocultar':'Vídeo'}
          </button>
        </div>

        {/* GIF do exercício */}
        {showVideo && (
          <div style={{ background:'#f8fafc', borderRadius:18, overflow:'hidden', border:'1px solid #e2e8f0', marginBottom:14, boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
            <ExerciseVideo name={ex.nome}/>
          </div>
        )}

        {/* Nome e músculos */}
        <h2 style={{ margin:'0 0 4px', fontSize:26, fontWeight:900, letterSpacing:1, color:C.text }}>{ex.nome}</h2>
        <Muscles list={ex.musculos||[]}/>
        {ex.weekNote&&(
          <div style={{ background:`${weekInfo.color}10`, border:`1px solid ${weekInfo.color}30`, borderRadius:10, padding:'7px 12px', marginTop:8 }}>
            <span style={{ color:weekInfo.color, fontWeight:700, fontSize:12 }}>{weekInfo.icon} {ex.weekNote}</span>
          </div>
        )}
        <p style={{ color:C.text2, fontSize:13, margin:'8px 0 14px', lineHeight:1.5, fontStyle:'italic' }}>{ex.dica}</p>

        {/* Descanso */}
        {rest!==null&&rest>0&&<RestTimer seconds={rest} total={restTotal} onSkip={()=>setRest(0)}/>}

        {/* Tabela de séries */}
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, overflow:'hidden', marginBottom:14, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ display:'flex', padding:'10px 14px', background:'#f8fafc', borderBottom:'1px solid #f1f5f9' }}>
            <div style={{ width:24, color:C.muted, fontSize:11, fontWeight:700 }}>#</div>
            <div style={{ flex:1, color:C.muted, fontSize:11, fontWeight:700, letterSpacing:1, marginLeft:8 }}>REPS</div>
            <div style={{ flex:1, color:C.muted, fontSize:11, fontWeight:700, letterSpacing:1 }}>PESO kg</div>
            <div style={{ width:44, color:C.muted, fontSize:11, fontWeight:700, textAlign:'center' }}>OK</div>
          </div>
          {exLogs.series.map((serie,i)=>(
            <SerieRow key={i} serie={serie} index={i} lastSerie={lastEx?.series?.[i]}
              onUpdate={(field,val)=>updateSerie(ex.nome,i,field,val)}
              onToggle={()=>toggleSerie(ex.nome,i)}/>
          ))}
        </div>

        {/* Botões de navegação */}
        <div style={{ display:'flex', gap:8, marginBottom:12 }}>
          {exIdx>0&&(
            <button onClick={()=>{ setExIdx(i=>i-1); setRest(null); }}
              style={{ flex:1, background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:12, padding:13, color:C.text2, cursor:'pointer', fontSize:13, fontWeight:700 }}>← Anterior</button>
          )}
          {exIdx<total-1?(
            <button onClick={()=>{ setExIdx(i=>i+1); setRest(null); }}
              style={{ flex:2, background:'linear-gradient(135deg,#16a34a,#22c55e)', border:'none', borderRadius:12, padding:13, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:900, letterSpacing:1, boxShadow:'0 4px 14px rgba(34,197,94,0.3)' }}>Próximo →</button>
          ):(
            <button onClick={handleFinish}
              style={{ flex:2, background:'linear-gradient(135deg,#f97316,#ea580c)', border:'none', borderRadius:12, padding:13, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:900, letterSpacing:1, boxShadow:'0 4px 14px rgba(249,115,22,0.3)' }}>🏁 Finalizar Treino!</button>
          )}
        </div>

        {/* Mini mapa */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(70px,1fr))', gap:6, marginBottom:10 }}>
          {workout.exercicios.map((e,i)=>{
            const done = logs[e.nome]?.series?.every(s=>s.done);
            const partial = logs[e.nome]?.series?.some(s=>s.done);
            return (
              <button key={i} onClick={()=>{ setExIdx(i); setRest(null); }}
                style={{ borderRadius:10, padding:'8px 4px', cursor:'pointer', textAlign:'center', background:done?'#f0fdf4':partial?'#fff7ed':'#f8fafc', border:`1.5px solid ${i===exIdx?C.accent:done?C.green:partial?`${C.accent}50`:'#e2e8f0'}`, transition:'all 0.2s' }}>
                <div style={{ fontSize:10, fontWeight:900, color:i===exIdx?C.accent:done?C.green:C.text2 }}>{i+1}</div>
                <div style={{ fontSize:8, marginTop:1, lineHeight:1.2, color:C.muted }}>{e.nome.split(' ').slice(0,2).join(' ')}</div>
                {done&&<div style={{ fontSize:10, color:C.green }}>✓</div>}
              </button>
            );
          })}
        </div>

        <button onClick={onStop}
          style={{ width:'100%', background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:12, color:C.muted, cursor:'pointer', fontSize:13, fontWeight:700 }}>
          ✕ Parar Treino
        </button>
      </div>
    </div>
  );
}
