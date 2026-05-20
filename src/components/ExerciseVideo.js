/* eslint-disable */
import React, { useState, useEffect } from 'react';

const RAPIDAPI_KEY = '2e282bd514msh609be45dca8954ap192401jsnea624ccf9666';

/*
  Mapeamento exercício → nome em inglês para busca no ExerciseDB
*/
const EXERCISE_SEARCH = {
  "Supino Reto":             "barbell bench press",
  "Supino Reto com Barra":   "barbell bench press",
  "Supino Inclinado":        "incline barbell bench press",
  "Supino Inclinado com Barra": "incline barbell bench press",
  "Supino Declinado":        "decline barbell bench press",
  "Supino com Halteres":     "dumbbell bench press",
  "Crucifixo":               "dumbbell fly",
  "Crucifixo Inclinado":     "incline dumbbell fly",
  "Crossover no Cabo":       "cable crossover",
  "Flexão de Braço":         "push-up",
  "Flexão":                  "push-up",
  "Flexão Inclinada":        "incline push up",
  "Flexão Declinada":        "decline push up",
  "Flexão Diamante":         "diamond push up",
  "Peck Deck (Borboleta)":   "pec deck fly",
  "Puxada Alta Pegada Aberta": "lat pulldown",
  "Puxada Alta Pegada Fechada": "close grip lat pulldown",
  "Puxada Alta":             "lat pulldown",
  "Remada Curvada com Barra": "barbell bent over row",
  "Remada Curvada":          "barbell bent over row",
  "Remada Unilateral":       "dumbbell row",
  "Remada Baixa no Cabo":    "seated cable row",
  "Levantamento Terra":      "barbell deadlift",
  "Stiff":                   "romanian deadlift",
  "Stiff com Barra":         "romanian deadlift",
  "Stiff / Terra Romeno":    "romanian deadlift",
  "Barra Fixa":              "pull-up",
  "Pullover com Halter":     "dumbbell pullover",
  "Hiperextensão Lombar":    "back extension",
  "Desenvolvimento com Barra": "barbell overhead press",
  "Desenvolvimento com Halteres": "dumbbell shoulder press",
  "Desenvolvimento":         "dumbbell shoulder press",
  "Elevação Lateral":        "dumbbell lateral raise",
  "Elevação Frontal":        "dumbbell front raise",
  "Encolhimento de Ombros":  "dumbbell shrug",
  "Arnold Press":            "arnold press",
  "Face Pull no Cabo":       "cable face pull",
  "Rosca Direta com Barra":  "barbell curl",
  "Rosca Direta":            "barbell curl",
  "Rosca Alternada":         "dumbbell alternate bicep curl",
  "Rosca Martelo":           "hammer curl",
  "Rosca Concentrada":       "concentration curl",
  "Rosca Scott (Banco)":     "preacher curl",
  "Tríceps Polia com Corda": "cable triceps pushdown",
  "Tríceps Polia com Barra": "cable triceps pushdown",
  "Tríceps Polia":           "cable triceps pushdown",
  "Tríceps Testa":           "ez barbell skullcrusher",
  "Tríceps Francês":         "dumbbell tricep extension",
  "Mergulho (Dips)":         "triceps dip",
  "Tríceps no Banco":        "bench dip",
  "Tríceps Coice":           "dumbbell tricep kickback",
  "Agachamento Livre":       "squat",
  "Agachamento":             "squat",
  "Agachamento com Barra":   "barbell squat",
  "Agachamento Hack":        "hack squat",
  "Leg Press 45°":           "leg press",
  "Leg Press":               "leg press",
  "Agachamento Sumô":        "sumo squat",
  "Afundo (Lunge)":          "lunge",
  "Afundo":                  "lunge",
  "Afundo Búlgaro":         "bulgarian split squat",
  "Extensora":               "leg extension",
  "Mesa Flexora":            "leg curl",
  "Panturrilha em Pé":       "standing calf raise",
  "Panturrilha Sentado":     "seated calf raise",
  "Hip Thrust com Barra":    "barbell hip thrust",
  "Hip Thrust":              "barbell hip thrust",
  "Elevação de Quadril":     "glute bridge",
  "Coice no Cabo":           "cable glute kickback",
  "Step Up":                 "step-up",
  "Abdominal Crunch":        "crunch",
  "Abdominal":               "crunch",
  "Abdominal Bicicleta":     "bicycle crunch",
  "Prancha":                 "plank",
  "Prancha Lateral":         "side plank",
  "Mountain Climber":        "mountain climber",
  "Elevação de Pernas":      "leg raise",
  "Russian Twist":           "russian twist",
  "Ab Wheel (Roda Abdominal)": "ab wheel rollout",
  "Burpee":                  "burpee",
  "Jumping Jack":            "jumping jack",
  "Agachamento com Salto":   "jump squat",
  "Corrida no Lugar":        "high knees",
  "Box Jump":                "box jump",
};

