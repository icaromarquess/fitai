const PROGRAM_START = new Date('2025-01-06');

export function getCurrentWeek() {
  const now = new Date();
  const diffMs = now - PROGRAM_START;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor(diffDays / 7) + 1);
}

export function getCycleWeek(absoluteWeek) {
  return ((absoluteWeek - 1) % 4) + 1;
}

export function getWeekLabel(cycleWeek) {
  const labels = {
    1: { label:'Base',        color:'#3b82f6', icon:'🌱', desc:'Construindo a base' },
    2: { label:'Volume',      color:'#f59e0b', icon:'📈', desc:'+10% de volume' },
    3: { label:'Intensidade', color:'#ef4444', icon:'🔥', desc:'Menos descanso, mais força' },
    4: { label:'Deload',      color:'#22c55e', icon:'💚', desc:'Recuperação ativa' },
  };
  return labels[cycleWeek] || labels[1];
}

export function applyWeeklyProgression(treinos, cycleWeek) {
  return treinos.map(dia => ({
    ...dia,
    exercicios: dia.exercicios.map(ex => {
      const base = parseReps(ex.repeticoes);
      const baseDescanso = parseDescanso(ex.descanso);
      switch (cycleWeek) {
        case 1: return { ...ex, weekNote: null };
        case 2: return { ...ex, series: ex.series + 1, repeticoes: base ? `${base + 2}` : ex.repeticoes, weekNote: '+1 série e +2 reps esta semana 📈' };
        case 3: return { ...ex, series: ex.series + 1, descanso: reducaoDescanso(baseDescanso), weekNote: 'Menos descanso = mais intensidade 🔥' };
        case 4: return { ...ex, series: Math.max(2, Math.floor(ex.series * 0.6)), repeticoes: base ? `${Math.max(6, Math.floor(base * 0.7))}` : ex.repeticoes, descanso: aumentoDescanso(baseDescanso), weekNote: 'Semana de recuperação 💚' };
        default: return ex;
      }
    }),
  }));
}

function parseReps(reps) {
  if (!reps) return null;
  const str = String(reps);
  if (str.includes('cada') || str.includes('s') || str.includes('/')) return null;
  const num = parseInt(str);
  return isNaN(num) ? null : num;
}

function parseDescanso(descanso) {
  if (!descanso) return 60;
  const num = parseInt(String(descanso));
  return isNaN(num) ? 60 : num;
}

function reducaoDescanso(segundos) {
  return `${Math.max(15, Math.floor(segundos * 0.7))}s`;
}

function aumentoDescanso(segundos) {
  return `${Math.floor(segundos * 1.4)}s`;
}

export function daysUntilNextWeek() {
  const day = new Date().getDay();
  return day === 0 ? 1 : 8 - day;
}

export function getStoredWeek() {
  try { const s = localStorage.getItem('fitai_week'); return s ? parseInt(s) : null; } catch { return null; }
}

export function setStoredWeek(week) {
  try { localStorage.setItem('fitai_week', String(week)); } catch {}
}

export function resetStoredWeek() {
  try { localStorage.removeItem('fitai_week'); } catch {}
}
