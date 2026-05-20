import React, { useState, useEffect } from 'react';
import { saveProfile, loadProfile } from '../utils/storage';

const C = {
  bg:'#060a12', card:'rgba(10,16,30,0.95)', border:'rgba(255,255,255,0.07)',
  accent:'#f59e0b', accent2:'#3b82f6', green:'#22c55e', red:'#ef4444',
  muted:'#475569', text:'#f1f5f9',
};

function calcBMI(weight, height) {
  if (!weight || !height) return null;
  const h = height / 100;
  return (weight / (h * h)).toFixed(1);
}

function getBMIInfo(bmi) {
  if (!bmi) return null;
  const v = parseFloat(bmi);
  if (v < 18.5) return { label:'Abaixo do Peso', color:'#60a5fa', icon:'⬇️', tip:'Considere aumentar a ingestão calórica com alimentos nutritivos.' };
  if (v < 25)   return { label:'Peso Normal',    color:'#22c55e', icon:'✅', tip:'Parabéns! Mantenha hábitos saudáveis e treinos consistentes.' };
  if (v < 30)   return { label:'Sobrepeso',      color:'#f59e0b', icon:'⚠️', tip:'Foco em déficit calórico moderado e treinos de cardio.' };
  if (v < 35)   return { label:'Obesidade I',    color:'#f97316', icon:'🔶', tip:'Consulte um médico e nutricionista para acompanhamento.' };
  return         { label:'Obesidade II+',        color:'#ef4444', icon:'🔴', tip:'Acompanhamento médico é essencial. Inicie com exercícios leves.' };
}

function calcTMB(weight, height, age, gender) {
  if (!weight || !height || !age) return null;
  if (gender === 'M') return Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age));
  return Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age));
}

function calcTDEE(tmb, activity) {
  const multipliers = { sedentario:1.2, leve:1.375, moderado:1.55, ativo:1.725, muitoativo:1.9 };
  return tmb ? Math.round(tmb * (multipliers[activity] || 1.55)) : null;
}

const ACTIVITY_LABELS = {
  sedentario:  'Sedentário (sem exercício)',
  leve:        'Leve (1–2x/semana)',
  moderado:    'Moderado (3–4x/semana)',
  ativo:       'Ativo (5–6x/semana)',
  muitoativo:  'Muito Ativo (atleta)',
};

