/* eslint-disable */
import React, { useState, useEffect } from 'react';

const RAPIDAPI_KEY = '2e282bd514msh609be45dca8954ap192401jsnea624ccf9666';
const GIPHY_KEY    = 'dc6zaTOxFJmzC';

const EXERCISE_MAP = {
  "Supino Reto":             { ex:"barbell bench press",  giphy:"bench press exercise gym" },
  "Supino Reto com Barra":   { ex:"barbell bench press",  giphy:"bench press exercise gym" },
  "Supino Inclinado":        { ex:"incline barbell bench press", giphy:"incline bench press" },
  "Supino Inclinado com Barra": { ex:"incline barbell bench press", giphy:"incline bench press" },
  "Supino com Halteres":     { ex:"dumbbell bench press", giphy:"dumbbell bench press" },
  "Crucifixo":               { ex:"dumbbell fly",         giphy:"chest fly dumbbell" },
  "Flexão de Braço":         { ex:"push-up",              giphy:"push up exercise" },
  "Flexão":                  { ex:"push-up",              giphy:"push up exercise" },
  "Puxada Alta":             { ex:"lat pulldown",         giphy:"lat pulldown exercise" },
  "Puxada Alta Pegada Aberta": { ex:"lat pulldown",       giphy:"lat pulldown exercise" },
  "Remada Curvada":          { ex:"barbell bent over row",giphy:"bent over row exercise" },
  "Remada Curvada com Barra":{ ex:"barbell bent over row",giphy:"bent over row exercise" },
  "Remada Unilateral":       { ex:"dumbbell row",         giphy:"dumbbell row exercise" },
  "Levantamento Terra":      { ex:"barbell deadlift",     giphy:"deadlift exercise" },
  "Stiff":                   { ex:"romanian deadlift",    giphy:"romanian deadlift" },
  "Stiff com Barra":         { ex:"romanian deadlift",    giphy:"romanian deadlift" },
  "Barra Fixa":              { ex:"pull-up",              giphy:"pull up exercise" },
  "Desenvolvimento com Barra": { ex:"barbell overhead press", giphy:"overhead press shoulder" },
  "Desenvolvimento com Halteres": { ex:"dumbbell shoulder press", giphy:"shoulder press dumbbell" },
  "Desenvolvimento":         { ex:"dumbbell shoulder press", giphy:"shoulder press exercise" },
  "Elevação Lateral":        { ex:"dumbbell lateral raise", giphy:"lateral raise dumbbell" },
  "Rosca Direta com Barra":  { ex:"barbell curl",         giphy:"barbell curl bicep" },
  "Rosca Direta":            { ex:"barbell curl",         giphy:"bicep curl exercise" },
  "Rosca Alternada":         { ex:"dumbbell alternate bicep curl", giphy:"dumbbell curl bicep" },
  "Rosca Martelo":           { ex:"hammer curl",          giphy:"hammer curl dumbbell" },
  "Tríceps Polia com Corda": { ex:"cable triceps pushdown", giphy:"triceps pushdown cable" },
  "Tríceps Polia":           { ex:"cable triceps pushdown", giphy:"triceps pushdown exercise" },
  "Tríceps Francês":         { ex:"dumbbell tricep extension", giphy:"tricep extension overhead" },
  "Agachamento":             { ex:"squat",                giphy:"squat exercise fitness" },
  "Agachamento com Barra":   { ex:"barbell squat",        giphy:"barbell squat exercise" },
  "Agachamento Livre":       { ex:"squat",                giphy:"squat exercise" },
  "Leg Press":               { ex:"leg press",            giphy:"leg press machine gym" },
  "Leg Press 45°":           { ex:"leg press",            giphy:"leg press machine gym" },
  "Afundo":                  { ex:"lunge",                giphy:"lunge exercise legs" },
  "Afundo (Lunge)":          { ex:"lunge",                giphy:"lunge exercise legs" },
  "Stiff / Terra Romeno":    { ex:"romanian deadlift",    giphy:"romanian deadlift" },
  "Hip Thrust":              { ex:"barbell hip thrust",   giphy:"hip thrust glute exercise" },
  "Hip Thrust com Barra":    { ex:"barbell hip thrust",   giphy:"hip thrust exercise" },
  "Elevação de Quadril":     { ex:"glute bridge",         giphy:"glute bridge exercise" },
  "Abdominal Crunch":        { ex:"crunch",               giphy:"crunch ab exercise" },
  "Abdominal":               { ex:"crunch",               giphy:"ab crunch exercise" },
  "Abdominal Bicicleta":     { ex:"bicycle crunch",       giphy:"bicycle crunch abs" },
  "Prancha":                 { ex:"plank",                giphy:"plank exercise core" },
  "Prancha Lateral":         { ex:"side plank",           giphy:"side plank exercise" },
  "Mountain Climber":        { ex:"mountain climber",     giphy:"mountain climber exercise" },
  "Elevação de Pernas":      { ex:"leg raise",            giphy:"leg raise exercise abs" },
  "Russian Twist":           { ex:"russian twist",        giphy:"russian twist exercise" },
  "Burpee":                  { ex:"burpee",               giphy:"burpee exercise workout" },
  "Jumping Jack":            { ex:"jumping jack",         giphy:"jumping jacks exercise" },
  "Agachamento com Salto":   { ex:"jump squat",           giphy:"jump squat exercise" },
  "Corrida no Lugar":        { ex:"high knees",           giphy:"high knees running exercise" },
  "Box Jump":                { ex:"box jump",             giphy:"box jump plyometric" },
};

