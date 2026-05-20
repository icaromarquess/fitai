import React, { useState, useMemo } from 'react';
import { EXERCISES, MUSCLE_GROUPS, EQUIPMENT_TYPES } from '../data/exercises';

const GIPHY_KEY = 'dc6zaTOxFJmzC';

const C = {
  bg: '#060a12', card: 'rgba(10,16,30,0.95)', border: 'rgba(255,255,255,0.07)',
  accent: '#f59e0b', accent2: '#3b82f6', green: '#22c55e',
  muted: '#475569', text: '#f1f5f9',
};

const MC_COLORS = {
  peito:'#ef4444', costas:'#3b82f6', ombros:'#a855f7', biceps:'#f59e0b',
  triceps:'#10b981', pernas:'#f97316', gluteo:'#ec4899', core:'#06b6d4', cardio:'#8b5cf6',
};

const NIVEL_COLORS = {
  iniciante: '#22c55e', intermediario: '#f59e0b', avancado: '#ef4444',
};
const NIVEL_LABELS = {
  iniciante: 'Iniciante', intermediario: 'Intermediário', avancado: 'Avançado',
};

/* ── GIF do Giphy ────────────────────────────────────────────────── */
const gifCache = {};

function ExerciseGif({ exercise, visible }) {
  const [gifUrl, setGifUrl] = useState(null);
  const [status, setStatus] = useState('idle');

  React.useEffect(() => {
    if (!visible || status !== 'idle') return;
    setStatus('loading');

    if (gifCache[exercise.id]) {
      setGifUrl(gifCache[exercise.id]);
      setStatus('ok');
      return;
    }

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(exercise.search)}&limit=3&rating=g`)
      .then(r => r.json())
      .then(data => {
        const gifs = data?.data || [];
        if (!gifs.length) { setStatus('fallback'); return; }
        const url = gifs[0]?.images?.fixed_height?.url || gifs[0]?.images?.original?.url;
        if (url) { gifCache[exercise.id] = url; setGifUrl(url); setStatus('ok'); }
        else setStatus('fallback');
      })
      .catch(() => setStatus('fallback'));
  }, [visible, exercise, status]);

  const color = MC_COLORS[exercise.musculo] || '#64748b';

  if (!visible) return (
    <div style={{ ...styles.gifBox, background: `${color}10` }}>
      <span style={{ fontSize: 36 }}>💪</span>
    </div>
  );

  if (status === 'loading' || status === 'idle') return (
    <div style={{ ...styles.gifBox, background: '#0a0f1e' }}>
      <style>{`@keyframes ld{0%,100%{opacity:.3}50%{opacity:.9}}.ld{animation:ld 1s ease-in-out infinite}`}</style>
      <span className="ld" style={{ fontSize: 28 }}>⚡</span>
    </div>
  );

  if (status === 'ok' && gifUrl) return (
    <div style={styles.gifBox}>
      <img src={gifUrl} alt={exercise.nome} style={styles.gifImg} />
    </div>
  );

  return (
    <div style={{ ...styles.gifBox, background: `${color}10` }}>
      <span style={{ fontSize: 36 }}>{color === MC_COLORS.cardio ? '⚡' : '🏋️'}</span>
    </div>
  );
}

/* ── Card de exercício ───────────────────────────────────────────── */
function ExerciseCard({ exercise, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const color = MC_COLORS[exercise.musculo] || '#64748b';
  const nivelColor = NIVEL_COLORS[exercise.nivel] || '#64748b';

  return (
    <div
      style={{ ...styles.card, borderColor: expanded ? `${color}44` : C.border }}
      onClick={() => setExpanded(e => !e)}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {/* GIF / Ícone */}
        <ExerciseGif exercise={exercise} visible={expanded} />

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: 0.5, lineHeight: 1.3 }}>{exercise.nome}</div>
          <div style={{ display: 'flex', gap: 5, marginTop: 5, flexWrap: 'wrap' }}>
            <span style={{ ...styles.pill, background: `${color}18`, border: `1px solid ${color}44`, color }}>
              {MUSCLE_GROUPS.find(m => m.id === exercise.musculo)?.icon} {MUSCLE_GROUPS.find(m => m.id === exercise.musculo)?.label}
            </span>
            <span style={{ ...styles.pill, background: `${nivelColor}18`, border: `1px solid ${nivelColor}44`, color: nivelColor }}>
              {NIVEL_LABELS[exercise.nivel]}
            </span>
          </div>
          {exercise.secundarios?.length > 0 && (
            <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>
              Também: {exercise.secundarios.join(', ')}
            </div>
          )}
        </div>

        {/* Seta */}
        <div style={{ color: C.muted, fontSize: 18, transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</div>
      </div>

      {/* Detalhes expandidos */}
      {expanded && (
        <div style={styles.expanded}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ ...styles.pill, background: 'rgba(255,255,255,0.05)', color: C.muted }}>
              🔧 {EQUIPMENT_TYPES.find(e => e.id === exercise.equipamento)?.label || exercise.equipamento}
            </span>
          </div>
          <p style={styles.instrucao}>{exercise.instrucao}</p>
        </div>
      )}
    </div>
  );
}

/* ── Biblioteca Principal ────────────────────────────────────────── */
export default function ExerciseLibrary({ onClose }) {
  const [search, setSearch] = useState('');
  const [muscleFilter, setMuscleFilter] = useState('all');
  const [equipFilter, setEquipFilter] = useState('all');
  const [nivelFilter, setNivelFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return EXERCISES.filter(ex => {
      if (muscleFilter !== 'all' && ex.musculo !== muscleFilter) return false;
      if (equipFilter !== 'all' && ex.equipamento !== equipFilter) return false;
      if (nivelFilter !== 'all' && ex.nivel !== nivelFilter) return false;
      if (q && !ex.nome.toLowerCase().includes(q) && !ex.musculo.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, muscleFilter, equipFilter, nivelFilter]);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={onClose} style={styles.backBtn}>← Voltar</button>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <div style={styles.logo}>EXERCÍCIOS</div>
          <div style={{ color: C.muted, fontSize: 11, letterSpacing: 2 }}>{filtered.length} EXERCÍCIOS</div>
        </div>
        <div style={{ width: 70 }} />
      </div>

      {/* Busca */}
      <div style={styles.searchWrap}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          style={styles.searchInput}
          placeholder="Buscar exercício..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoComplete="off"
        />
        {search && (
          <button onClick={() => setSearch('')} style={styles.clearBtn}>✕</button>
        )}
      </div>

      {/* Filtros por músculo */}
      <div style={styles.filterRow}>
        {MUSCLE_GROUPS.map(m => (
          <button
            key={m.id}
            style={{ ...styles.filterChip, ...(muscleFilter === m.id ? styles.filterChipActive(MC_COLORS[m.id] || C.accent) : {}) }}
            onClick={() => setMuscleFilter(m.id)}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Filtros secundários */}
      <div style={styles.filterRow2}>
        <div style={{ display: 'flex', gap: 6 }}>
          {EQUIPMENT_TYPES.slice(0, 4).map(e => (
            <button
              key={e.id}
              style={{ ...styles.filterChip2, ...(equipFilter === e.id ? styles.filterChip2Active : {}) }}
              onClick={() => setEquipFilter(e.id)}
            >
              {e.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          {EQUIPMENT_TYPES.slice(4).map(e => (
            <button
              key={e.id}
              style={{ ...styles.filterChip2, ...(equipFilter === e.id ? styles.filterChip2Active : {}) }}
              onClick={() => setEquipFilter(e.id)}
            >
              {e.label}
            </button>
          ))}
          {['all','iniciante','intermediario','avancado'].map(n => (
            <button
              key={n}
              style={{
                ...styles.filterChip2,
                ...(nivelFilter === n ? { background: `${NIVEL_COLORS[n] || C.accent}22`, border: `1px solid ${NIVEL_COLORS[n] || C.accent}66`, color: NIVEL_COLORS[n] || C.accent } : {}),
              }}
              onClick={() => setNivelFilter(n)}
            >
              {n === 'all' ? 'Nível' : NIVEL_LABELS[n]}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div style={styles.list}>
        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ color: C.muted }}>Nenhum exercício encontrado</p>
          </div>
        ) : (
          filtered.map(ex => <ExerciseCard key={ex.id} exercise={ex} />)
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: `radial-gradient(ellipse 100% 50% at 50% -10%, #0d1f3c, ${C.bg} 60%)`,
    color: C.text,
    fontFamily: "'Barlow Condensed','Oswald','Impact',sans-serif",
    paddingBottom: 60,
  },
  header: {
    display: 'flex', alignItems: 'center',
    padding: '20px 16px 10px',
    gap: 10,
  },
  backBtn: {
    background: 'rgba(255,255,255,0.06)', border: `1px solid ${C.border}`,
    borderRadius: 10, padding: '8px 14px', color: C.muted,
    cursor: 'pointer', fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
  },
  logo: {
    fontSize: 22, fontWeight: 900, letterSpacing: 6, color: C.accent,
    textShadow: `0 0 30px ${C.accent}55`,
  },
  searchWrap: {
    display: 'flex', alignItems: 'center', gap: 10,
    margin: '8px 14px',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${C.border}`,
    borderRadius: 14, padding: '10px 14px',
  },
  searchIcon: { fontSize: 16, flexShrink: 0 },
  searchInput: {
    flex: 1, background: 'none', border: 'none', outline: 'none',
    color: C.text, fontSize: 16, fontFamily: 'inherit',
  },
  clearBtn: {
    background: 'none', border: 'none', color: C.muted,
    cursor: 'pointer', fontSize: 14, padding: '0 4px',
  },
  filterRow: {
    display: 'flex', gap: 6, padding: '8px 14px',
    overflowX: 'auto', scrollbarWidth: 'none',
    WebkitOverflowScrolling: 'touch',
  },
  filterRow2: {
    padding: '4px 14px 8px',
  },
  filterChip: {
    background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`,
    borderRadius: 20, padding: '6px 12px', fontSize: 11, fontWeight: 700,
    color: C.muted, cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  filterChipActive: (c) => ({
    background: `${c}18`, border: `1px solid ${c}55`, color: c,
  }),
  filterChip2: {
    background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`,
    borderRadius: 10, padding: '5px 10px', fontSize: 11, fontWeight: 700,
    color: C.muted, cursor: 'pointer', whiteSpace: 'nowrap',
  },
  filterChip2Active: {
    background: `${C.accent}18`, border: `1px solid ${C.accent}55`, color: C.accent,
  },
  list: { padding: '4px 14px' },
  card: {
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 16, padding: '14px', marginBottom: 10,
    cursor: 'pointer', transition: 'border-color 0.2s',
  },
  gifBox: {
    width: 72, height: 72, borderRadius: 12, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden', background: 'rgba(255,255,255,0.04)',
  },
  gifImg: { width: '100%', height: '100%', objectFit: 'cover' },
  pill: {
    borderRadius: 8, padding: '2px 8px', fontSize: 11,
    fontWeight: 700, display: 'inline-block',
  },
  expanded: {
    marginTop: 12, paddingTop: 12,
    borderTop: `1px solid ${C.border}`,
  },
  instrucao: {
    color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0,
  },
  empty: {
    textAlign: 'center', padding: '60px 20px',
    color: C.muted,
  },
};
