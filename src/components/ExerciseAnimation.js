import React, { useEffect, useRef } from 'react';

/* 
  Mapeamento de exercício → URL pública do LottieFiles
  Todas são animações gratuitas (Creative Commons / Free)
  Fonte: lottiefiles.com/free-animations
*/
const LOTTIE_URLS = {
  // Peito
  "Supino Reto":           "https://assets6.lottiefiles.com/packages/lf20_khrzmx5j.json",
  "Supino Inclinado":      "https://assets6.lottiefiles.com/packages/lf20_khrzmx5j.json",
  // Pernas
  "Agachamento com Barra": "https://assets3.lottiefiles.com/packages/lf20_czxjygnj.json",
  "Agachamento":           "https://assets3.lottiefiles.com/packages/lf20_czxjygnj.json",
  "Leg Press":             "https://assets3.lottiefiles.com/packages/lf20_czxjygnj.json",
  "Afundo":                "https://assets3.lottiefiles.com/packages/lf20_czxjygnj.json",
  "Stiff":                 "https://assets3.lottiefiles.com/packages/lf20_czxjygnj.json",
  "Hip Thrust":            "https://assets3.lottiefiles.com/packages/lf20_czxjygnj.json",
  // Costas
  "Puxada Alta":           "https://assets9.lottiefiles.com/packages/lf20_ncg9ot9g.json",
  "Remada Curvada":        "https://assets9.lottiefiles.com/packages/lf20_ncg9ot9g.json",
  // Bíceps
  "Rosca Direta":          "https://assets9.lottiefiles.com/packages/lf20_ncg9ot9g.json",
  "Rosca Alternada":       "https://assets9.lottiefiles.com/packages/lf20_ncg9ot9g.json",
  // Ombros
  "Desenvolvimento":       "https://assets9.lottiefiles.com/packages/lf20_ncg9ot9g.json",
  // Tríceps
  "Tríceps Polia":         "https://assets9.lottiefiles.com/packages/lf20_ncg9ot9g.json",
  // Cardio / Casa
  "Burpee":                "https://assets10.lottiefiles.com/packages/lf20_ufkvfzcs.json",
  "Jumping Jack":          "https://assets10.lottiefiles.com/packages/lf20_ufkvfzcs.json",
  "Mountain Climber":      "https://assets10.lottiefiles.com/packages/lf20_ufkvfzcs.json",
  "Flexão":                "https://assets4.lottiefiles.com/packages/lf20_uu0x8lqv.json",
  "Abdominal":             "https://assets4.lottiefiles.com/packages/lf20_uu0x8lqv.json",
  "Prancha":               "https://assets4.lottiefiles.com/packages/lf20_uu0x8lqv.json",
};

const FALLBACK_EMOJI = {
  "Supino Reto":"🏋️","Supino Inclinado":"🏋️","Agachamento com Barra":"🦵",
  "Agachamento":"🦵","Leg Press":"🦵","Afundo":"🦵","Stiff":"🏋️","Hip Thrust":"🍑",
  "Puxada Alta":"💪","Remada Curvada":"💪","Rosca Direta":"💪","Rosca Alternada":"💪",
  "Desenvolvimento":"🏋️","Tríceps Polia":"💪",
  "Burpee":"⚡","Jumping Jack":"⚡","Mountain Climber":"🔥",
  "Flexão":"💪","Abdominal":"🔥","Prancha":"🔥",
};

export default function ExerciseAnimation({ name }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const [status, setStatus] = React.useState('loading');
  const url = LOTTIE_URLS[name];

  useEffect(() => {
    if (!url || !containerRef.current) { setStatus('fallback'); return; }
    setStatus('loading');

    const tryLoad = () => {
      if (!window.lottie) { setStatus('fallback'); return; }
      try {
        if (animRef.current) animRef.current.destroy();
        animRef.current = window.lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: url,
        });
        animRef.current.addEventListener('data_ready', () => setStatus('ok'));
        animRef.current.addEventListener('data_failed', () => setStatus('fallback'));
      } catch {
        setStatus('fallback');
      }
    };

    const timeout = setTimeout(() => setStatus(s => s === 'loading' ? 'fallback' : s), 6000);

    tryLoad();
    return () => {
      clearTimeout(timeout);
      if (animRef.current) animRef.current.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, url]);

  if (status === 'fallback' || !url) {
    return (
      <div style={styles.fallbackWrap}>
        <div style={styles.fallbackEmoji}>{FALLBACK_EMOJI[name] || '🏋️'}</div>
        <p style={styles.fallbackLabel}>{name}</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {status === 'loading' && (
        <div style={styles.shimmer}>
          <div style={styles.shimmerGlow} />
          <p style={styles.shimmerText}>Carregando...</p>
        </div>
      )}
      <div
        ref={containerRef}
        style={{ ...styles.lottieContainer, display: status === 'ok' ? 'block' : 'none' }}
      />
    </div>
  );
}

const styles = {
  wrapper: { width: '100%', minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  lottieContainer: { width: '100%', maxHeight: 260 },
  shimmer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
  shimmerGlow: {
    width: 160, height: 160, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  shimmerText: { color: '#475569', fontSize: 12, letterSpacing: 2, fontFamily: 'monospace' },
  fallbackWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0' },
  fallbackEmoji: { fontSize: 64, animation: 'pulse 1.3s ease-in-out infinite' },
  fallbackLabel: { color: '#475569', fontSize: 11, letterSpacing: 2, marginTop: 12, fontFamily: 'monospace', textTransform: 'uppercase' },
};
