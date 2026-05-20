/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { loadHistory } from '../utils/storage';

const C = { bg:'#f0f4f8', card:'#ffffff', border:'#e2e8f0', accent:'#f97316', accent2:'#6366f1', green:'#22c55e', muted:'#94a3b8', text:'#1e293b', text2:'#475569' };

function BarChart({ data, color, label }) {
  if (!data.length) return null;
  const max = Math.max(...data.map(d=>d.value),1);
  const W=280, H=80, BW=Math.min(24,(W/data.length)-4);
  return (
    <div>
      <div style={{ color:C.muted, fontSize:11, letterSpacing:1, marginBottom:6, textTransform:'uppercase', fontWeight:700 }}>{label}</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H+20}`} style={{ overflow:'visible' }}>
        {data.map((d,i)=>{
          const x=(i/data.length)*W+BW/2, barH=(d.value/max)*H, y=H-barH;
          return (
            <g key={i}>
              <rect x={x-BW/2} y={y} width={BW} height={barH} fill={color} opacity={0.7} rx={3}/>
              <text x={x} y={H+14} textAnchor="middle" fill={C.muted} fontSize="8">{d.label}</text>
              {i===data.length-1&&<text x={x} y={y-4} textAnchor="middle" fill={color} fontSize="9" fontWeight="bold">{d.value}</text>}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function calcStreak(history) {
  if (!history.length) return 0;
  const dates=[...new Set(history.map(h=>h.date?.split('T')[0]))].sort().reverse();
  let streak=0, prev=null;
  for (const d of dates) {
    if (!prev) { streak=1; prev=d; continue; }
    if ((new Date(prev)-new Date(d))/86400000<=1) { streak++; prev=d; } else break;
  }
  return streak;
}

function HistoryCard({ entry }) {
  const [open, setOpen] = useState(false);
  const date = entry.date?new Date(entry.date):null;
  const dateStr = date?date.toLocaleDateString('pt-BR',{weekday:'short',day:'2-digit',month:'short'}):'';
  const dur = entry.duration?`${Math.floor(entry.duration/60)}min`:'';
  return (
    <div onClick={()=>setOpen(o=>!o)} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:16, padding:'14px', marginBottom:10, cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontWeight:900, fontSize:15, color:C.text }}>{entry.foco||entry.dia}</div>
          <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{dateStr}{dur&&` · ${dur}`}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ color:C.green, fontWeight:900, fontSize:13 }}>✓ Concluído</div>
          {entry.totalSeries&&<div style={{ color:C.muted, fontSize:11, marginTop:2 }}>{entry.totalSeries} séries</div>}
        </div>
      </div>
      {open&&entry.exercises?.length>0&&(
        <div style={{ marginTop:12, paddingTop:12, borderTop:'1px solid #f1f5f9' }}>
          {entry.exercises.map((ex,i)=>(
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:i<entry.exercises.length-1?'1px solid #f8fafc':'none' }}>
              <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{ex.nome}</span>
              <span style={{ color:C.muted, fontSize:12 }}>{ex.series?.filter(s=>s.done).length||0} séries{ex.maxPeso?` · ${ex.maxPeso}kg`:''}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HistoryScreen({ onClose }) {
  const history = loadHistory();
  const streak  = calcStreak(history);
  const weeklyData = useMemo(()=>{
    const weeks={};
    history.forEach(h=>{ if(!h.date) return; const d=new Date(h.date), w=`${d.getFullYear()}-W${Math.ceil((d.getDate()+new Date(d.getFullYear(),d.getMonth(),1).getDay())/7)}`; weeks[w]=(weeks[w]||0)+(h.totalSeries||0); });
    return Object.entries(weeks).slice(-8).map(([k,v])=>({label:k.split('-W')[1]?`S${k.split('-W')[1]}`:'',value:v}));
  },[history]);
  const weekdayData = useMemo(()=>{
    const days={'Dom':0,'Seg':0,'Ter':0,'Qua':0,'Qui':0,'Sex':0,'Sáb':0};
    const labels=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    history.forEach(h=>{ if(!h.date) return; days[labels[new Date(h.date).getDay()]]++; });
    return labels.map(l=>({label:l,value:days[l]}));
  },[history]);
  const totalTreinos=history.length, totalSeries=history.reduce((a,h)=>a+(h.totalSeries||0),0), totalMinutos=history.reduce((a,h)=>a+(h.duration?Math.floor(h.duration/60):0),0);

  return (
    <div style={{ minHeight:'100vh', background:C.bg, fontFamily:"'Barlow Condensed','Oswald','Impact',sans-serif", paddingBottom:80 }}>
      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:10 }}>
        <button onClick={onClose} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 14px', color:C.text2, cursor:'pointer', fontSize:13, fontWeight:700 }}>← Voltar</button>
        <div style={{ flex:1, textAlign:'center', fontSize:20, fontWeight:900, letterSpacing:4, background:'linear-gradient(135deg,#f97316,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>HISTÓRICO</div>
        <div style={{ width:70 }}/>
      </div>
      <div style={{ padding:'14px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginBottom:14 }}>
          {[['🔥',streak,'Streak',C.accent],['🏋️',totalTreinos,'Treinos',C.accent2],['⚡',totalSeries,'Séries','#a855f7'],[' ⏱',totalMinutos,'Minutos',C.green]].map(([ic,val,lbl,cl])=>(
            <div key={lbl} style={{ background:'#fff', border:`1px solid ${cl}25`, borderRadius:14, padding:'12px 6px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize:20 }}>{ic}</div>
              <div style={{ color:cl, fontWeight:900, fontSize:20, marginTop:4 }}>{val}</div>
              <div style={{ color:C.muted, fontSize:9, letterSpacing:1, marginTop:2 }}>{lbl.toUpperCase()}</div>
            </div>
          ))}
        </div>
        {history.length===0?(
          <div style={{ textAlign:'center', padding:'60px 20px', color:C.muted }}>
            <div style={{ fontSize:56, marginBottom:16 }}>📊</div>
            <h3 style={{ margin:'0 0 8px', fontSize:20, fontWeight:900, color:C.text }}>Nenhum treino ainda</h3>
            <p style={{ color:C.muted, fontSize:13 }}>Complete seu primeiro treino para ver o histórico!</p>
          </div>
        ):(
          <>
            {weeklyData.length>1&&<div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:20, padding:'18px', marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}><BarChart data={weeklyData} color={C.accent} label="Séries por Semana"/></div>}
            <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:20, padding:'18px', marginBottom:14, boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}><BarChart data={weekdayData} color={C.accent2} label="Treinos por Dia da Semana"/></div>
            <div style={{ fontSize:13, color:C.muted, letterSpacing:1, marginBottom:10, textTransform:'uppercase', fontWeight:700 }}>Últimos Treinos</div>
            {history.map((entry,i)=><HistoryCard key={i} entry={entry}/>)}
          </>
        )}
      </div>
    </div>
  );
}
