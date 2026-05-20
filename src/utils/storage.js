/* eslint-disable */
/*
  FitAI — Storage Utils
  Centraliza todo o acesso ao localStorage
*/

const KEYS = {
  PROFILE:  'fitai_profile',
  LOGS:     'fitai_logs',
  HISTORY:  'fitai_history',
  WEEK:     'fitai_week',
};

/* ── Perfil do usuário ──────────────────────────────────────────── */
export function saveProfile(profile) {
  try { localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile)); } catch {}
}
export function loadProfile() {
  try {
    const s = localStorage.getItem(KEYS.PROFILE);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

/* ── Log de treino (séries/reps/peso por exercício) ─────────────── */
// Estrutura: { [workoutKey]: { [exercicioNome]: [ {serie, reps, peso, done} ] } }
// workoutKey = "2025-W22-Segunda-Peito"

export function saveWorkoutLog(workoutKey, logs) {
  try {
    const all = loadAllLogs();
    all[workoutKey] = logs;
    localStorage.setItem(KEYS.LOGS, JSON.stringify(all));
  } catch {}
}

export function loadWorkoutLog(workoutKey) {
  try {
    const all = loadAllLogs();
    return all[workoutKey] || {};
  } catch { return {}; }
}

export function loadAllLogs() {
  try {
    const s = localStorage.getItem(KEYS.LOGS);
    return s ? JSON.parse(s) : {};
  } catch { return {}; }
}

/* ── Histórico de treinos concluídos ────────────────────────────── */
// Array de { date, dia, foco, duration, exercises, totalSeries, totalReps }
export function saveWorkoutHistory(entry) {
  try {
    const history = loadHistory();
    history.unshift(entry); // mais recente primeiro
    // mantém últimos 90 treinos
    const trimmed = history.slice(0, 90);
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(trimmed));
  } catch {}
}

export function loadHistory() {
  try {
    const s = localStorage.getItem(KEYS.HISTORY);
    return s ? JSON.parse(s) : [];
  } catch { return []; }
}

/* ── Helpers ────────────────────────────────────────────────────── */
export function makeWorkoutKey(week, dia, foco) {
  return `W${week}-${dia}-${foco}`.replace(/\s+/g, '_');
}

export function clearAllData() {
  try {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
  } catch {}
}
