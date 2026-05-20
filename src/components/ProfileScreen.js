/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { saveProfile, loadProfile } from '../utils/storage';

const C = { bg:'#f0f4f8', card:'#ffffff', border:'#e2e8f0', accent:'#f97316', accent2:'#6366f1', green:'#22c55e', muted:'#94a3b8', text:'#1e293b', text2:'#475569' };

function calcBMI(w,h){ if(!w||!h) return null; const hm=h/100; return (w/(hm*hm)).toFixed(1); }
function getBMIInfo(bmi){ if(!bmi) return null; const v=parseFloat(bmi);
  if(v<18.5) return {label:'Abaixo do Peso',color:'#60a5fa',icon:'⬇️',tip:'Aumente a ingestão calórica com alimentos nutritivos.'};
  if(v<25)   return {label:'Peso Normal',color:'#22c55e',icon:'✅',tip:'Parabéns! Mantenha hábitos saudáveis e treinos consistentes.'};
  if(v<30)   return {label:'Sobrepeso',color:'#f59e0b',icon:'⚠️',tip:'Foco em déficit calórico moderado e treinos de cardio.'};
  if(v<35)   return {label:'Obesidade I',color:'#f97316',icon:'🔶',tip:'Consulte um médico e nutricionista.'};
  return {label:'Obesidade II+',color:'#ef4444',icon:'🔴',tip:'Acompanhamento médico essencial.'};}
function calcTMB(w,h,a,g){ if(!w||!h||!a) return null;
  if(g==='M') return Math.round(88.36+(13.4*w)+(4.8*h)-(5.7*a));
  return Math.round(447.6+(9.2*w)+(3.1*h)-(4.3*a));}
function calcTDEE(tmb,act){ const m={sedentario:1.2,leve:1.375,moderado:1.55,ativo:1.725,muitoativo:1.9}; return tmb?Math.round(tmb*(m[act]||1.55)):null;}
const ACT_LABELS={sedentario:'Sedentário (sem exercício)',leve:'Leve (1–2x/semana)',moderado:'Moderado (3–4x/semana)',ativo:'Ativo (5–6x/semana)',muitoativo:'Muito Ativo (atleta)'};