const gifCache = {};

export default function ExerciseVideo({ name }) {
  const [gifUrl, setGifUrl] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    setGifUrl(null);

    const searchTerm = EXERCISE_SEARCH[name];
    if (!searchTerm) { setStatus('fallback'); return; }
    if (gifCache[name]) { setGifUrl(gifCache[name]); setStatus('ok'); return; }

    const url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(searchTerm)}?limit=1&offset=0`;

    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
    })
      .then(r => r.json())
      .then(data => {
        const gif = data?.[0]?.gifUrl;
        if (gif) {
          gifCache[name] = gif;
          setGifUrl(gif);
          setStatus('ok');
        } else {
          setStatus('fallback');
        }
      })
      .catch(() => setStatus('fallback'));
  }, [name]);

  if (status === 'fallback') return <Fallback name={name} />;

  return (
    <div style={styles.wrap}>
      {status === 'loading' && <Shimmer />}
      {gifUrl && (
        <img
          src={gifUrl}
          alt={name}
          style={{ ...styles.gif, opacity: status === 'ok' ? 1 : 0 }}
          onLoad={() => setStatus('ok')}
          onError={() => setStatus('fallback')}
        />
      )}
      {status === 'ok' && (
        <div style={styles.badge}>
          <span style={styles.dot} /> {name.toUpperCase()}
        </div>
      )}
    </div>
  );
}

function Shimmer() {
  return (
    <div style={styles.shimmer}>
      <style>{`@keyframes sh{0%,100%{opacity:.3}50%{opacity:.9}}.sh{animation:sh 1.2s ease-in-out infinite;font-size:40px}`}</style>
      <div className="sh">💪</div>
      <p style={{ color:'#94a3b8', fontSize:12, letterSpacing:2, fontFamily:'monospace', margin:'10px 0 0' }}>Carregando animação...</p>
    </div>
  );
}

function Fallback({ name }) {
  const emojis = {
    "Supino Reto":"🏋️","Agachamento com Barra":"🦵","Puxada Alta":"💪",
    "Remada Curvada":"💪","Rosca Direta":"💪","Desenvolvimento":"🏋️",
    "Hip Thrust":"🍑","Burpee":"⚡","Jumping Jack":"⚡",
    "Mountain Climber":"🔥","Flexão":"💪","Abdominal":"🔥","Prancha":"🔥",
  };
  const emoji = emojis[name] || '🏋️';
  return (
    <div style={styles.fallback}>
      <style>{`@keyframes pop{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}.pop{animation:pop 1.2s ease-in-out infinite}`}</style>
      <span className="pop" style={{ fontSize:64 }}>{emoji}</span>
      <p style={{ color:'#64748b', fontSize:11, margin:'10px 0 0', letterSpacing:2, fontFamily:'monospace', textTransform:'uppercase' }}>{name}</p>
    </div>
  );
}

const styles = {
  wrap: { width:'100%', position:'relative', borderRadius:16, overflow:'hidden', background:'#f1f5f9', minHeight:240, display:'flex', alignItems:'center', justifyContent:'center' },
  gif: { width:'100%', maxHeight:300, objectFit:'contain', display:'block', background:'#f1f5f9', transition:'opacity 0.4s' },
  shimmer: { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#f1f5f9', gap:10 },
  badge: { position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.6)', borderRadius:20, padding:'4px 10px', fontSize:9, fontWeight:700, letterSpacing:2, color:'#f59e0b', display:'flex', alignItems:'center', gap:5 },
  dot: { width:6, height:6, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e', display:'inline-block' },
  fallback: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 0', width:'100%', minHeight:240, background:'#f1f5f9', borderRadius:16 },
};
