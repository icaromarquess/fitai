import React, { useState, useEffect } from 'react';

const GIPHY_KEY = 'dc6zaTOxFJmzC';

const SEARCH_TERMS = {
  "Supino Reto":           "bench press barbell chest exercise",
  "Supino Reto com Barra": "bench press barbell chest exercise",
  "Supino Inclinado":      "incline bench press chest",
  "Supino Inclinado com Barra": "incline bench press chest",
  "Agachamento com Barra": "barbell squat exercise",
  "Agachamento":           "squat exercise fitness",
  "Leg Press":             "leg press machine gym",
  "Afundo":                "lunge exercise workout",
  "Stiff":                 "romanian deadlift hamstring",
  "Hip Thrust":            "hip thrust glute exercise",
  "Puxada Alta":           "lat pulldown exercise back",
  "Remada Curvada":        "bent over row exercise back",
  "Rosca Direta":          "bicep curl exercise",
  "Rosca Alternada":       "alternating dumbbell curl",
  "Rosca Martelo":         "hammer curl exercise",
  "Desenvolvimento":       "shoulder press exercise",
  "Tríceps Polia":         "triceps pushdown cable",
  "Tríceps Corda":         "triceps rope pushdown",
  "Burpee":                "burpee exercise workout",
  "Jumping Jack":          "jumping jacks exercise",
  "Mountain Climber":      "mountain climber exercise core",
  "Flexão":                "push up exercise chest",
  "Abdominal":             "crunch ab exercise",
  "Prancha":               "plank exercise core",
};

const gifCache = {};

export default function ExerciseVideo({ name }) {
  const [gifUrl, setGifUrl] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    setGifUrl(null);
    const term = SEARCH_TERMS[name];
    if (!term) { setStatus('fallback'); return; }
    if (gifCache[name]) { setGifUrl(gifCache[name]); setStatus('ok'); return; }

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(term)}&limit=5&rating=g`)
      .then(r => r.json())
      .then(data => {
        const gifs = data?.data || [];
        if (!gifs.length) { setStatus('fallback'); return; }
        const idx = Math.floor(Math.random() * Math.min(gifs.length, 5));
        const url = gifs[idx]?.images?.original?.url || gifs[0]?.images?.original?.url;
        if (url) { gifCache[name] = url; setGifUrl(url); setStatus('ok'); }
        else setStatus('fallback');
      })
      .catch(() => setStatus('fallback'));
  }, [name]);

  if (status === 'fallback') return <Fallback name={name} />;

  return (
    <div style={styles.wrap}>
      {status === 'loading' && <Shimmer />}
      {gifUrl && (
        <img src={gifUrl} alt={name} style={{ ...styles.gif, opacity: status === 'ok' ? 1 : 0 }}
          onLoad={() => setStatus('ok')} onError={() => setStatus('fallback')} />
      )}
      {status === 'ok' && <div style={styles.badge}><span style={styles.dot}/>{name.toUpperCase()}</div>}
    </div>
  );
}

function Shimmer() {
  return (
    <div style={styles.shimmer}>
      <style>{`@keyframes sh{0%,100%{opacity:.3}50%{opacity:.8}}.sh{animation:sh 1.3s ease-in-out infinite;font-size:36px}`}</style>
      <div className="sh">⚡</div>
      <p style={styles.shimmerTxt}>Carregando animação...</p>
    </div>
  );
}

function Fallback({ name }) {
  const emojis = { "Supino Reto":"🏋️","Agachamento com Barra":"🦵","Puxada Alta":"💪","Remada Curvada":"💪","Rosca Direta":"💪","Desenvolvimento":"🏋️","Hip Thrust":"🍑","Burpee":"⚡","Jumping Jack":"⚡","Mountain Climber":"🔥","Flexão":"💪","Abdominal":"🔥","Prancha":"🔥" };
  const emoji = emojis[name] || '🏋️';
  return (
    <div style={styles.fallback}>
      <style>{`@keyframes pop{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}.pop{animation:pop 1.2s ease-in-out infinite}`}</style>
      <span className="pop" style={{ fontSize:64 }}>{emoji}</span>
      <p style={styles.fallbackLabel}>{name}</p>
    </div>
  );
}

const styles = {
  wrap: { width:'100%', position:'relative', borderRadius:16, overflow:'hidden', background:'#000e1a', minHeight:220, display:'flex', alignItems:'center', justifyContent:'center' },
  gif: { width:'100%', maxHeight:280, objectFit:'contain', display:'block', background:'#000e1a', transition:'opacity 0.4s' },
  shimmer: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#0a0f1e,#0d1829)', gap:10 },
  shimmerTxt: { color:'#475569', fontSize:12, letterSpacing:2, fontFamily:'monospace', margin:0 },
  badge: { position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.75)', borderRadius:20, padding:'4px 10px', fontSize:9, fontWeight:700, letterSpacing:2, color:'#f59e0b', display:'flex', alignItems:'center', gap:5, backdropFilter:'blur(8px)' },
  dot: { width:6, height:6, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e', display:'inline-block' },
  fallback: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px 0', width:'100%', minHeight:220, background:'linear-gradient(135deg,#0a0f1e,#0d1829)', borderRadius:16 },
  fallbackLabel: { color:'#94a3b8', fontSize:12, margin:'10px 0 0', letterSpacing:2, fontFamily:'monospace', textTransform:'uppercase', fontWeight:700 },
};
