/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { EXERCISES, MUSCLE_GROUPS, EQUIPMENT_TYPES } from '../data/exercises';

const C = {
  bg:'#f0f4f8', card:'#ffffff', border:'#e2e8f0',
  accent:'#f97316', accent2:'#6366f1', green:'#22c55e',
  muted:'#94a3b8', text:'#1e293b', text2:'#475569',
};

const MC_COLORS = {
  peito:'#ef4444',costas:'#3b82f6',ombros:'#a855f7',biceps:'#f59e0b',
  triceps:'#10b981',pernas:'#f97316',gluteo:'#ec4899',core:'#06b6d4',cardio:'#8b5cf6',
};

const NIVEL_COLORS = { iniciante:'#22c55e', intermediario:'#f59e0b', avancado:'#ef4444' };
const NIVEL_LABELS = { iniciante:'Iniciante', intermediario:'Intermediário', avancado:'Avançado' };

const GIPHY_KEY = 'dc6zaTOxFJmzC';
const gifCache = {};

function ExerciseGif({ exercise, visible }) {
  const [gifUrl, setGifUrl] = useState(null);
  const [status, setStatus] = useState('idle');

  React.useEffect(() => {
    if (!visible || status !== 'idle') return;
    setStatus('loading');
    if (gifCache[exercise.id]) { setGifUrl(gifCache[exercise.id]); setStatus('ok'); return; }
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(exercise.search)}&limit=3&rating=g`)
      .then(r=>r.json())
      .then(data=>{
        const url = data?.data?.[0]?.images?.fixed_height?.url;
        if (url) { gifCache[exercise.id]=url; setGifUrl(url); setStatus('ok'); }
        else setStatus('fallback');
      })
      .catch(()=>setStatus('fallback'));
  }, [visible, exercise, status]);

  const color = MC_COLORS[exercise.musculo] || '#64748b';
  const size = 72;

  if (!visible) return (
    <div style={{ width:size, height:size, borderRadius:12, background:`${color}10`, border:`1px solid ${color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <span style={{ fontSize:28 }}>💪</span>
    </div>
  );
  if (status==='loading'||status==='idle') return (
    <div style={{ width:size, height:size, borderRadius:12, background:'#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <style>{`@keyframes ld{0%,100%{opacity:.3}50%{opacity:.9}}.ld{animation:ld 1s ease-in-out infinite}`}</style>
      <span className="ld" style={{ fontSize:24 }}>⚡</span>
    </div>
  );
  if (status==='ok'&&gifUrl) return (
    <div style={{ width:size, height:size, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
      <img src={gifUrl} alt={exercise.nome} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
    </div>
  );
  return (
    <div style={{ width:size, height:size, borderRadius:12, background:`${color}10`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
      <span style={{ fontSize:28 }}>🏋️</span>
    </div>
  );
}

function ExerciseCard({ exercise }) {
  const [expanded, setExpanded] = useState(false);
  const color = MC_COLORS[exercise.musculo] || '#64748b';
  const nivelColor = NIVEL_COLORS[exercise.nivel] || '#64748b';

  return (
    <div onClick={()=>setExpanded(e=>!e)}
      style={{ background:'#fff', border:`1px solid ${expanded?`${color}40`:'#e2e8f0'}`, borderRadius:16, padding:'14px', marginBottom:10, cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.05)', transition:'all 0.2s' }}>
      <div style={{ display:'flex', gap:12, alignItems:'center' }}>
        <ExerciseGif exercise={exercise} visible={expanded}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:900, fontSize:15, color:C.text, lineHeight:1.3 }}>{exercise.nome}</div>
          <div style={{ display:'flex', gap:5, marginTop:5, flexWrap:'wrap' }}>
            <span style={{ background:`${color}15`, border:`1px solid ${color}35`, color, borderRadius:8, padding:'2px 8px', fontSize:11, fontWeight:700 }}>
              {MUSCLE_GROUPS.find(m=>m.id===exercise.musculo)?.icon} {MUSCLE_GROUPS.find(m=>m.id===exercise.musculo)?.label}
            </span>
            <span style={{ background:`${nivelColor}12`, border:`1px solid ${nivelColor}35`, color:nivelColor, borderRadius:8, padding:'2px 8px', fontSize:11, fontWeight:700 }}>
              {NIVEL_LABELS[exercise.nivel]}
            </span>
          </div>
          {exercise.secundarios?.length>0&&(
            <div style={{ color:C.muted, fontSize:11, marginTop:4 }}>Também: {exercise.secundarios.join(', ')}</div>
          )}
        </div>
        <div style={{ color:C.muted, fontSize:18, transition:'transform 0.2s', transform:expanded?'rotate(180deg)':'none' }}>▾</div>
      </div>
      {expanded&&(
        <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid #f1f5f9' }}>
          <span style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:8, padding:'3px 10px', fontSize:11, fontWeight:700, color:C.text2 }}>
            🔧 {EQUIPMENT_TYPES.find(e=>e.id===exercise.equipamento)?.label||exercise.equipamento}
          </span>
          <p style={{ color:C.text2, fontSize:13, lineHeight:1.6, margin:'10px 0 0' }}>{exercise.instrucao}</p>
        </div>
      )}
    </div>
  );
}

export default function ExerciseLibrary({ onClose }) {
  const [search, setSearch]       = useState('');
  const [muscleFilter, setMuscleFilter] = useState('all');
  const [equipFilter, setEquipFilter]   = useState('all');
  const [nivelFilter, setNivelFilter]   = useState('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return EXERCISES.filter(ex => {
      if (muscleFilter!=='all'&&ex.musculo!==muscleFilter) return false;
      if (equipFilter!=='all'&&ex.equipamento!==equipFilter) return false;
      if (nivelFilter!=='all'&&ex.nivel!==nivelFilter) return false;
      if (q&&!ex.nome.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, muscleFilter, equipFilter, nivelFilter]);

  return (
    <div style={{ minHeight:'100vh', background:C.bg, color:C.text, fontFamily:"'Barlow Condensed','Oswald','Impact',sans-serif", paddingBottom:80 }}>
      {/* Header */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'16px 16px 10px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', position:'sticky', top:0, zIndex:10 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <button onClick={onClose} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 14px', color:C.text2, cursor:'pointer', fontSize:13, fontWeight:700 }}>← Voltar</button>
          <div style={{ flex:1, textAlign:'center' }}>
            <div style={{ fontSize:20, fontWeight:900, letterSpacing:4, background:'linear-gradient(135deg,#f97316,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>EXERCÍCIOS</div>
          </div>
          <div style={{ color:C.muted, fontSize:12, fontWeight:700, minWidth:60, textAlign:'right' }}>{filtered.length} items</div>
        </div>
        {/* Busca */}
        <div style={{ display:'flex', alignItems:'center', gap:10, background:'#f8fafc', border:'1.5px solid #e2e8f0', borderRadius:12, padding:'10px 14px' }}>
          <span style={{ fontSize:16 }}>🔍</span>
          <input style={{ flex:1, background:'none', border:'none', outline:'none', color:C.text, fontSize:15, fontFamily:'inherit' }}
            placeholder="Buscar exercício..." value={search} onChange={e=>setSearch(e.target.value)}/>
          {search&&<button onClick={()=>setSearch('')} style={{ background:'none', border:'none', color:C.muted, cursor:'pointer', fontSize:14 }}>✕</button>}
        </div>
      </div>

      {/* Filtros músculo */}
      <div style={{ display:'flex', gap:6, padding:'10px 14px', overflowX:'auto', scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>
        {MUSCLE_GROUPS.map(m=>(
          <button key={m.id} onClick={()=>setMuscleFilter(m.id)}
            style={{ background:muscleFilter===m.id?`${MC_COLORS[m.id]||C.accent}15`:'#fff', border:`1.5px solid ${muscleFilter===m.id?MC_COLORS[m.id]||C.accent:'#e2e8f0'}`, borderRadius:20, padding:'6px 12px', fontSize:11, fontWeight:700, color:muscleFilter===m.id?MC_COLORS[m.id]||C.accent:C.text2, cursor:'pointer', whiteSpace:'nowrap', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}>
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Filtros equipamento + nível */}
      <div style={{ padding:'0 14px 8px', display:'flex', gap:6, flexWrap:'wrap' }}>
        {EQUIPMENT_TYPES.map(e=>(
          <button key={e.id} onClick={()=>setEquipFilter(e.id)}
            style={{ background:equipFilter===e.id?'rgba(249,115,22,0.1)':'#fff', border:`1px solid ${equipFilter===e.id?C.accent:'#e2e8f0'}`, borderRadius:10, padding:'5px 10px', fontSize:11, fontWeight:700, color:equipFilter===e.id?C.accent:C.text2, cursor:'pointer' }}>
            {e.label}
          </button>
        ))}
        {['all','iniciante','intermediario','avancado'].map(n=>(
          <button key={n} onClick={()=>setNivelFilter(n)}
            style={{ background:nivelFilter===n?`${NIVEL_COLORS[n]||C.accent2}10`:'#fff', border:`1px solid ${nivelFilter===n?NIVEL_COLORS[n]||C.accent2:'#e2e8f0'}`, borderRadius:10, padding:'5px 10px', fontSize:11, fontWeight:700, color:nivelFilter===n?NIVEL_COLORS[n]||C.accent2:C.text2, cursor:'pointer' }}>
            {n==='all'?'Todos os níveis':NIVEL_LABELS[n]}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div style={{ padding:'0 14px' }}>
        {filtered.length===0?(
          <div style={{ textAlign:'center', padding:'60px 20px', color:C.muted }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
            <p>Nenhum exercício encontrado</p>
          </div>
        ):filtered.map(ex=><ExerciseCard key={ex.id} exercise={ex}/>)}
      </div>
    </div>
  );
}