export default function ProfileScreen({ onClose }) {
  const [profile, setProfile] = useState({ name:'',age:'',weight:'',height:'',gender:'M',activity:'moderado',goal:'lose_weight' });
  const [saved, setSaved] = useState(false);
  useEffect(()=>{ const p=loadProfile(); if(p) setProfile(p); },[]);
  const update=(k,v)=>setProfile(p=>({...p,[k]:v}));
  const handleSave=()=>{ saveProfile(profile); setSaved(true); setTimeout(()=>setSaved(false),2000); };
  const bmi=calcBMI(profile.weight,profile.height);
  const bmiInfo=getBMIInfo(bmi);
  const tmb=calcTMB(profile.weight,profile.height,profile.age,profile.gender);
  const tdee=calcTDEE(tmb,profile.activity);
  const targetCal={lose_weight:tdee?tdee-400:null,gain_muscle:tdee?tdee+300:null,maintain:tdee}[profile.goal];

  const inp={background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:10,padding:'10px 12px',color:C.text,fontSize:16,fontWeight:700,outline:'none',width:'100%',fontFamily:'inherit'};

  return (
    <div style={{ minHeight:'100vh', background:C.bg, color:C.text, fontFamily:"'Barlow Condensed','Oswald','Impact',sans-serif", paddingBottom:80 }}>
      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:10 }}>
        <button onClick={onClose} style={{ background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, padding:'8px 14px', color:C.text2, cursor:'pointer', fontSize:13, fontWeight:700 }}>← Voltar</button>
        <div style={{ flex:1, textAlign:'center', fontSize:20, fontWeight:900, letterSpacing:4, background:'linear-gradient(135deg,#f97316,#6366f1)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>PERFIL</div>
        <div style={{ width:70 }}/>
      </div>

      <div style={{ padding:'14px' }}>
        {/* Avatar */}
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:20, padding:'20px', marginBottom:14, display:'flex', flexDirection:'column', alignItems:'center', gap:10, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#f97316,#6366f1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, fontWeight:900, color:'#fff' }}>
            {profile.name?profile.name[0].toUpperCase():'👤'}
          </div>
          <input style={{ ...inp, textAlign:'center', fontSize:20 }} placeholder="Seu nome" value={profile.name} onChange={e=>update('name',e.target.value)}/>
        </div>

        {/* Dados físicos */}
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:20, padding:'18px', marginBottom:14, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize:15, fontWeight:900, marginBottom:14, color:C.text }}>📊 Dados Físicos</div>
          <div style={{ fontSize:11, color:C.muted, letterSpacing:1, marginBottom:6 }}>SEXO</div>
          <div style={{ display:'flex', gap:8, marginBottom:14 }}>
            {[['M','♂️ Masculino'],['F','♀️ Feminino']].map(([v,l])=>(
              <button key={v} onClick={()=>update('gender',v)} style={{ flex:1, background:profile.gender===v?'rgba(249,115,22,0.1)':'#f8fafc', border:`2px solid ${profile.gender===v?C.accent:'#e2e8f0'}`, borderRadius:10, padding:'10px', color:profile.gender===v?C.accent:C.text2, cursor:'pointer', fontSize:13, fontWeight:700 }}>{l}</button>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
            {[['age','Idade','anos'],['weight','Peso','kg'],['height','Altura','cm']].map(([k,l,u])=>(
              <div key={k}>
                <div style={{ fontSize:11, color:C.muted, letterSpacing:1, marginBottom:5 }}>{l.toUpperCase()}</div>
                <div style={{ position:'relative' }}>
                  <input type="number" style={inp} placeholder={u} value={profile[k]} onChange={e=>update(k,e.target.value)}/>
                  <span style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:C.muted, fontSize:11, fontWeight:700, pointerEvents:'none' }}>{u}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BMI */}
        {bmi&&bmiInfo&&(
          <div style={{ background:'#fff', border:`1px solid ${bmiInfo.color}30`, borderRadius:20, padding:'18px', marginBottom:14, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize:15, fontWeight:900, marginBottom:14, color:C.text }}>⚖️ IMC</div>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:12 }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:44, fontWeight:900, color:bmiInfo.color }}>{bmi}</div>
                <div style={{ fontSize:10, color:C.muted, letterSpacing:1 }}>IMC</div>
              </div>
              <div>
                <div style={{ fontSize:16, fontWeight:900, color:bmiInfo.color }}>{bmiInfo.icon} {bmiInfo.label}</div>
                <div style={{ color:C.text2, fontSize:12, marginTop:4, lineHeight:1.5 }}>{bmiInfo.tip}</div>
              </div>
            </div>
            <div style={{ position:'relative', height:8, display:'flex', borderRadius:6, overflow:'visible', marginTop:8 }}>
              {[['#60a5fa'],['#22c55e'],['#f59e0b'],['#f97316'],['#ef4444']].map(([c],i)=>(
                <div key={i} style={{ flex:1, background:c, opacity:0.5, borderRadius:i===0?'6px 0 0 6px':i===4?'0 6px 6px 0':'0' }}/>
              ))}
              <div style={{ position:'absolute', left:`${Math.min(95,Math.max(2,(parseFloat(bmi)-15)/25*100))}%`, top:-5, transform:'translateX(-50%)', width:14, height:14, borderRadius:'50%', background:bmiInfo.color, border:'2px solid #fff', boxShadow:`0 0 8px ${bmiInfo.color}` }}/>
            </div>
            {profile.height&&(
              <div style={{ marginTop:12, background:'#f8fafc', borderRadius:10, padding:10 }}>
                <div style={{ fontSize:12, color:C.text2 }}>Peso ideal: <strong style={{ color:C.green }}>{(18.5*Math.pow(profile.height/100,2)).toFixed(1)}kg – {(24.9*Math.pow(profile.height/100,2)).toFixed(1)}kg</strong></div>
              </div>
            )}
          </div>
        )}

        {/* Atividade */}
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:20, padding:'18px', marginBottom:14, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize:15, fontWeight:900, marginBottom:14, color:C.text }}>🏃 Nível de Atividade</div>
          {Object.entries(ACT_LABELS).map(([v,l])=>(
            <button key={v} onClick={()=>update('activity',v)} style={{ width:'100%', background:profile.activity===v?'rgba(249,115,22,0.06)':'#f8fafc', border:`1.5px solid ${profile.activity===v?C.accent:'#e2e8f0'}`, borderRadius:12, padding:'12px 14px', cursor:'pointer', textAlign:'left', marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontWeight:700, fontSize:13, color:profile.activity===v?C.accent:C.text }}>{l}</div>
              {profile.activity===v&&<span style={{ color:C.accent, fontSize:16 }}>✓</span>}
            </button>
          ))}
        </div>

        {/* Objetivo + Calorias */}
        {tdee&&(
          <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:20, padding:'18px', marginBottom:14, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize:15, fontWeight:900, marginBottom:14, color:C.text }}>🎯 Calorias Diárias</div>
            <div style={{ display:'flex', gap:8, marginBottom:14 }}>
              {[['lose_weight','Emagrecer','#f59e0b'],['maintain','Manter','#6366f1'],['gain_muscle','Ganhar Massa','#22c55e']].map(([v,l,c])=>(
                <button key={v} onClick={()=>update('goal',v)} style={{ flex:1, background:profile.goal===v?`${c}10`:'#f8fafc', border:`2px solid ${profile.goal===v?c:'#e2e8f0'}`, borderRadius:10, padding:'8px', color:profile.goal===v?c:C.text2, cursor:'pointer', fontSize:11, fontWeight:900 }}>{l}</button>
              ))}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {[['🔥','TDEE',`${tdee} kcal`,'#f59e0b'],['🎯','Meta',`${targetCal} kcal`,profile.goal==='gain_muscle'?'#22c55e':'#ef4444']].map(([ic,lb,vl,cl])=>(
                <div key={lb} style={{ flex:1, background:`${cl}08`, border:`1px solid ${cl}25`, borderRadius:12, padding:'12px 10px', textAlign:'center' }}>
                  <div style={{ fontSize:20 }}>{ic}</div>
                  <div style={{ color:cl, fontWeight:900, fontSize:14, marginTop:4 }}>{vl}</div>
                  <div style={{ color:C.muted, fontSize:10, marginTop:2 }}>{lb}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleSave} style={{ width:'100%', background:saved?'linear-gradient(135deg,#16a34a,#22c55e)':'linear-gradient(135deg,#f97316,#ea580c)', border:'none', borderRadius:12, padding:15, fontSize:16, fontWeight:900, letterSpacing:2, color:'#fff', cursor:'pointer', textTransform:'uppercase', boxShadow:'0 4px 14px rgba(249,115,22,0.3)' }}>
          {saved?'✅ Salvo!':'💾 Salvar Perfil'}
        </button>
      </div>
    </div>
  );
}