const gifCache = {};

export default function ExerciseVideo({ name }) {
  const [gifUrl, setGifUrl]   = useState(null);
  const [status, setStatus]   = useState('loading');
  const [source, setSource]   = useState('');

  useEffect(() => {
    setStatus('loading');
    setGifUrl(null);

    const map = EXERCISE_MAP[name];
    if (!map) { setStatus('fallback'); return; }

    if (gifCache[name]) {
      setGifUrl(gifCache[name].url);
      setSource(gifCache[name].src);
      setStatus('ok');
      return;
    }

    /* 1º tenta ExerciseDB */
    const exUrl = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(map.ex)}?limit=1&offset=0`;
    fetch(exUrl, {
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
        gifCache[name] = { url: gif, src: 'ExerciseDB' };
        setGifUrl(gif);
        setSource('ExerciseDB');
        setStatus('ok');
      } else {
        tryGiphy(map.giphy);
      }
    })
    .catch(() => tryGiphy(map.giphy));

    function tryGiphy(term) {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(term)}&limit=5&rating=g`)
        .then(r => r.json())
        .then(data => {
          const gifs = data?.data || [];
          const url  = gifs[0]?.images?.original?.url;
          if (url) {
            gifCache[name] = { url, src: 'Giphy' };
            setGifUrl(url);
            setSource('Giphy');
            setStatus('ok');
          } else {
            setStatus('fallback');
          }
        })
        .catch(() => setStatus('fallback'));
    }
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
          <span style={styles.dot} />
          {source === 'ExerciseDB' ? '🎯 ExerciseDB' : '🎬 Giphy'}
        </div>
      )}
    </div>
  );
}

function Shimmer() {
  return (
    <div style={styles.shimmer}>
      <style>{`@keyframes sh{0%,100%{opacity:.3}50%{opacity:.9}}.sh{animation:sh 1.2s ease-in-out infinite;font-size:44px}`}</style>
      <div className="sh">💪</div>
      <p style={{ color:'#94a3b8', fontSize:12, letterSpacing:2, margin:'10px 0 0' }}>Carregando animação...</p>
    </div>
  );
}

function Fallback({ name }) {
  const emojis = {
    "Supino Reto":"🏋️","Agachamento com Barra":"🦵","Puxada Alta":"💪",
    "Remada Curvada":"💪","Rosca Direta":"💪","Hip Thrust":"🍑",
    "Burpee":"⚡","Jumping Jack":"⚡","Mountain Climber":"🔥",
    "Flexão":"💪","Abdominal":"🔥","Prancha":"🔥",
  };
  return (
    <div style={styles.fallback}>
      <style>{`@keyframes pop{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}.pop{animation:pop 1.2s ease-in-out infinite}`}</style>
      <span className="pop" style={{ fontSize:68 }}>{emojis[name]||'🏋️'}</span>
      <p style={{ color:'#94a3b8', fontSize:11, margin:'10px 0 0', letterSpacing:2, textTransform:'uppercase' }}>{name}</p>
    </div>
  );
}

const styles = {
  wrap:     { width:'100%', position:'relative', borderRadius:16, overflow:'hidden', background:'#f1f5f9', minHeight:250, display:'flex', alignItems:'center', justifyContent:'center' },
  gif:      { width:'100%', maxHeight:300, objectFit:'contain', display:'block', background:'#f1f5f9', transition:'opacity 0.4s' },
  shimmer:  { position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#f1f5f9', gap:8 },
  badge:    { position:'absolute', bottom:8, left:8, background:'rgba(0,0,0,0.55)', borderRadius:20, padding:'3px 10px', fontSize:10, fontWeight:700, color:'#fff', display:'flex', alignItems:'center', gap:5, backdropFilter:'blur(4px)' },
  dot:      { width:6, height:6, borderRadius:'50%', background:'#22c55e', display:'inline-block' },
  fallback: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 0', width:'100%', minHeight:250, background:'#f1f5f9', borderRadius:16 },
};
