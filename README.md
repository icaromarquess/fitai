# ⚡ FitAI — Personal Trainer Inteligente

App de treino personalizado com animações Lottie reais, planos de academia e casa, e plano alimentar.

---

## 🚀 Como publicar no Vercel (passo a passo)

### 1. Criar conta no GitHub (se não tiver)
1. Acesse **github.com**
2. Clique em **Sign up** e crie sua conta gratuita

### 2. Criar repositório no GitHub
1. Clique no **+** no canto superior direito → **New repository**
2. Nome: `fitai`
3. Deixe como **Public**
4. Clique em **Create repository**

### 3. Subir os arquivos
Você tem duas opções:

**Opção A — Pelo site do GitHub (mais fácil):**
1. No repositório criado, clique em **uploading an existing file**
2. Arraste a pasta `fitai` inteira
3. Clique em **Commit changes**

**Opção B — Pelo terminal:**
```bash
cd fitai
git init
git add .
git commit -m "FitAI app"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/fitai.git
git push -u origin main
```

### 4. Deploy no Vercel
1. Acesse **vercel.com**
2. Clique em **Sign Up** → entre com sua conta do **GitHub**
3. Clique em **Add New Project**
4. Selecione o repositório **fitai**
5. Vercel detecta automaticamente que é React
6. Clique em **Deploy**
7. Aguarde ~2 minutos ✅

### 5. Acessar o app
Após o deploy, o Vercel te dá uma URL como:
```
https://fitai-seu-usuario.vercel.app
```

Você pode abrir essa URL no celular e **adicionar à tela inicial** para usar como app!

---

## 📱 Adicionar à tela inicial (Android)
1. Abra a URL no Chrome
2. Menu (3 pontos) → **Adicionar à tela inicial**
3. O app aparece como ícone no celular

---

## 🎬 Sobre as animações
As animações Lottie são carregadas do **LottieFiles** (gratuito) quando você tem internet.
Sem internet, aparece um emoji animado como fallback.

---

## 📁 Estrutura do projeto
```
fitai/
├── public/
│   └── index.html
├── src/
│   ├── App.js              ← App principal
│   ├── index.js            ← Entry point
│   ├── components/
│   │   └── ExerciseAnimation.js  ← Animações Lottie
│   └── data/
│       └── plans.js        ← Todos os planos de treino
└── package.json
```

---

## ✨ Funcionalidades
- 4 objetivos: Emagrecer, Perder Barriga, Ganhar Massa, Resistência
- 3 níveis: Iniciante, Intermediário, Avançado
- 12 planos completos (4 objetivos × 3 níveis)
- Treinos de academia e casa
- Animações Lottie reais dos exercícios
- Plano alimentar com macros e refeições
- Modo treino ativo com cronômetro e descanso
- 100% gratuito para hospedar no Vercel
