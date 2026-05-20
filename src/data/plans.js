export const GOALS = [
  { id: 'lose_weight', icon: '🔥', label: 'Emagrecer',      desc: 'Queimar gordura corporal' },
  { id: 'lose_belly',  icon: '💪', label: 'Perder Barriga', desc: 'Definir o abdômen' },
  { id: 'gain_muscle', icon: '🏋️', label: 'Ganhar Massa',   desc: 'Aumentar volume muscular' },
  { id: 'endurance',   icon: '🏃', label: 'Resistência',    desc: 'Melhorar condicionamento' },
];

export const LEVELS = [
  { id: 'beginner',     label: 'Iniciante',     icon: '🌱', desc: 'Pouca ou nenhuma experiência' },
  { id: 'intermediate', label: 'Intermediário', icon: '💪', desc: 'Treino há 6+ meses' },
  { id: 'advanced',     label: 'Avançado',      icon: '⚡', desc: '2+ anos de treino consistente' },
];

const PLANS = {
  lose_weight: {
    beginner: {
      titulo: 'Queima de Gordura — Iniciante',
      resumo: 'HIIT e funcional para criar déficit calórico com segurança.',
      treinos: [
        { dia: 'Segunda', foco: 'Full Body Cardio', local: '🏠 Casa', exercicios: [
          { nome: 'Jumping Jack',     series: 3, repeticoes: '40',      descanso: '30s', dica: 'Ritmo constante, respire pelo nariz.',       musculos: ['Full Body'] },
          { nome: 'Agachamento',      series: 3, repeticoes: '15',      descanso: '45s', dica: 'Desça até 90°, joelhos atrás dos pés.',       musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Flexão',           series: 3, repeticoes: '8',       descanso: '45s', dica: 'Apoie os joelhos se necessário.',             musculos: ['Peito', 'Tríceps'] },
          { nome: 'Mountain Climber', series: 3, repeticoes: '20',      descanso: '30s', dica: 'Core ativado, quadril nivelado.',             musculos: ['Core', 'Full Body'] },
          { nome: 'Prancha',          series: 3, repeticoes: '30s',     descanso: '30s', dica: 'Respire normalmente.',                        musculos: ['Core'] },
        ]},
        { dia: 'Quarta', foco: 'HIIT Funcional', local: '🏠 Casa', exercicios: [
          { nome: 'Burpee',           series: 4, repeticoes: '8',       descanso: '40s', dica: 'Explosão no salto, controle na descida.',     musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 4, repeticoes: '25',      descanso: '20s', dica: 'Velocidade controlada.',                      musculos: ['Core', 'Full Body'] },
          { nome: 'Agachamento',      series: 3, repeticoes: '20',      descanso: '40s', dica: 'Acelere o ritmo nesta sessão.',               musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Jumping Jack',     series: 3, repeticoes: '50',      descanso: '20s', dica: 'Sem parar, foco no cardio.',                  musculos: ['Full Body'] },
          { nome: 'Abdominal',        series: 3, repeticoes: '20',      descanso: '30s', dica: 'Expire ao contrair.',                         musculos: ['Core'] },
        ]},
        { dia: 'Sexta', foco: 'Força + Core', local: '🏠 Casa', exercicios: [
          { nome: 'Agachamento',      series: 3, repeticoes: '15',      descanso: '45s', dica: 'Foque na técnica.',                           musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Flexão',           series: 3, repeticoes: '10',      descanso: '45s', dica: 'Peito toca o chão.',                          musculos: ['Peito', 'Tríceps'] },
          { nome: 'Afundo',           series: 3, repeticoes: '10 cada', descanso: '45s', dica: 'Passo largo.',                                musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Abdominal',        series: 3, repeticoes: '20',      descanso: '30s', dica: 'Expire na contração.',                        musculos: ['Core'] },
          { nome: 'Prancha',          series: 3, repeticoes: '40s',     descanso: '30s', dica: 'Progrida 5s por semana.',                     musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'Cardio Ativo', local: '🏠 Casa', exercicios: [
          { nome: 'Jumping Jack',     series: 4, repeticoes: '50',      descanso: '20s', dica: 'Recuperação ativa.',                          musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 3, repeticoes: '20',      descanso: '30s', dica: 'Core firme.',                                 musculos: ['Core'] },
          { nome: 'Prancha',          series: 3, repeticoes: '35s',     descanso: '30s', dica: 'Qualidade acima de tudo.',                    musculos: ['Core'] },
          { nome: 'Abdominal',        series: 3, repeticoes: '20',      descanso: '30s', dica: 'Movimentos lentos.',                          musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '1.600–1.800 kcal', proteina: '120–140g', carboidrato: '160–180g', gordura: '50–65g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: 'Omelete 3 ovos + espinafre + pão integral + café s/ açúcar' },
          { horario: '10:00', nome: 'Lanche',        exemplo: 'Iogurte grego natural + 1 fruta' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '150g frango grelhado + arroz integral + feijão + salada' },
          { horario: '16:00', nome: 'Pré-treino',    exemplo: '1 banana + 1 col. pasta de amendoim' },
          { horario: '20:00', nome: 'Jantar',        exemplo: '200g peixe grelhado + batata doce + legumes' },
        ],
      },
      dicas: [
        'Beba 2,5L de água diariamente — hidratação acelera o metabolismo.',
        'Elimine açúcar refinado, farinha branca e refrigerantes.',
        'Durma 7–8h: durante o sono seu corpo queima mais gordura.',
        'O déficit deve vir da qualidade dos alimentos, não da ausência.',
      ],
    },
    intermediate: {
      titulo: 'Queima de Gordura — Intermediário',
      resumo: 'Misto academia + casa com alta intensidade para queimar e preservar massa.',
      treinos: [
        { dia: 'Segunda', foco: 'Peito + HIIT', local: '🏋️ Academia', exercicios: [
          { nome: 'Supino Reto',      series: 4, repeticoes: '12',      descanso: '60s', dica: 'Descida lenta 3s, subida explosiva.',         musculos: ['Peito', 'Tríceps', 'Ombros'] },
          { nome: 'Supino Inclinado', series: 3, repeticoes: '12',      descanso: '60s', dica: 'Foco na parte superior do peitoral.',          musculos: ['Peito', 'Ombros'] },
          { nome: 'Flexão',           series: 3, repeticoes: '15',      descanso: '40s', dica: 'Finalizador com peso corporal.',               musculos: ['Peito', 'Tríceps'] },
          { nome: 'Burpee',           series: 4, repeticoes: '12',      descanso: '30s', dica: 'HIIT de finalização.',                        musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 3, repeticoes: '30',      descanso: '20s', dica: 'Core firme.',                                 musculos: ['Core', 'Full Body'] },
        ]},
        { dia: 'Terça', foco: 'Pernas + Glúteo', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 4, repeticoes: '12', descanso: '90s', dica: 'Profundidade abaixo do paralelo.',           musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Leg Press',        series: 4, repeticoes: '15',      descanso: '75s', dica: 'Não trave os joelhos no topo.',               musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Hip Thrust',       series: 4, repeticoes: '20',      descanso: '60s', dica: 'Pausa de 2s no topo.',                        musculos: ['Glúteo', 'Pernas'] },
          { nome: 'Afundo',           series: 3, repeticoes: '12 cada', descanso: '60s', dica: 'Amplitude completa.',                         musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '25',      descanso: '30s', dica: 'Core de finalização.',                        musculos: ['Core'] },
        ]},
        { dia: 'Quinta', foco: 'Costas + Bíceps', local: '🏋️ Academia', exercicios: [
          { nome: 'Puxada Alta',      series: 4, repeticoes: '12',      descanso: '75s', dica: 'Puxe com os cotovelos.',                      musculos: ['Costas', 'Bíceps'] },
          { nome: 'Remada Curvada',   series: 4, repeticoes: '12',      descanso: '75s', dica: 'Tronco a 45°, core ativado.',                 musculos: ['Costas', 'Bíceps'] },
          { nome: 'Rosca Direta',     series: 3, repeticoes: '12',      descanso: '60s', dica: 'Sem balançar o tronco.',                      musculos: ['Bíceps'] },
          { nome: 'Jumping Jack',     series: 4, repeticoes: '50',      descanso: '20s', dica: 'Cardio entre séries.',                        musculos: ['Full Body'] },
          { nome: 'Prancha',          series: 3, repeticoes: '50s',     descanso: '30s', dica: 'Core de finalização.',                        musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'HIIT Full Body', local: '🏠 Casa', exercicios: [
          { nome: 'Burpee',           series: 5, repeticoes: '12',      descanso: '25s', dica: 'Teste seu limite.',                           musculos: ['Full Body'] },
          { nome: 'Agachamento',      series: 4, repeticoes: '20',      descanso: '30s', dica: 'Sem pausa entre reps.',                       musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Flexão',           series: 4, repeticoes: '15',      descanso: '30s', dica: 'Força máxima.',                               musculos: ['Peito', 'Tríceps'] },
          { nome: 'Mountain Climber', series: 4, repeticoes: '30',      descanso: '20s', dica: 'Core sempre firme.',                          musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '25',      descanso: '20s', dica: 'Finalize.',                                   musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '1.800–2.000 kcal', proteina: '140–160g', carboidrato: '180–200g', gordura: '55–70g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: '4 claras + 1 gema + aveia + whey + frutas vermelhas' },
          { horario: '10:00', nome: 'Lanche',        exemplo: 'Iogurte grego + granola s/ açúcar + castanhas' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '200g frango + arroz integral + salada com azeite' },
          { horario: '16:30', nome: 'Pré-treino',    exemplo: '1 banana + café preto' },
          { horario: '20:00', nome: 'Jantar',        exemplo: '200g carne magra + batata doce + legumes' },
        ],
      },
      dicas: [
        'Cardio em jejum 2x/semana maximiza a queima.',
        'Proteína em todas as refeições preserva a massa.',
        'HIIT: 20s esforço + 10s descanso, 8 rodadas.',
        'Pesquise-se sempre no mesmo horário.',
      ],
    },
    advanced: {
      titulo: 'Queima de Gordura — Avançado',
      resumo: 'Superséries e HIIT de alta intensidade para definição máxima.',
      treinos: [
        { dia: 'Segunda', foco: 'Peito + Tríceps', local: '🏋️ Academia', exercicios: [
          { nome: 'Supino Reto',      series: 5, repeticoes: '10',      descanso: '60s', dica: 'Carga máxima, técnica perfeita.',             musculos: ['Peito', 'Tríceps'] },
          { nome: 'Supino Inclinado', series: 4, repeticoes: '10',      descanso: '60s', dica: 'Peitoral superior.',                          musculos: ['Peito', 'Ombros'] },
          { nome: 'Flexão',           series: 4, repeticoes: '20',      descanso: '30s', dica: 'Supersérie.',                                 musculos: ['Peito', 'Tríceps'] },
          { nome: 'Tríceps Polia',    series: 4, repeticoes: '15',      descanso: '45s', dica: 'Cotovelo fixo.',                              musculos: ['Tríceps'] },
          { nome: 'Burpee',           series: 4, repeticoes: '15',      descanso: '20s', dica: 'Finisher metabólico.',                        musculos: ['Full Body'] },
        ]},
        { dia: 'Terça', foco: 'Pernas Volume', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 5, repeticoes: '10', descanso: '90s', dica: 'Profundidade máxima.',                       musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Leg Press',        series: 5, repeticoes: '15',      descanso: '75s', dica: 'Drop set na última.',                         musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Stiff',            series: 4, repeticoes: '12',      descanso: '75s', dica: 'Isquiotibiais ao máximo.',                   musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Hip Thrust',       series: 5, repeticoes: '20',      descanso: '60s', dica: 'Pausa 2s.',                                  musculos: ['Glúteo', 'Pernas'] },
          { nome: 'Mountain Climber', series: 4, repeticoes: '35',      descanso: '20s', dica: 'Finisher.',                                  musculos: ['Core', 'Full Body'] },
        ]},
        { dia: 'Quinta', foco: 'Costas + Bíceps', local: '🏋️ Academia', exercicios: [
          { nome: 'Puxada Alta',      series: 5, repeticoes: '10',      descanso: '75s', dica: 'Amplitude máxima.',                          musculos: ['Costas', 'Bíceps'] },
          { nome: 'Remada Curvada',   series: 5, repeticoes: '10',      descanso: '75s', dica: 'Carga progressiva.',                         musculos: ['Costas', 'Bíceps'] },
          { nome: 'Rosca Direta',     series: 4, repeticoes: '12',      descanso: '60s', dica: 'Supinação máxima.',                          musculos: ['Bíceps'] },
          { nome: 'Tríceps Polia',    series: 3, repeticoes: '15',      descanso: '45s', dica: 'Supersérie.',                                musculos: ['Tríceps'] },
          { nome: 'Prancha',          series: 4, repeticoes: '60s',     descanso: '20s', dica: 'Core de aço.',                               musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'HIIT Extremo', local: '🏠 Casa', exercicios: [
          { nome: 'Burpee',           series: 6, repeticoes: '15',      descanso: '15s', dica: 'Cada rodada mais rápida.',                   musculos: ['Full Body'] },
          { nome: 'Agachamento',      series: 5, repeticoes: '25',      descanso: '20s', dica: 'Salto explosivo.',                           musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Flexão',           series: 5, repeticoes: '20',      descanso: '20s', dica: 'Sem pausa.',                                 musculos: ['Peito', 'Tríceps'] },
          { nome: 'Mountain Climber', series: 5, repeticoes: '40',      descanso: '15s', dica: 'Velocidade máxima.',                         musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '30',      descanso: '15s', dica: 'Core final.',                                musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '2.000–2.200 kcal', proteina: '160–180g', carboidrato: '200–220g', gordura: '60–75g',
        refeicoes: [
          { horario: '06:30', nome: 'Pré-Treino',    exemplo: 'Café preto + banana + 30g whey' },
          { horario: '09:00', nome: 'Pós-Treino',    exemplo: '4 ovos + aveia + frutas vermelhas' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '220g frango + arroz integral + feijão + salada' },
          { horario: '16:30', nome: 'Lanche',        exemplo: '30g whey + fruta + castanhas' },
          { horario: '20:00', nome: 'Jantar',        exemplo: '220g salmão + legumes + batata doce' },
        ],
      },
      dicas: [
        'Carb cycling: mais carbo no treino, menos no descanso.',
        'Cafeína 30min antes eleva performance.',
        'Monitore % de gordura quinzenalmente.',
        'Deload a cada 6 semanas.',
      ],
    },
  },
  gain_muscle: {
    beginner: {
      titulo: 'Ganho de Massa — Iniciante',
      resumo: 'Compostos de academia + funcional em casa para base sólida.',
      treinos: [
        { dia: 'Segunda', foco: 'Peito + Tríceps', local: '🏋️ Academia', exercicios: [
          { nome: 'Supino Reto',      series: 4, repeticoes: '10',      descanso: '90s', dica: 'Desça 3s, suba explosivo.',                  musculos: ['Peito', 'Tríceps', 'Ombros'] },
          { nome: 'Supino Inclinado', series: 3, repeticoes: '10',      descanso: '90s', dica: 'Peitoral superior.',                          musculos: ['Peito', 'Ombros'] },
          { nome: 'Flexão',           series: 3, repeticoes: '12',      descanso: '60s', dica: 'Finalizador.',                               musculos: ['Peito', 'Tríceps'] },
          { nome: 'Tríceps Polia',    series: 3, repeticoes: '12',      descanso: '60s', dica: 'Cotovelo fixo ao lado do corpo.',             musculos: ['Tríceps'] },
          { nome: 'Prancha',          series: 3, repeticoes: '30s',     descanso: '45s', dica: 'Core forte = mais força.',                   musculos: ['Core'] },
        ]},
        { dia: 'Quarta', foco: 'Pernas + Glúteo', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 4, repeticoes: '12', descanso: '90s', dica: 'Profundidade é tudo.',                      musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Leg Press',        series: 3, repeticoes: '15',      descanso: '75s', dica: 'Não trave o joelho.',                        musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Hip Thrust',       series: 4, repeticoes: '20',      descanso: '60s', dica: 'Pausa no topo.',                             musculos: ['Glúteo', 'Pernas'] },
          { nome: 'Stiff',            series: 3, repeticoes: '12',      descanso: '75s', dica: 'Isquiotibiais e glúteo.',                   musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Abdominal',        series: 3, repeticoes: '20',      descanso: '30s', dica: 'Core.',                                      musculos: ['Core'] },
        ]},
        { dia: 'Sexta', foco: 'Costas + Bíceps', local: '🏋️ Academia', exercicios: [
          { nome: 'Puxada Alta',      series: 4, repeticoes: '10',      descanso: '90s', dica: 'Puxe com os cotovelos.',                     musculos: ['Costas', 'Bíceps'] },
          { nome: 'Remada Curvada',   series: 4, repeticoes: '10',      descanso: '90s', dica: 'Costas retas, core firme.',                  musculos: ['Costas', 'Bíceps'] },
          { nome: 'Rosca Direta',     series: 3, repeticoes: '12',      descanso: '60s', dica: 'Amplitude completa.',                        musculos: ['Bíceps'] },
          { nome: 'Desenvolvimento',  series: 3, repeticoes: '10',      descanso: '75s', dica: 'Ombros e trapézio.',                         musculos: ['Ombros'] },
          { nome: 'Prancha',          series: 3, repeticoes: '40s',     descanso: '30s', dica: 'Core.',                                      musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'Full Body Casa', local: '🏠 Casa', exercicios: [
          { nome: 'Agachamento',      series: 3, repeticoes: '20',      descanso: '60s', dica: 'Volume alto.',                               musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Flexão',           series: 3, repeticoes: '15',      descanso: '60s', dica: 'Técnica perfeita.',                          musculos: ['Peito', 'Tríceps'] },
          { nome: 'Afundo',           series: 3, repeticoes: '12 cada', descanso: '60s', dica: 'Amplitude máxima.',                          musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '20',      descanso: '30s', dica: 'Core.',                                      musculos: ['Core'] },
          { nome: 'Prancha',          series: 3, repeticoes: '40s',     descanso: '30s', dica: 'Finalização.',                               musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '2.400–2.700 kcal', proteina: '150–180g', carboidrato: '280–320g', gordura: '70–85g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: '4 ovos + pão integral + banana + leite integral' },
          { horario: '10:00', nome: 'Lanche',        exemplo: '30g whey + fruta + castanhas' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '200g frango + arroz branco + feijão + legumes' },
          { horario: '16:30', nome: 'Pré-treino',    exemplo: '2 bananas + pasta de amendoim + café' },
          { horario: '20:30', nome: 'Jantar',        exemplo: '200g carne vermelha + macarrão integral + salada' },
        ],
      },
      dicas: [
        'Superávit de 300–500 kcal/dia é a base.',
        'Proteína nas 2h após o treino.',
        'Durma 8h — GH é liberado no sono.',
        'Aumente carga toda semana.',
      ],
    },
    intermediate: {
      titulo: 'Ganho de Massa — Intermediário',
      resumo: 'Volume e intensidade progressivos para quebrar platôs.',
      treinos: [
        { dia: 'Segunda', foco: 'Peito Completo', local: '🏋️ Academia', exercicios: [
          { nome: 'Supino Reto',      series: 5, repeticoes: '10',      descanso: '90s', dica: 'Carga alta, técnica perfeita.',               musculos: ['Peito', 'Tríceps', 'Ombros'] },
          { nome: 'Supino Inclinado', series: 4, repeticoes: '10',      descanso: '90s', dica: 'Peitoral superior.',                          musculos: ['Peito', 'Ombros'] },
          { nome: 'Flexão',           series: 3, repeticoes: '15',      descanso: '60s', dica: 'Supersérie.',                                musculos: ['Peito', 'Tríceps'] },
          { nome: 'Tríceps Polia',    series: 4, repeticoes: '12',      descanso: '60s', dica: 'Corda ou barra reta.',                        musculos: ['Tríceps'] },
          { nome: 'Prancha',          series: 3, repeticoes: '60s',     descanso: '30s', dica: 'Core.',                                      musculos: ['Core'] },
        ]},
        { dia: 'Terça', foco: 'Pernas + Glúteo', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 5, repeticoes: '10', descanso: '90s', dica: 'Abaixo do paralelo.',                       musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Leg Press',        series: 4, repeticoes: '15',      descanso: '75s', dica: 'Posição dos pés varia o foco.',               musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Stiff',            series: 4, repeticoes: '12',      descanso: '75s', dica: 'Amplitude máxima.',                          musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Hip Thrust',       series: 5, repeticoes: '20',      descanso: '60s', dica: 'Pausa 2s.',                                  musculos: ['Glúteo', 'Pernas'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '25',      descanso: '30s', dica: 'Oblíquos.',                                  musculos: ['Core'] },
        ]},
        { dia: 'Quinta', foco: 'Costas + Ombros', local: '🏋️ Academia', exercicios: [
          { nome: 'Puxada Alta',      series: 5, repeticoes: '10',      descanso: '90s', dica: 'Varie pegada.',                              musculos: ['Costas', 'Bíceps'] },
          { nome: 'Remada Curvada',   series: 5, repeticoes: '10',      descanso: '90s', dica: 'Puxe até o umbigo.',                         musculos: ['Costas', 'Bíceps'] },
          { nome: 'Desenvolvimento',  series: 4, repeticoes: '10',      descanso: '75s', dica: 'Halteres ou barra.',                         musculos: ['Ombros', 'Tríceps'] },
          { nome: 'Rosca Direta',     series: 4, repeticoes: '12',      descanso: '60s', dica: 'Supinação exagerada.',                       musculos: ['Bíceps'] },
          { nome: 'Prancha',          series: 3, repeticoes: '60s',     descanso: '30s', dica: 'Core.',                                      musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'Full Body Volume', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 4, repeticoes: '15', descanso: '75s', dica: 'Volume.',                                   musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Supino Reto',      series: 4, repeticoes: '12',      descanso: '75s', dica: 'Técnica.',                                   musculos: ['Peito', 'Tríceps'] },
          { nome: 'Hip Thrust',       series: 4, repeticoes: '20',      descanso: '60s', dica: 'Glúteo.',                                    musculos: ['Glúteo'] },
          { nome: 'Rosca Direta',     series: 3, repeticoes: '15',      descanso: '45s', dica: 'Braços.',                                   musculos: ['Bíceps'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '25',      descanso: '30s', dica: 'Core.',                                      musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '2.800–3.200 kcal', proteina: '180–220g', carboidrato: '330–380g', gordura: '80–95g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: '5 ovos + aveia 60g + banana + mel + leite integral' },
          { horario: '10:00', nome: 'Lanche',        exemplo: '40g whey + frutas vermelhas + pasta de amendoim' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '250g frango + arroz + feijão + macarrão + legumes' },
          { horario: '16:30', nome: 'Pré-treino',    exemplo: '2 bananas + 30g whey + café' },
          { horario: '20:30', nome: 'Jantar',        exemplo: '250g carne + batata doce + brócolis + azeite' },
        ],
      },
      dicas: [
        'Sobrecarga progressiva a cada 2 semanas.',
        'Creatina 5g/dia comprovada.',
        'Deload a cada 6–8 semanas.',
        'Compostos primeiro: supino, puxada, agachamento.',
      ],
    },
    advanced: {
      titulo: 'Ganho de Massa — Avançado',
      resumo: 'Alto volume com técnicas avançadas de hipertrofia.',
      treinos: [
        { dia: 'Segunda', foco: 'Peito Máximo', local: '🏋️ Academia', exercicios: [
          { nome: 'Supino Reto',      series: 6, repeticoes: '8',       descanso: '90s', dica: 'Drop set na última.',                        musculos: ['Peito', 'Tríceps'] },
          { nome: 'Supino Inclinado', series: 5, repeticoes: '10',      descanso: '90s', dica: 'Supersérie com flexão.',                     musculos: ['Peito', 'Ombros'] },
          { nome: 'Flexão',           series: 4, repeticoes: '20',      descanso: '45s', dica: 'Pré-exaustão.',                              musculos: ['Peito', 'Tríceps'] },
          { nome: 'Tríceps Polia',    series: 5, repeticoes: '12',      descanso: '60s', dica: 'Extensão máxima.',                           musculos: ['Tríceps'] },
          { nome: 'Desenvolvimento',  series: 4, repeticoes: '10',      descanso: '75s', dica: 'Ombros completos.',                          musculos: ['Ombros'] },
        ]},
        { dia: 'Terça', foco: 'Pernas Total', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 6, repeticoes: '8',  descanso: '120s', dica: 'Pausa 2s no fundo.',                       musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Leg Press',        series: 5, repeticoes: '15',      descanso: '90s', dica: 'Drop set.',                                  musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Stiff',            series: 5, repeticoes: '10',      descanso: '90s', dica: 'Costas neutras.',                            musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Hip Thrust',       series: 6, repeticoes: '20',      descanso: '75s', dica: 'Pausa 3s no topo.',                          musculos: ['Glúteo', 'Pernas'] },
          { nome: 'Afundo',           series: 4, repeticoes: '15 cada', descanso: '60s', dica: 'Com halteres.',                              musculos: ['Pernas', 'Glúteo'] },
        ]},
        { dia: 'Quinta', foco: 'Costas Elite', local: '🏋️ Academia', exercicios: [
          { nome: 'Remada Curvada',   series: 6, repeticoes: '8',       descanso: '90s', dica: 'Carga máxima.',                              musculos: ['Costas', 'Bíceps'] },
          { nome: 'Puxada Alta',      series: 5, repeticoes: '10',      descanso: '90s', dica: 'Amplitude total.',                           musculos: ['Costas', 'Bíceps'] },
          { nome: 'Rosca Direta',     series: 5, repeticoes: '10',      descanso: '60s', dica: 'Técnica estrita.',                           musculos: ['Bíceps'] },
          { nome: 'Desenvolvimento',  series: 4, repeticoes: '10',      descanso: '75s', dica: 'Ombros.',                                    musculos: ['Ombros'] },
          { nome: 'Prancha',          series: 4, repeticoes: '75s',     descanso: '30s', dica: 'Core de elite.',                             musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'Full Body Finisher', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 5, repeticoes: '12', descanso: '75s', dica: 'Volume.',                                   musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Supino Reto',      series: 5, repeticoes: '12',      descanso: '75s', dica: 'Técnica.',                                   musculos: ['Peito', 'Tríceps'] },
          { nome: 'Puxada Alta',      series: 5, repeticoes: '12',      descanso: '75s', dica: 'Costas.',                                    musculos: ['Costas', 'Bíceps'] },
          { nome: 'Rosca Direta',     series: 4, repeticoes: '12',      descanso: '60s', dica: 'Braços.',                                   musculos: ['Bíceps'] },
          { nome: 'Burpee',           series: 3, repeticoes: '10',      descanso: '30s', dica: 'Finisher.',                                  musculos: ['Full Body'] },
        ]},
      ],
      alimentacao: {
        calorias: '3.200–3.600 kcal', proteina: '220–260g', carboidrato: '380–430g', gordura: '90–110g',
        refeicoes: [
          { horario: '06:30', nome: 'Acordar',       exemplo: '30g whey + banana + café' },
          { horario: '08:30', nome: 'Café da Manhã', exemplo: '6 ovos + aveia 80g + leite integral + frutas' },
          { horario: '12:30', nome: 'Almoço',        exemplo: '300g frango + arroz + feijão + batata doce + salada' },
          { horario: '15:30', nome: 'Pré-treino',    exemplo: '40g whey + 2 bananas + pasta amendoim + café' },
          { horario: '20:30', nome: 'Jantar',        exemplo: '300g carne + macarrão + legumes + queijo cottage' },
        ],
      },
      dicas: [
        'Drop sets e superséries para quebrar platôs.',
        'Periodização ondulatória: força (5x5) e hipertrofia (4x12).',
        'Rastreie calorias — erro de 200 kcal trava o ganho.',
        'Bulk (400 kcal) e cut (300 kcal) de 8 semanas.',
      ],
    },
  },
  lose_belly: {
    beginner: {
      titulo: 'Perder Barriga — Iniciante',
      resumo: 'Core + cardio para eliminar gordura visceral.',
      treinos: [
        { dia: 'Segunda', foco: 'Core + Cardio', local: '🏠 Casa', exercicios: [
          { nome: 'Jumping Jack',     series: 3, repeticoes: '40', descanso: '30s', dica: 'Cardio para elevar metabolismo.',  musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 3, repeticoes: '20', descanso: '30s', dica: 'Core firme.',                      musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '20', descanso: '30s', dica: 'Expire ao contrair.',              musculos: ['Core'] },
          { nome: 'Prancha',          series: 4, repeticoes: '30s',descanso: '30s', dica: 'Contraia o abdômen.',              musculos: ['Core'] },
          { nome: 'Burpee',           series: 3, repeticoes: '8',  descanso: '40s', dica: 'Composto para queima total.',      musculos: ['Full Body'] },
        ]},
        { dia: 'Quarta', foco: 'HIIT + Abdômen', local: '🏠 Casa', exercicios: [
          { nome: 'Burpee',           series: 4, repeticoes: '10', descanso: '35s', dica: 'Explosão máxima.',                 musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 4, repeticoes: '25', descanso: '20s', dica: 'Core sempre firme.',               musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 5, repeticoes: '25', descanso: '25s', dica: 'Oblíquos: cintura afina.',         musculos: ['Core'] },
          { nome: 'Prancha',          series: 4, repeticoes: '40s',descanso: '25s', dica: 'Não deixar quadril cair.',         musculos: ['Core'] },
          { nome: 'Agachamento',      series: 3, repeticoes: '15', descanso: '40s', dica: 'Grupos grandes queimam mais.',     musculos: ['Pernas', 'Glúteo'] },
        ]},
        { dia: 'Sexta', foco: 'Full Body + Core', local: '🏠 Casa', exercicios: [
          { nome: 'Flexão',           series: 3, repeticoes: '10', descanso: '45s', dica: 'Core ativado.',                   musculos: ['Peito', 'Tríceps', 'Core'] },
          { nome: 'Agachamento',      series: 3, repeticoes: '15', descanso: '45s', dica: 'Pernas = metabolismo.',            musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Prancha',          series: 4, repeticoes: '40s',descanso: '25s', dica: 'Não soltar.',                     musculos: ['Core'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '25', descanso: '25s', dica: 'Lento para mais tensão.',         musculos: ['Core'] },
          { nome: 'Mountain Climber', series: 3, repeticoes: '25', descanso: '25s', dica: 'Finalização intensa.',            musculos: ['Core', 'Full Body'] },
        ]},
        { dia: 'Sábado', foco: 'Cardio + Core', local: '🏠 Casa', exercicios: [
          { nome: 'Jumping Jack',     series: 4, repeticoes: '50', descanso: '20s', dica: 'FC elevada.',                     musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 4, repeticoes: '25', descanso: '25s', dica: 'Ritmo constante.',                musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '25', descanso: '25s', dica: 'Oblíquos são chave.',             musculos: ['Core'] },
          { nome: 'Prancha',          series: 4, repeticoes: '35s',descanso: '25s', dica: 'Finalize forte.',                 musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '1.500–1.700 kcal', proteina: '120–140g', carboidrato: '150–170g', gordura: '45–60g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: 'Omelete 3 ovos + salada de frutas + chá verde' },
          { horario: '10:00', nome: 'Lanche',        exemplo: 'Iogurte grego + chia + 1 fruta' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '150g frango + legumes + arroz integral pequeno' },
          { horario: '16:00', nome: 'Pré-treino',    exemplo: 'Banana + café sem açúcar' },
          { horario: '20:00', nome: 'Jantar',        exemplo: 'Sopa de legumes com frango + pão integral' },
        ],
      },
      dicas: [
        'Elimine açúcar, farinha branca e álcool.',
        'Não existe redução localizada — déficit + cardio.',
        'Chá verde antes do treino acelera a queima.',
        'Reduza sódio: retém líquido.',
      ],
    },
    intermediate: {
      titulo: 'Perder Barriga — Intermediário',
      resumo: 'Core avançado + academia para definição abdominal.',
      treinos: [
        { dia: 'Segunda', foco: 'Core + Upper', local: '🏋️ Academia', exercicios: [
          { nome: 'Supino Reto',      series: 3, repeticoes: '12', descanso: '75s', dica: 'Core firme.',     musculos: ['Peito', 'Tríceps'] },
          { nome: 'Puxada Alta',      series: 3, repeticoes: '12', descanso: '75s', dica: 'Costas fortes.',  musculos: ['Costas', 'Bíceps'] },
          { nome: 'Prancha',          series: 5, repeticoes: '60s',descanso: '20s', dica: 'Máximo.',         musculos: ['Core'] },
          { nome: 'Abdominal',        series: 5, repeticoes: '30', descanso: '20s', dica: 'Lento.',          musculos: ['Core'] },
          { nome: 'Mountain Climber', series: 5, repeticoes: '30', descanso: '20s', dica: 'Velocidade.',     musculos: ['Core', 'Full Body'] },
        ]},
        { dia: 'Quarta', foco: 'Pernas + HIIT', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 4, repeticoes: '15', descanso: '60s', dica: 'Volume.',    musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Hip Thrust',       series: 4, repeticoes: '20', descanso: '60s', dica: 'Glúteo.',         musculos: ['Glúteo', 'Pernas'] },
          { nome: 'Burpee',           series: 5, repeticoes: '12', descanso: '20s', dica: 'Sprint.',         musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 5, repeticoes: '35', descanso: '15s', dica: 'Core firme.',     musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '30', descanso: '20s', dica: 'Core final.',     musculos: ['Core'] },
        ]},
        { dia: 'Sexta', foco: 'Full Body Definição', local: '🏋️ Academia', exercicios: [
          { nome: 'Remada Curvada',   series: 3, repeticoes: '12', descanso: '75s', dica: 'Costas.',         musculos: ['Costas', 'Bíceps'] },
          { nome: 'Desenvolvimento',  series: 3, repeticoes: '12', descanso: '60s', dica: 'Ombros.',         musculos: ['Ombros'] },
          { nome: 'Prancha',          series: 5, repeticoes: '60s',descanso: '20s', dica: 'Core.',           musculos: ['Core'] },
          { nome: 'Abdominal',        series: 5, repeticoes: '30', descanso: '20s', dica: 'Oblíquos.',       musculos: ['Core'] },
          { nome: 'Burpee',           series: 4, repeticoes: '12', descanso: '25s', dica: 'Composto.',       musculos: ['Full Body'] },
        ]},
        { dia: 'Sábado', foco: 'Circuito Core', local: '🏠 Casa', exercicios: [
          { nome: 'Mountain Climber', series: 5, repeticoes: '35', descanso: '15s', dica: 'Abertura.',       musculos: ['Core', 'Full Body'] },
          { nome: 'Burpee',           series: 5, repeticoes: '12', descanso: '20s', dica: 'Potência.',       musculos: ['Full Body'] },
          { nome: 'Abdominal',        series: 5, repeticoes: '30', descanso: '15s', dica: 'Sem pausa.',      musculos: ['Core'] },
          { nome: 'Prancha',          series: 4, repeticoes: '60s',descanso: '20s', dica: 'Finalização.',    musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '1.700–1.900 kcal', proteina: '140–160g', carboidrato: '170–190g', gordura: '50–65g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: '4 ovos + espinafre + café verde' },
          { horario: '10:00', nome: 'Lanche',        exemplo: '30g whey + água de coco + fruta' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '200g frango + salada grande + quinoa' },
          { horario: '16:30', nome: 'Pré-treino',    exemplo: 'Banana + café + amêndoas' },
          { horario: '20:00', nome: 'Jantar',        exemplo: '200g peixe + legumes + azeite' },
        ],
      },
      dicas: [
        'Jejum 16:8 acelera perda de gordura abdominal.',
        'Estresse = cortisol = gordura na barriga.',
        'Carbo simples só no pré-treino.',
        'Gengibre e canela reduzem inflamação.',
      ],
    },
    advanced: {
      titulo: 'Perder Barriga — Avançado',
      resumo: 'Alta densidade para definição abdominal máxima.',
      treinos: [
        { dia: 'Segunda', foco: 'Core Elite', local: '🏋️ Academia', exercicios: [
          { nome: 'Prancha',          series: 6, repeticoes: '75s', descanso: '15s', dica: 'Corpo rígido.',  musculos: ['Core'] },
          { nome: 'Abdominal',        series: 6, repeticoes: '35',  descanso: '15s', dica: '3s por rep.',    musculos: ['Core'] },
          { nome: 'Mountain Climber', series: 5, repeticoes: '40',  descanso: '10s', dica: 'Máxima veloc.',  musculos: ['Core', 'Full Body'] },
          { nome: 'Supino Reto',      series: 4, repeticoes: '10',  descanso: '75s', dica: 'Core ativo.',    musculos: ['Peito', 'Tríceps'] },
          { nome: 'Burpee',           series: 5, repeticoes: '15',  descanso: '15s', dica: 'Sem pausa.',     musculos: ['Full Body'] },
        ]},
        { dia: 'Terça', foco: 'Pernas + HIIT', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 5, repeticoes: '15', descanso: '60s', dica: 'Volume.',   musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Leg Press',        series: 5, repeticoes: '20',  descanso: '60s', dica: 'Drop set.',      musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Hip Thrust',       series: 5, repeticoes: '25',  descanso: '60s', dica: 'Pausa 3s.',      musculos: ['Glúteo', 'Pernas'] },
          { nome: 'Burpee',           series: 6, repeticoes: '15',  descanso: '15s', dica: 'Mínimo.',        musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 5, repeticoes: '40',  descanso: '10s', dica: 'Joelhos.',       musculos: ['Core', 'Full Body'] },
        ]},
        { dia: 'Quinta', foco: 'Full Body Definição', local: '🏋️ Academia', exercicios: [
          { nome: 'Remada Curvada',   series: 5, repeticoes: '10',  descanso: '75s', dica: 'Costas.',        musculos: ['Costas', 'Bíceps'] },
          { nome: 'Supino Inclinado', series: 5, repeticoes: '10',  descanso: '75s', dica: 'Peitoral.',      musculos: ['Peito', 'Ombros'] },
          { nome: 'Desenvolvimento',  series: 4, repeticoes: '12',  descanso: '60s', dica: 'Ombros.',        musculos: ['Ombros'] },
          { nome: 'Abdominal',        series: 6, repeticoes: '30',  descanso: '15s', dica: 'Sem pausa.',     musculos: ['Core'] },
          { nome: 'Prancha',          series: 5, repeticoes: '75s', descanso: '15s', dica: 'Rígido.',        musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'Circuito Sem Pausa', local: '🏠 Casa', exercicios: [
          { nome: 'Mountain Climber', series: 6, repeticoes: '40',  descanso: '10s', dica: 'Explosão.',      musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 6, repeticoes: '35',  descanso: '10s', dica: 'Oblíquos.',      musculos: ['Core'] },
          { nome: 'Burpee',           series: 5, repeticoes: '15',  descanso: '15s', dica: 'Total.',         musculos: ['Full Body'] },
          { nome: 'Prancha',          series: 5, repeticoes: '75s', descanso: '15s', dica: 'Encerramento.',  musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '1.900–2.100 kcal', proteina: '160–180g', carboidrato: '185–210g', gordura: '55–70g',
        refeicoes: [
          { horario: '08:00', nome: 'Quebrar Jejum', exemplo: '4 ovos + abacate + chá verde (após 16h jejum)' },
          { horario: '12:00', nome: 'Almoço',        exemplo: '220g frango + brócolis + quinoa + azeite' },
          { horario: '15:00', nome: 'Lanche',        exemplo: '30g whey + amêndoas + café' },
          { horario: '17:30', nome: 'Pré-treino',    exemplo: 'Banana + cafeína natural' },
          { horario: '20:30', nome: 'Jantar',        exemplo: '200g peixe + aspargos + cenoura + azeite' },
        ],
      },
      dicas: [
        'Jejum 16h ativa autofagia e queima visceral.',
        'Álcool inibe oxidação de gordura por 24h.',
        'Rastreie cintura semanal.',
        'Gengibre, pimenta caiena e chá verde antes do treino.',
      ],
    },
  },
  endurance: {
    beginner: {
      titulo: 'Resistência — Iniciante',
      resumo: 'Base cardiovascular com progressão gradual.',
      treinos: [
        { dia: 'Segunda', foco: 'Cardio Base', local: '🏠 Casa', exercicios: [
          { nome: 'Jumping Jack',     series: 5, repeticoes: '40', descanso: '30s', dica: 'Ritmo de conversa.',   musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 3, repeticoes: '20', descanso: '40s', dica: 'Aeróbico com core.',   musculos: ['Core', 'Full Body'] },
          { nome: 'Agachamento',      series: 3, repeticoes: '15', descanso: '45s', dica: 'Resistência.',         musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Flexão',           series: 3, repeticoes: '10', descanso: '45s', dica: 'Sustentação.',         musculos: ['Peito', 'Tríceps'] },
          { nome: 'Prancha',          series: 3, repeticoes: '30s',descanso: '30s', dica: 'Base.',                musculos: ['Core'] },
        ]},
        { dia: 'Quarta', foco: 'Intervalado', local: '🏠 Casa', exercicios: [
          { nome: 'Burpee',           series: 3, repeticoes: '8',  descanso: '45s', dica: 'Completar sem parar.', musculos: ['Full Body'] },
          { nome: 'Jumping Jack',     series: 6, repeticoes: '45s',descanso: '15s', dica: 'Intervalo 3:1.',       musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 4, repeticoes: '20', descanso: '30s', dica: 'Core firme.',          musculos: ['Core', 'Full Body'] },
          { nome: 'Agachamento',      series: 3, repeticoes: '20', descanso: '40s', dica: 'Resistência.',         musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Abdominal',        series: 3, repeticoes: '20', descanso: '30s', dica: 'Core.',                musculos: ['Core'] },
        ]},
        { dia: 'Sexta', foco: 'Full Body Resistência', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 3, repeticoes: '15', descanso: '60s', dica: 'Pernas fortes.',  musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Puxada Alta',      series: 3, repeticoes: '12', descanso: '60s', dica: 'Costas.',              musculos: ['Costas', 'Bíceps'] },
          { nome: 'Flexão',           series: 3, repeticoes: '12', descanso: '45s', dica: 'Sustentação.',         musculos: ['Peito', 'Tríceps'] },
          { nome: 'Prancha',          series: 4, repeticoes: '35s',descanso: '30s', dica: 'Core.',                musculos: ['Core'] },
          { nome: 'Burpee',           series: 3, repeticoes: '10', descanso: '35s', dica: 'Cardio final.',        musculos: ['Full Body'] },
        ]},
        { dia: 'Sábado', foco: 'Circuito', local: '🏠 Casa', exercicios: [
          { nome: 'Jumping Jack',     series: 4, repeticoes: '50', descanso: '20s', dica: 'Aeróbico.',            musculos: ['Full Body'] },
          { nome: 'Agachamento',      series: 3, repeticoes: '20', descanso: '30s', dica: 'Sem pausa.',           musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Mountain Climber', series: 3, repeticoes: '25', descanso: '20s', dica: 'Constante.',           musculos: ['Core', 'Full Body'] },
          { nome: 'Abdominal',        series: 3, repeticoes: '20', descanso: '25s', dica: 'Core.',                musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '2.000–2.200 kcal', proteina: '130–150g', carboidrato: '250–280g', gordura: '60–75g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: 'Aveia 60g + banana + mel + leite + 2 ovos' },
          { horario: '10:00', nome: 'Lanche',        exemplo: 'Tapioca com atum + suco natural' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '150g frango + arroz + feijão + legumes' },
          { horario: '16:00', nome: 'Pré-treino',    exemplo: '2 bananas + mel + água de coco' },
          { horario: '20:00', nome: 'Jantar',        exemplo: '150g proteína magra + batata + verduras' },
        ],
      },
      dicas: [
        'Carboidratos são o combustível — não elimine.',
        '500ml antes do treino, 200ml a cada 20min.',
        'Aumente volume no máximo 10%/semana.',
        '8–9h de sono para atletas de resistência.',
      ],
    },
    intermediate: {
      titulo: 'Resistência — Intermediário',
      resumo: 'HIIT e força-resistência para elevar VO2 máximo.',
      treinos: [
        { dia: 'Segunda', foco: 'HIIT + Força', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 5, repeticoes: '15', descanso: '60s', dica: 'Volume.',          musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Leg Press',        series: 4, repeticoes: '20', descanso: '60s', dica: 'Resistência.',          musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Burpee',           series: 5, repeticoes: '12', descanso: '25s', dica: 'Máxima intensidade.',   musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 5, repeticoes: '30', descanso: '20s', dica: 'Velocidade.',           musculos: ['Core', 'Full Body'] },
          { nome: 'Jumping Jack',     series: 4, repeticoes: '60s',descanso: '15s', dica: 'FC no limite.',         musculos: ['Full Body'] },
        ]},
        { dia: 'Quarta', foco: 'Upper Resistência', local: '🏋️ Academia', exercicios: [
          { nome: 'Puxada Alta',      series: 5, repeticoes: '15', descanso: '60s', dica: 'Costas resistentes.',   musculos: ['Costas', 'Bíceps'] },
          { nome: 'Supino Reto',      series: 5, repeticoes: '15', descanso: '60s', dica: 'Peito.',               musculos: ['Peito', 'Tríceps'] },
          { nome: 'Remada Curvada',   series: 4, repeticoes: '15', descanso: '60s', dica: 'Total.',               musculos: ['Costas', 'Bíceps'] },
          { nome: 'Desenvolvimento',  series: 4, repeticoes: '15', descanso: '60s', dica: 'Ombros.',              musculos: ['Ombros'] },
          { nome: 'Prancha',          series: 5, repeticoes: '60s',descanso: '20s', dica: 'Core = motor.',        musculos: ['Core'] },
        ]},
        { dia: 'Quinta', foco: 'Intervalo Intenso', local: '🏠 Casa', exercicios: [
          { nome: 'Burpee',           series: 6, repeticoes: '12', descanso: '20s', dica: 'Tabata.',              musculos: ['Full Body'] },
          { nome: 'Jumping Jack',     series: 6, repeticoes: '60s',descanso: '10s', dica: 'FC máxima.',           musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 5, repeticoes: '40', descanso: '15s', dica: 'Não pare.',            musculos: ['Core', 'Full Body'] },
          { nome: 'Agachamento',      series: 5, repeticoes: '25', descanso: '20s', dica: 'Salto.',               musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Abdominal',        series: 4, repeticoes: '25', descanso: '20s', dica: 'Core.',                musculos: ['Core'] },
        ]},
        { dia: 'Sábado', foco: 'Full Body Volume', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 5, repeticoes: '20', descanso: '60s', dica: 'Pernas.',         musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Puxada Alta',      series: 5, repeticoes: '15', descanso: '60s', dica: 'Costas.',              musculos: ['Costas', 'Bíceps'] },
          { nome: 'Burpee',           series: 5, repeticoes: '12', descanso: '20s', dica: 'Total.',               musculos: ['Full Body'] },
          { nome: 'Prancha',          series: 4, repeticoes: '60s',descanso: '20s', dica: 'Core.',                musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '2.400–2.700 kcal', proteina: '150–170g', carboidrato: '300–340g', gordura: '65–80g',
        refeicoes: [
          { horario: '07:00', nome: 'Café da Manhã', exemplo: 'Aveia 80g + whey + banana + mel + amendoim' },
          { horario: '10:00', nome: 'Lanche',        exemplo: 'Tapioca + frango + suco natural' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '200g frango + arroz + batata + salada' },
          { horario: '16:00', nome: 'Pré-treino',    exemplo: '2 bananas + mel + gel de carbo' },
          { horario: '20:30', nome: 'Jantar',        exemplo: '200g proteína + macarrão + legumes' },
        ],
      },
      dicas: [
        'Zona 2 (60–70% FC máx) por 40min — base aeróbia.',
        'Carbo rápido para treinos acima de 60min.',
        'FC de repouso caindo = resistência melhorando.',
        'Recuperação ativa nos dias de descanso.',
      ],
    },
    advanced: {
      titulo: 'Resistência Elite — Avançado',
      resumo: 'Condicionamento máximo com Tabata para atletas.',
      treinos: [
        { dia: 'Segunda', foco: 'VO2 Máx', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 6, repeticoes: '20', descanso: '45s', dica: 'Volume.',          musculos: ['Pernas', 'Glúteo', 'Core'] },
          { nome: 'Leg Press',        series: 5, repeticoes: '25', descanso: '45s', dica: 'Resistência.',          musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Burpee',           series: 7, repeticoes: '15', descanso: '15s', dica: 'Potência máxima.',      musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 6, repeticoes: '45', descanso: '10s', dica: 'Sem pausa.',            musculos: ['Core', 'Full Body'] },
          { nome: 'Jumping Jack',     series: 5, repeticoes: '75s',descanso: '10s', dica: 'Explosivo.',            musculos: ['Full Body'] },
        ]},
        { dia: 'Terça', foco: 'Upper Força', local: '🏋️ Academia', exercicios: [
          { nome: 'Supino Reto',      series: 6, repeticoes: '15', descanso: '60s', dica: 'Volume.',               musculos: ['Peito', 'Tríceps'] },
          { nome: 'Puxada Alta',      series: 6, repeticoes: '15', descanso: '60s', dica: 'Costas.',               musculos: ['Costas', 'Bíceps'] },
          { nome: 'Remada Curvada',   series: 5, repeticoes: '15', descanso: '60s', dica: 'Total.',                musculos: ['Costas', 'Bíceps'] },
          { nome: 'Desenvolvimento',  series: 5, repeticoes: '15', descanso: '60s', dica: 'Ombros.',               musculos: ['Ombros'] },
          { nome: 'Prancha',          series: 5, repeticoes: '90s',descanso: '15s', dica: 'Core de aço.',          musculos: ['Core'] },
        ]},
        { dia: 'Quinta', foco: 'Tabata Supremo', local: '🏠 Casa', exercicios: [
          { nome: 'Burpee',           series: 8, repeticoes: '20s/10s', descanso: '2min', dica: 'Tabata clássico.', musculos: ['Full Body'] },
          { nome: 'Mountain Climber', series: 8, repeticoes: '20s/10s', descanso: '2min', dica: '2ª rodada.',       musculos: ['Core', 'Full Body'] },
          { nome: 'Jumping Jack',     series: 8, repeticoes: '20s/10s', descanso: '2min', dica: '3ª rodada.',       musculos: ['Full Body'] },
          { nome: 'Agachamento',      series: 8, repeticoes: '20s/10s', descanso: 'Fim',  dica: '4ª rodada.',       musculos: ['Pernas', 'Glúteo'] },
        ]},
        { dia: 'Sábado', foco: 'Full Body Elite', local: '🏋️ Academia', exercicios: [
          { nome: 'Agachamento com Barra', series: 6, repeticoes: '20', descanso: '30s', dica: 'Fôlego.',          musculos: ['Pernas', 'Glúteo'] },
          { nome: 'Puxada Alta',      series: 5, repeticoes: '15', descanso: '30s', dica: 'Costas.',               musculos: ['Costas', 'Bíceps'] },
          { nome: 'Burpee',           series: 6, repeticoes: '15', descanso: '15s', dica: 'Total.',                musculos: ['Full Body'] },
          { nome: 'Prancha',          series: 5, repeticoes: '90s',descanso: '15s', dica: 'Core final.',           musculos: ['Core'] },
        ]},
      ],
      alimentacao: {
        calorias: '2.800–3.200 kcal', proteina: '160–190g', carboidrato: '360–400g', gordura: '70–90g',
        refeicoes: [
          { horario: '06:30', nome: 'Pré-Treino',    exemplo: 'Aveia 100g + banana + mel + café forte' },
          { horario: '09:00', nome: 'Pós-Treino',    exemplo: '40g whey + 50g maltodextrina + eletrólitos' },
          { horario: '13:00', nome: 'Almoço',        exemplo: '250g frango + arroz + feijão + batata + verduras' },
          { horario: '16:30', nome: 'Lanche',        exemplo: 'Pão integral + atum + suco + castanhas' },
          { horario: '20:30', nome: 'Jantar',        exemplo: '250g proteína + macarrão + legumes + azeite' },
        ],
      },
      dicas: [
        '3 semanas intensas + 1 recuperação ativa.',
        'Eletrólitos para treinos longos.',
        'Beta-alanina e cafeína comprovados.',
        'Pace negativo: começa devagar, acelera no final.',
      ],
    },
  },
};

export function getPlan(goals, level) {
  const lv = level || 'beginner';
  const primary = goals[0];
  return PLANS[primary]?.[lv] || PLANS.lose_weight[lv];
}