export default function ProfileScreen({ onClose }) {
  const [profile, setProfile] = useState({
    name:'', age:'', weight:'', height:'', gender:'M', activity:'moderado', goal:'lose_weight',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    if (p) setProfile(p);
  }, []);

  const update = (key, val) => setProfile(p => ({ ...p, [key]: val }));

  const handleSave = () => {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const bmi    = calcBMI(profile.weight, profile.height);
  const bmiInfo= getBMIInfo(bmi);
  const tmb    = calcTMB(profile.weight, profile.height, profile.age, profile.gender);
  const tdee   = calcTDEE(tmb, profile.activity);

  const goalCalories = {
    lose_weight: tdee ? tdee - 400 : null,
    gain_muscle: tdee ? tdee + 300 : null,
    maintain:    tdee,
  };
  const targetCal = goalCalories[profile.goal];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={onClose} style={styles.backBtn}>← Voltar</button>
        <div style={{ textAlign:'center', flex:1 }}>
          <div style={styles.logo}>PERFIL</div>
          <div style={{ color:C.muted, fontSize:11, letterSpacing:2 }}>& CALCULADORA</div>
        </div>
        <div style={{ width:70 }}/>
      </div>

      <div style={styles.content}>

        {/* Avatar / Nome */}
        <div style={styles.avatarCard}>
          <div style={styles.avatar}>{profile.name ? profile.name[0].toUpperCase() : '👤'}</div>
          <input
            style={styles.nameInput}
            placeholder="Seu nome"
            value={profile.name}
            onChange={e => update('name', e.target.value)}
          />
          {profile.name && <div style={{ color:C.muted, fontSize:12, marginTop:2 }}>Bem-vindo(a) de volta!</div>}
        </div>

        {/* Dados básicos */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>📊 Dados Físicos</div>

          {/* Gênero */}
          <div style={styles.fieldLabel}>Sexo</div>
          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            {[['M','Masculino'],['F','Feminino']].map(([v,l]) => (
              <button key={v} onClick={() => update('gender', v)}
                style={{ ...styles.optBtn, ...(profile.gender===v ? styles.optBtnActive(C.accent) : {}) }}>
                {v === 'M' ? '♂️' : '♀️'} {l}
              </button>
            ))}
          </div>

          {/* Campos numéricos */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
            {[
              ['age',    'Idade',   'anos', '1',  '99'],
              ['weight', 'Peso',    'kg',   '30', '250'],
              ['height', 'Altura',  'cm',   '100','220'],
            ].map(([key, label, unit, min, max]) => (
              <div key={key}>
                <div style={styles.fieldLabel}>{label}</div>
                <div style={styles.inputWrap}>
                  <input
                    type="number" min={min} max={max}
                    style={styles.input}
                    placeholder={unit}
                    value={profile[key]}
                    onChange={e => update(key, e.target.value)}
                  />
                  <span style={styles.inputUnit}>{unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BMI Card */}
        {bmi && bmiInfo && (
          <div style={{ ...styles.card, background:`${bmiInfo.color}10`, borderColor:`${bmiInfo.color}35` }}>
            <div style={styles.sectionTitle}>⚖️ IMC (Índice de Massa Corporal)</div>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:12 }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:42, fontWeight:900, color:bmiInfo.color, letterSpacing:-1 }}>{bmi}</div>
                <div style={{ fontSize:10, color:C.muted, letterSpacing:1 }}>IMC</div>
              </div>
              <div>
                <div style={{ fontSize:16, fontWeight:900, color:bmiInfo.color }}>{bmiInfo.icon} {bmiInfo.label}</div>
                <div style={{ color:C.muted, fontSize:12, marginTop:4, lineHeight:1.5 }}>{bmiInfo.tip}</div>
              </div>
            </div>
            {/* Barra visual */}
            <div style={styles.bmiBar}>
              {[['<18.5','#60a5fa'],['18.5–25','#22c55e'],['25–30','#f59e0b'],['30–35','#f97316'],['>35','#ef4444']].map(([label,color],i) => (
                <div key={i} style={{ flex:1, background:color, opacity:0.6, borderRadius:i===0?'6px 0 0 6px':i===4?'0 6px 6px 0':'0' }}/>
              ))}
              <div style={{
                position:'absolute', left:`${Math.min(95,Math.max(2,(parseFloat(bmi)-15)/25*100))}%`,
                top:-6, transform:'translateX(-50%)',
                width:14, height:14, borderRadius:'50%', background:bmiInfo.color,
                border:'2px solid #fff', boxShadow:`0 0 8px ${bmiInfo.color}`,
              }}/>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
              {['15','20','25','30','35','40'].map(v => (
                <span key={v} style={{ fontSize:9, color:C.muted }}>{v}</span>
              ))}
            </div>
            {/* Peso ideal */}
            {profile.height && (
              <div style={{ marginTop:12, background:'rgba(255,255,255,0.04)', borderRadius:10, padding:10 }}>
                <div style={{ fontSize:12, color:C.muted }}>
                  Peso ideal para sua altura:{' '}
                  <strong style={{ color:C.green }}>
                    {(18.5 * Math.pow(profile.height/100,2)).toFixed(1)}kg –{' '}
                    {(24.9 * Math.pow(profile.height/100,2)).toFixed(1)}kg
                  </strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Nível de atividade */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>🏃 Nível de Atividade</div>
          {Object.entries(ACTIVITY_LABELS).map(([v,l]) => (
            <button key={v} onClick={() => update('activity', v)}
              style={{ ...styles.actBtn, ...(profile.activity===v ? styles.actBtnActive : {}) }}>
              <div style={{ fontWeight:700, fontSize:13, color: profile.activity===v ? C.accent : C.text }}>{l}</div>
              {profile.activity===v && <span style={{ color:C.accent, fontSize:16 }}>✓</span>}
            </button>
          ))}
        </div>

        {/* Objetivo calórico */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>🎯 Objetivo Calórico</div>
          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            {[['lose_weight','Emagrecer','#f59e0b'],['maintain','Manter','#3b82f6'],['gain_muscle','Ganhar Massa','#22c55e']].map(([v,l,c]) => (
              <button key={v} onClick={() => update('goal', v)}
                style={{ ...styles.optBtn, flex:1, ...(profile.goal===v ? styles.optBtnActive(c) : {}) }}>
                {l}
              </button>
            ))}
          </div>

          {/* Resultado calórico */}
          {tdee && (
            <div style={{ display:'flex', gap:8 }}>
              {[
                ['🔥','TDEE',`${tdee} kcal`,'#f59e0b','Gasto total diário'],
                ['🎯','Meta',`${targetCal} kcal`,profile.goal==='gain_muscle'?'#22c55e':profile.goal==='lose_weight'?'#ef4444':'#3b82f6','Calorias alvo'],
              ].map(([ic,lb,vl,cl,desc]) => (
                <div key={lb} style={{ flex:1, background:`${cl}10`, border:`1px solid ${cl}30`, borderRadius:12, padding:'12px 10px', textAlign:'center' }}>
                  <div style={{ fontSize:20 }}>{ic}</div>
                  <div style={{ color:cl, fontWeight:900, fontSize:14, marginTop:4 }}>{vl}</div>
                  <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>{lb}</div>
                  <div style={{ color:C.muted, fontSize:9, marginTop:2 }}>{desc}</div>
                </div>
              ))}
            </div>
          )}

          {tmb && (
            <div style={{ marginTop:10, background:'rgba(255,255,255,0.03)', borderRadius:10, padding:10 }}>
              <div style={{ color:C.muted, fontSize:11 }}>
                TMB (Taxa Metabólica Basal): <strong style={{ color:C.text }}>{tmb} kcal/dia</strong>
                <span style={{ display:'block', marginTop:3, fontSize:10 }}>Calorias mínimas para o corpo funcionar em repouso.</span>
              </div>
            </div>
          )}
        </div>

        {/* Macros sugeridos */}
        {targetCal && (
          <div style={styles.card}>
            <div style={styles.sectionTitle}>💊 Macros Sugeridos</div>
            <div style={{ display:'flex', gap:8 }}>
              {(() => {
                const p = Math.round(targetCal * (profile.goal==='gain_muscle'?0.30:0.25) / 4);
                const f = Math.round(targetCal * 0.25 / 9);
                const c = Math.round((targetCal - p*4 - f*9) / 4);
                return [
                  ['💪','Proteína',`${p}g`,'#22d3ee'],
                  ['⚡','Carboidrato',`${c}g`,'#a78bfa'],
                  ['🫒','Gordura',`${f}g`,'#f472b6'],
                ].map(([ic,lb,vl,cl]) => (
                  <div key={lb} style={{ flex:1, background:`${cl}10`, border:`1px solid ${cl}28`, borderRadius:12, padding:'10px 6px', textAlign:'center' }}>
                    <div style={{ fontSize:18 }}>{ic}</div>
                    <div style={{ color:cl, fontWeight:900, fontSize:14, marginTop:4 }}>{vl}</div>
                    <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>{lb}</div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Botão salvar */}
        <button onClick={handleSave} style={styles.saveBtn}>
          {saved ? '✅ Salvo!' : '💾 Salvar Perfil'}
        </button>

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
  avatarCard:{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'20px 16px', marginBottom:14, display:'flex', flexDirection:'column', alignItems:'center', gap:8 },
  avatar:{ width:72, height:72, borderRadius:'50%', background:`linear-gradient(135deg,${C.accent},${C.accent2})`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, fontWeight:900, color:'#000' },
  nameInput:{ background:'rgba(255,255,255,0.05)', border:`1px solid ${C.border}`, borderRadius:10, padding:'10px 14px', color:C.text, fontSize:18, fontWeight:700, textAlign:'center', outline:'none', width:'100%', fontFamily:'inherit' },
  card:{ background:C.card, border:`1px solid ${C.border}`, borderRadius:20, padding:'18px 16px', marginBottom:14 },
  sectionTitle:{ fontSize:15, fontWeight:900, letterSpacing:1, marginBottom:14, color:C.text },
  fieldLabel:{ fontSize:11, color:C.muted, letterSpacing:1, marginBottom:5, textTransform:'uppercase' },
  inputWrap:{ position:'relative', display:'flex', alignItems:'center' },
  input:{ background:'rgba(255,255,255,0.05)', border:`1px solid ${C.border}`, borderRadius:10, padding:'10px 36px 10px 12px', color:C.text, fontSize:16, fontWeight:700, outline:'none', width:'100%', fontFamily:'inherit' },
  inputUnit:{ position:'absolute', right:10, color:C.muted, fontSize:11, fontWeight:700, pointerEvents:'none' },
  optBtn:{ flex:1, background:'rgba(255,255,255,0.04)', border:`1px solid ${C.border}`, borderRadius:10, padding:'10px 8px', color:C.muted, cursor:'pointer', fontSize:12, fontWeight:700, transition:'all 0.2s' },
  optBtnActive:(c)=>({ background:`${c}18`, border:`1px solid ${c}55`, color:c }),
  bmiBar:{ position:'relative', height:8, display:'flex', borderRadius:6, overflow:'visible', marginTop:8 },
  actBtn:{ width:'100%', background:'rgba(255,255,255,0.03)', border:`1px solid ${C.border}`, borderRadius:12, padding:'12px 14px', cursor:'pointer', textAlign:'left', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center', transition:'all 0.2s' },
  actBtnActive:{ background:'rgba(245,158,11,0.08)', border:`1px solid ${C.accent}44` },
  saveBtn:{ width:'100%', background:`linear-gradient(135deg,#b45309,#f59e0b)`, border:'none', borderRadius:12, padding:15, fontSize:16, fontWeight:900, letterSpacing:2, color:'#000', cursor:'pointer', textTransform:'uppercase', marginBottom:14 },
};
