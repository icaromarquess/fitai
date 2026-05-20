import React, { useState, useMemo } from 'react';
import { loadHistory } from '../utils/storage';

const C = {
  bg:'#060a12', card:'rgba(10,16,30,0.95)', border:'rgba(255,255,255,0.07)',
  accent:'#f59e0b', accent2:'#3b82f6', green:'#22c55e',
  muted:'#475569', text:'#f1f5f9',
};

/* ── Mini gráfico de barras SVG ──────────────────────────────────── */
function BarChart({ data, color, label }) {
  if (!data.length) return null;
  const max = Math.max(...data.map(d => d.value), 1);
  const W = 280, H = 80, BAR_W = Math.min(24, (W / data.length) - 4);

  return (
    <div>
      <div style={{ color:C.muted, fontSize:11, letterSpacing:1, marginBottom:6, textTransform:'uppercase' }}>{label}</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ overflow:'visible' }}>
        {data.map((d, i) => {
          const x = (i / data.length) * W + BAR_W / 2;
          const barH = (d.value / max) * H;
          const y = H - barH;
          return (
            <g key={i}>
              <rect x={x - BAR_W/2} y={y} width={BAR_W} height={barH}
                fill={color} opacity={0.7} rx={3}/>
              <text x={x} y={H + 14} textAnchor="middle" fill={C.muted} fontSize="8">{d.label}</text>
              {i === data.length - 1 && (
                <text x={x} y={y - 4} textAnchor="middle" fill={color} fontSize="9" fontWeight="bold">{d.value}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── Streak (dias consecutivos) ──────────────────────────────────── */
function calcStreak(history) {
  if (!history.length) return 0;
  const dates = [...new Set(history.map(h => h.date?.split('T')[0]))].sort().reverse();
  let streak = 0;
  let prev = null;
  for (const d of dates) {
    if (!prev) { streak = 1; prev = d; continue; }
    const diff = (new Date(prev) - new Date(d)) / 86400000;
    if (diff <= 1) { streak++; prev = d; }
    else break;
  }
  return streak;
}

/* ── Card de treino concluído ────────────────────────────────────── */
function HistoryCard({ entry }) {
  const [open, setOpen] = useState(false);
  const date = entry.date ? new Date(entry.date) : null;
  const dateStr = date ? date.toLocaleDateString('pt-BR', { weekday:'short', day:'2-digit', month:'short' }) : '';
  const dur = entry.duration ? `${Math.floor(entry.duration/60)}min` : '';

  return (
    <div style={styles.hCard} onClick={() => setOpen(o => !o)}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontWeight:900, fontSize:15 }}>{entry.foco || entry.dia}</div>
          <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>{dateStr} {dur && `· ${dur}`}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ color:C.green, fontWeight:900, fontSize:13 }}>✓ Concluído</div>
          {entry.totalSeries && <div style={{ color:C.muted, fontSize:11, marginTop:2 }}>{entry.totalSeries} séries</div>}
        </div>
      </div>
      {open && entry.exercises?.length > 0 && (
        <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
          {entry.exercises.map((ex, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom: i < entry.exercises.length-1 ? `1px solid rgba(255,255,255,0.04)` : 'none' }}>
              <span style={{ fontSize:13, fontWeight:700 }}>{ex.nome}</span>
              <span style={{ color:C.muted, fontSize:12 }}>
                {ex.series?.filter(s => s.done).length || 0} séries
                {ex.maxPeso ? ` · ${ex.maxPeso}kg` : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Tela principal do histórico ─────────────────────────────────── */
export default function HistoryScreen({ onClose }) {
  const history = loadHistory();
  const streak = calcStreak(history);

  // Últimas 8 semanas de volume
  const weeklyData = useMemo(() => {
    const weeks = {};
    history.forEach(h => {
      if (!h.date) return;
      const d = new Date(h.date);
      const week = `${d.getFullYear()}-W${Math.ceil((d.getDate() + new Date(d.getFullYear(), d.getMonth(), 1).getDay()) / 7)}`;
      weeks[week] = (weeks[week] || 0) + (h.totalSeries || 0);
    });
    return Object.entries(weeks).slice(-8).map(([k, v]) => ({ label: k.split('-W')[1] ? `S${k.split('-W')[1]}` : '', value: v }));
  }, [history]);

  // Treinos por dia da semana
  const weekdayData = useMemo(() => {
    const days = { 'Dom':0,'Seg':0,'Ter':0,'Qua':0,'Qui':0,'Sex':0,'Sáb':0 };
    const labels = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    history.forEach(h => {
      if (!h.date) return;
      const d = new Date(h.date);
      days[labels[d.getDay()]]++;
    });
    return labels.map(l => ({ label:l, value:days[l] }));
  }, [history]);

  const totalTreinos = history.length;
  const totalSeries  = history.reduce((a,h) => a + (h.totalSeries||0), 0);
  const totalMinutos = history.reduce((a,h) => a + (h.duration ? Math.floor(h.duration/60) : 0), 0);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={onClose} style={styles.backBtn}>← Voltar</button>
        <div style={{ textAlign:'center', flex:1 }}>
          <div style={styles.logo}>HISTÓRICO</div>
          <div style={{ color:C.muted, fontSize:11, letterSpacing:2 }}>SEUS TREINOS</div>
        </div>
        <div style={{ width:70 }}/>
      </div>

      <div style={styles.content}>

        {/* Stats resumo */}
        <div style={styles.statsRow}>
          {[
            ['🔥', streak,        'Streak (dias)', C.accent],
            ['🏋️', totalTreinos,  'Treinos',       C.accent2],
            ['⚡', totalSeries,   'Séries',        '#a855f7'],
            ['⏱', totalMinutos,  'Minutos',       C.green],
          ].map(([ic,val,lbl,cl]) => (
            <div key={lbl} style={{ ...styles.statCard, borderColor:`${cl}33` }}>
              <div style={{ fontSize:20 }}>{ic}</div>
              <div style={{ color:cl, fontWeight:900, fontSize:20, marginTop:4 }}>{val}</div>
              <div style={{ color:C.muted, fontSize:9, letterSpacing:1, marginTop:2 }}>{lbl.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {history.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize:56, marginBottom:16 }}>📊</div>
            <h3 style={{ margin:'0 0 8px', fontSize:20, fontWeight:900 }}>Nenhum treino ainda</h3>
            <p style={{ color:C.muted, fontSize:13, lineHeight:1.6 }}>
              Complete seu primeiro treino para ver o histórico e gráficos aqui!
            </p>
          </div>
        ) : (
          <>
            {/* Gráficos */}
            {weeklyData.length > 1 && (
              <div style={styles.card}>
                <BarChart data={weeklyData} color={C.accent} label="Séries por Semana" />
              </div>
            )}
            <div style={styles.card}>
              <BarChart data={weekdayData} color={C.accent2} label="Treinos por Dia da Semana" />
            </div>

            {/* Lista de treinos */}
            <div style={{ fontSize:13, color:C.muted, letterSpacing:1, marginBottom:10, textTransform:'uppercase', fontWeight:700 }}>
              Últimos Treinos
            </div>
            {history.map((entry, i) => (
              <HistoryCard key={i} entry={entry} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page:{ minHeight:'100vh', background:`radial-gradient(ellipse 100% 50% at 50% -10%, #0d1f3c, ${C.bg} 60%)`, color:C.text, fontFamily:"'Barlow Condensed','Oswald','Impact',sans-serif", paddingBottom:80 },
  header:{ display:'flex', alignItems:'center', padding:'20px 16px 10px', gap:10 },
  backBtn:{ background:'rgba(255,255,255,0.06)', border:`1px solid ${C.border}`, borderRadius:10, padding:'8px 14px', color:C.muted, cursor:'pointer', fontSize:13, fontWeight:700, whiteSpace:'nowrap' },
  logo:{ fontSize:22, fontWeight:900, letterSpacing:6, color:C.accent, textShadow:`0 0 30px ${C.accent}55` },
  content:{ padding:'0 14px' },
  statsRow:{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginBottom:14 },
  statCard:{ background:C.card, border:'1px solid', borderRadius:14, padding:'12px 6px', textAlign:'center' },
  card:{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'18px 16px', marginBottom:14 },
  hCard:{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:'14px', marginBottom:10, cursor:'pointer' },
  empty:{ textAlign:'center', padding:'60px 20px', color:C.muted },
};
