export const MUSCLE_GROUPS = [
  { id: 'all',     label: 'Todos',    icon: '⚡' },
  { id: 'peito',   label: 'Peito',    icon: '💪' },
  { id: 'costas',  label: 'Costas',   icon: '🔙' },
  { id: 'ombros',  label: 'Ombros',   icon: '🏋️' },
  { id: 'biceps',  label: 'Bíceps',   icon: '💪' },
  { id: 'triceps', label: 'Tríceps',  icon: '💪' },
  { id: 'pernas',  label: 'Pernas',   icon: '🦵' },
  { id: 'gluteo',  label: 'Glúteo',   icon: '🍑' },
  { id: 'core',    label: 'Core',     icon: '🔥' },
  { id: 'cardio',  label: 'Cardio',   icon: '❤️' },
];

export const EQUIPMENT_TYPES = [
  { id: 'all',     label: 'Todos'       },
  { id: 'barra',   label: 'Barra'       },
  { id: 'halter',  label: 'Halteres'    },
  { id: 'maquina', label: 'Máquina'     },
  { id: 'cabo',    label: 'Cabo/Polia'  },
  { id: 'corpo',   label: 'Peso Corporal'},
];

export const EXERCISES = [
  // PEITO
  { id:1,  nome:'Supino Reto com Barra',       musculo:'peito',   secundarios:['Tríceps','Ombros'],  equipamento:'barra',   nivel:'intermediario', instrucao:'Deite no banco, desça a barra até o peito e empurre para cima. Descida lenta 3s, subida explosiva.', search:'bench press barbell chest' },
  { id:2,  nome:'Supino Inclinado com Barra',  musculo:'peito',   secundarios:['Tríceps','Ombros'],  equipamento:'barra',   nivel:'intermediario', instrucao:'Banco inclinado 30-45°. Foca na parte superior do peitoral.', search:'incline bench press barbell' },
  { id:3,  nome:'Supino Declinado',            musculo:'peito',   secundarios:['Tríceps'],           equipamento:'barra',   nivel:'intermediario', instrucao:'Banco declinado. Ativa a parte inferior do peitoral.', search:'decline bench press' },
  { id:4,  nome:'Supino com Halteres',         musculo:'peito',   secundarios:['Tríceps','Ombros'],  equipamento:'halter',  nivel:'iniciante',     instrucao:'Amplitude maior que com barra. Mantém os cotovelos levemente dobrados.', search:'dumbbell bench press chest' },
  { id:5,  nome:'Crucifixo',                   musculo:'peito',   secundarios:[],                    equipamento:'halter',  nivel:'intermediario', instrucao:'Braços abertos em arco. Sente o alongamento no peitoral. Não trave os cotovelos.', search:'dumbbell fly chest exercise' },
  { id:6,  nome:'Crucifixo Inclinado',         musculo:'peito',   secundarios:['Ombros'],            equipamento:'halter',  nivel:'intermediario', instrucao:'Mesmo do crucifixo com banco inclinado. Foca no peitoral superior.', search:'incline dumbbell fly chest' },
  { id:7,  nome:'Crossover no Cabo',           musculo:'peito',   secundarios:[],                    equipamento:'cabo',    nivel:'intermediario', instrucao:'Polia alta. Puxe os cabos cruzando na frente. Ótimo para definição.', search:'cable crossover chest fly' },
  { id:8,  nome:'Flexão de Braço',             musculo:'peito',   secundarios:['Tríceps','Core'],    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Corpo reto, desça até o peito quase tocar o chão. Cotovelos a 45° do corpo.', search:'push up exercise chest' },
  { id:9,  nome:'Flexão Inclinada',            musculo:'peito',   secundarios:['Tríceps'],           equipamento:'corpo',   nivel:'iniciante',     instrucao:'Mãos em superfície elevada. Ativa a parte inferior do peitoral.', search:'incline push up chest' },
  { id:10, nome:'Flexão Declinada',            musculo:'peito',   secundarios:['Ombros'],            equipamento:'corpo',   nivel:'intermediario', instrucao:'Pés elevados. Ativa a parte superior do peitoral.', search:'decline push up chest' },
  { id:11, nome:'Flexão Diamante',             musculo:'peito',   secundarios:['Tríceps'],           equipamento:'corpo',   nivel:'intermediario', instrucao:'Mãos formam diamante. Foco no peitoral medial e tríceps.', search:'diamond push up triceps' },
  { id:12, nome:'Peck Deck (Borboleta)',        musculo:'peito',   secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Máquina de voador. Junte os braços na frente. Ótima para iniciantes.', search:'pec deck machine chest fly' },

  // COSTAS
  { id:20, nome:'Puxada Alta Pegada Aberta',   musculo:'costas',  secundarios:['Bíceps'],            equipamento:'maquina', nivel:'iniciante',     instrucao:'Puxe a barra até o queixo. Cotovelos apontam para baixo. Não balance o tronco.', search:'lat pulldown wide grip back' },
  { id:21, nome:'Puxada Alta Pegada Fechada',  musculo:'costas',  secundarios:['Bíceps'],            equipamento:'maquina', nivel:'iniciante',     instrucao:'Pegada supinada estreita. Maior amplitude de movimento.', search:'lat pulldown close grip' },
  { id:22, nome:'Remada Curvada com Barra',    musculo:'costas',  secundarios:['Bíceps','Lombar'],   equipamento:'barra',   nivel:'intermediario', instrucao:'Tronco a 45°, core ativado. Puxe até o umbigo. Um dos melhores para costas.', search:'barbell bent over row back' },
  { id:23, nome:'Remada Unilateral',           musculo:'costas',  secundarios:['Bíceps'],            equipamento:'halter',  nivel:'iniciante',     instrucao:'Apoie um joelho no banco. Puxe o halter até o quadril.', search:'dumbbell single arm row back' },
  { id:24, nome:'Remada Baixa no Cabo',        musculo:'costas',  secundarios:['Bíceps'],            equipamento:'cabo',    nivel:'iniciante',     instrucao:'Polia baixa. Puxe em direção ao abdômen. Costas retas.', search:'seated cable row back exercise' },
  { id:25, nome:'Pullover com Halter',         musculo:'costas',  secundarios:['Peito','Tríceps'],   equipamento:'halter',  nivel:'intermediario', instrucao:'Deitado no banco. Desça o halter atrás da cabeça. Trabalha o serrátil.', search:'dumbbell pullover back exercise' },
  { id:26, nome:'Levantamento Terra',          musculo:'costas',  secundarios:['Pernas','Glúteo'],   equipamento:'barra',   nivel:'avancado',      instrucao:'Costas neutras, barra rente ao corpo. Explosão nos quadris. Rei dos exercícios.', search:'deadlift barbell back' },
  { id:27, nome:'Stiff / Terra Romeno',        musculo:'costas',  secundarios:['Pernas','Glúteo'],   equipamento:'barra',   nivel:'intermediario', instrucao:'Pernas semiflexionadas. Desça sentindo o alongamento nos isquiotibiais.', search:'romanian deadlift stiff leg' },
  { id:28, nome:'Barra Fixa',                  musculo:'costas',  secundarios:['Bíceps'],            equipamento:'corpo',   nivel:'avancado',      instrucao:'Pegada pronada larga. Suba até o queixo passar da barra.', search:'pull up back exercise' },
  { id:29, nome:'Remada Cavalinho',            musculo:'costas',  secundarios:['Ombros'],            equipamento:'barra',   nivel:'intermediario', instrucao:'Puxe verticalmente. Ativa trapézio e romboides.', search:'upright row barbell trapezius' },
  { id:30, nome:'Hiperextensão Lombar',        musculo:'costas',  secundarios:['Glúteo'],            equipamento:'maquina', nivel:'iniciante',     instrucao:'Cadeira de hiperextensão. Sobe o tronco até ficar alinhado.', search:'back extension hyperextension lower back' },

  // OMBROS
  { id:40, nome:'Desenvolvimento com Barra',   musculo:'ombros',  secundarios:['Tríceps'],           equipamento:'barra',   nivel:'intermediario', instrucao:'Em pé ou sentado. Empurre a barra acima da cabeça. Não hiperestenda a lombar.', search:'overhead press barbell shoulder' },
  { id:41, nome:'Desenvolvimento com Halteres',musculo:'ombros',  secundarios:['Tríceps'],           equipamento:'halter',  nivel:'iniciante',     instrucao:'Maior amplitude e equilíbrio muscular. Ótimo para começar.', search:'dumbbell shoulder press' },
  { id:42, nome:'Elevação Lateral',            musculo:'ombros',  secundarios:[],                    equipamento:'halter',  nivel:'iniciante',     instrucao:'Braços levemente dobrados. Eleve até a altura dos ombros.', search:'lateral raise dumbbell shoulder' },
  { id:43, nome:'Elevação Frontal',            musculo:'ombros',  secundarios:[],                    equipamento:'halter',  nivel:'iniciante',     instrucao:'Eleve à frente até a altura dos ombros. Deltóide anterior.', search:'front raise dumbbell shoulder' },
  { id:44, nome:'Encolhimento de Ombros',      musculo:'ombros',  secundarios:[],                    equipamento:'halter',  nivel:'iniciante',     instrucao:'Eleve os ombros em direção às orelhas. Pausa no topo.', search:'dumbbell shrug trapezius' },
  { id:45, nome:'Pássaro (Crucifixo Inv.)',    musculo:'ombros',  secundarios:['Costas'],            equipamento:'halter',  nivel:'intermediario', instrucao:'Inclinado para frente. Eleve os braços para os lados. Deltóide posterior.', search:'rear delt fly bent over dumbbell' },
  { id:46, nome:'Elevação Lateral no Cabo',    musculo:'ombros',  secundarios:[],                    equipamento:'cabo',    nivel:'intermediario', instrucao:'Tensão constante durante todo o movimento. Mais eficaz que halteres.', search:'cable lateral raise shoulder' },
  { id:47, nome:'Arnold Press',                musculo:'ombros',  secundarios:['Tríceps'],           equipamento:'halter',  nivel:'intermediario', instrucao:'Inicia com palmas para você, rotaciona durante o movimento.', search:'arnold press dumbbell shoulder' },
  { id:48, nome:'Face Pull no Cabo',           musculo:'ombros',  secundarios:['Costas'],            equipamento:'cabo',    nivel:'iniciante',     instrucao:'Polia alta com corda. Puxe em direção ao rosto. Ótimo para saúde dos ombros.', search:'face pull cable rear delt' },

  // BÍCEPS
  { id:60, nome:'Rosca Direta com Barra',      musculo:'biceps',  secundarios:[],                    equipamento:'barra',   nivel:'iniciante',     instrucao:'Cotovelos fixos ao lado do corpo. Amplitude completa. Não embale o tronco.', search:'barbell bicep curl' },
  { id:61, nome:'Rosca Alternada',             musculo:'biceps',  secundarios:[],                    equipamento:'halter',  nivel:'iniciante',     instrucao:'Um braço de cada vez. Supinação completa no topo.', search:'alternating dumbbell curl bicep' },
  { id:62, nome:'Rosca Martelo',               musculo:'biceps',  secundarios:['Antebraço'],         equipamento:'halter',  nivel:'iniciante',     instrucao:'Polegar para cima. Trabalha bíceps braquial e braquiorradial.', search:'hammer curl dumbbell bicep' },
  { id:63, nome:'Rosca Concentrada',           musculo:'biceps',  secundarios:[],                    equipamento:'halter',  nivel:'iniciante',     instrucao:'Sentado, cotovelo apoiado na coxa. Máxima concentração no bíceps.', search:'concentration curl dumbbell bicep' },
  { id:64, nome:'Rosca Scott (Banco)',         musculo:'biceps',  secundarios:[],                    equipamento:'barra',   nivel:'intermediario', instrucao:'Apoio no banco Scott. Isola o bíceps eliminando o embalo.', search:'preacher curl scott bench bicep' },
  { id:65, nome:'Rosca no Cabo',               musculo:'biceps',  secundarios:[],                    equipamento:'cabo',    nivel:'iniciante',     instrucao:'Tensão constante durante todo o movimento.', search:'cable curl bicep exercise' },
  { id:66, nome:'Rosca Inversa',               musculo:'biceps',  secundarios:['Antebraço'],         equipamento:'barra',   nivel:'intermediario', instrucao:'Pegada pronada. Trabalha o braquiorradial e antebraço.', search:'reverse curl barbell forearm' },

  // TRÍCEPS
  { id:80, nome:'Tríceps Polia com Corda',     musculo:'triceps', secundarios:[],                    equipamento:'cabo',    nivel:'iniciante',     instrucao:'Cotovelo fixo. Extensão completa abrindo a corda no final.', search:'triceps pushdown rope cable' },
  { id:81, nome:'Tríceps Polia com Barra',     musculo:'triceps', secundarios:[],                    equipamento:'cabo',    nivel:'iniciante',     instrucao:'Barra reta ou V. Cotovelo fixo ao lado do corpo.', search:'triceps pushdown bar cable' },
  { id:82, nome:'Tríceps Testa',               musculo:'triceps', secundarios:[],                    equipamento:'barra',   nivel:'intermediario', instrucao:'Deitado, desça a barra até a testa. Cotovelos apontam para o teto.', search:'skull crusher triceps barbell' },
  { id:83, nome:'Tríceps Francês',             musculo:'triceps', secundarios:[],                    equipamento:'halter',  nivel:'intermediario', instrucao:'Em pé ou sentado. Desça o halter atrás da cabeça.', search:'overhead triceps extension dumbbell' },
  { id:84, nome:'Mergulho (Dips)',             musculo:'triceps', secundarios:['Peito'],             equipamento:'corpo',   nivel:'intermediario', instrucao:'Barras paralelas. Desça até 90°. Corpo vertical para focar no tríceps.', search:'dips triceps parallel bars' },
  { id:85, nome:'Tríceps no Banco',            musculo:'triceps', secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Mãos no banco atrás do corpo. Flexione os cotovelos descendo o quadril.', search:'bench dip triceps bodyweight' },
  { id:86, nome:'Tríceps Coice',               musculo:'triceps', secundarios:[],                    equipamento:'halter',  nivel:'iniciante',     instrucao:'Inclinado, cotovelo a 90°. Estique o braço para trás.', search:'triceps kickback dumbbell' },

  // PERNAS
  { id:100, nome:'Agachamento Livre',          musculo:'pernas',  secundarios:['Glúteo','Core'],     equipamento:'corpo',   nivel:'iniciante',     instrucao:'Pés na largura dos ombros. Desça até 90°. Joelhos atrás da ponta dos pés.', search:'bodyweight squat exercise legs' },
  { id:101, nome:'Agachamento com Barra',      musculo:'pernas',  secundarios:['Glúteo','Core'],     equipamento:'barra',   nivel:'intermediario', instrucao:'Profundidade abaixo do paralelo para máximo glúteo. Costas retas.', search:'barbell back squat legs' },
  { id:102, nome:'Leg Press 45°',              musculo:'pernas',  secundarios:['Glúteo'],            equipamento:'maquina', nivel:'iniciante',     instrucao:'Não trave o joelho no topo. Posição dos pés muda o foco muscular.', search:'leg press 45 machine legs' },
  { id:103, nome:'Agachamento Sumô',           musculo:'pernas',  secundarios:['Glúteo','Adutores'], equipamento:'halter',  nivel:'iniciante',     instrucao:'Pés abertos a 45°. Foca no glúteo médio e adutores.', search:'sumo squat dumbbell legs' },
  { id:104, nome:'Afundo (Lunge)',             musculo:'pernas',  secundarios:['Glúteo'],            equipamento:'corpo',   nivel:'iniciante',     instrucao:'Passo largo para frente. Joelho traseiro próximo ao chão.', search:'lunge exercise legs' },
  { id:105, nome:'Afundo Búlgaro',            musculo:'pernas',  secundarios:['Glúteo'],            equipamento:'halter',  nivel:'avancado',      instrucao:'Pé traseiro elevado no banco. Difícil e muito eficaz.', search:'bulgarian split squat dumbbell' },
  { id:106, nome:'Extensora',                  musculo:'pernas',  secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Isolamento do quadríceps. Extensão completa, pausa no topo.', search:'leg extension machine quadriceps' },
  { id:107, nome:'Mesa Flexora',               musculo:'pernas',  secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Isolamento dos isquiotibiais. Ótimo complemento à extensora.', search:'leg curl machine hamstring' },
  { id:108, nome:'Cadeira Adutora',            musculo:'pernas',  secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Fortalece os adutores (parte interna da coxa).', search:'inner thigh adductor machine' },
  { id:109, nome:'Cadeira Abdutora',           musculo:'pernas',  secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Fortalece os abdutores e glúteo médio.', search:'outer thigh abductor machine' },
  { id:110, nome:'Panturrilha em Pé',          musculo:'pernas',  secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Elevação dos calcanhares. Amplitude completa. Pausa no topo.', search:'standing calf raise machine' },
  { id:111, nome:'Panturrilha Sentado',        musculo:'pernas',  secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Trabalha o solear (músculo mais profundo da panturrilha).', search:'seated calf raise soleus' },
  { id:112, nome:'Stiff com Barra',            musculo:'pernas',  secundarios:['Glúteo','Costas'],   equipamento:'barra',   nivel:'intermediario', instrucao:'Pernas semiesticadas. Desça sentindo o alongamento nos isquiotibiais.', search:'stiff leg deadlift barbell hamstring' },

  // GLÚTEO
  { id:120, nome:'Hip Thrust com Barra',       musculo:'gluteo',  secundarios:['Pernas'],            equipamento:'barra',   nivel:'intermediario', instrucao:'Ombros no banco, barra no quadril. Empurre para cima. Pausa 2s no topo.', search:'barbell hip thrust glute' },
  { id:121, nome:'Elevação de Quadril',        musculo:'gluteo',  secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Deitado de costas. Eleve o quadril contraindo o glúteo.', search:'glute bridge bodyweight exercise' },
  { id:122, nome:'Coice no Cabo',              musculo:'gluteo',  secundarios:[],                    equipamento:'cabo',    nivel:'iniciante',     instrucao:'Polia baixa com tornozeleira. Extensão do quadril.', search:'cable kickback glute exercise' },
  { id:123, nome:'Coice com Halter',           musculo:'gluteo',  secundarios:[],                    equipamento:'halter',  nivel:'iniciante',     instrucao:'4 apoios. Halter na dobra do joelho. Extensão do quadril para cima.', search:'donkey kick glute exercise' },
  { id:124, nome:'Abdução no Cabo',            musculo:'gluteo',  secundarios:[],                    equipamento:'cabo',    nivel:'iniciante',     instrucao:'Polia baixa. Eleve a perna lateralmente. Glúteo médio.', search:'cable abduction glute medius' },
  { id:125, nome:'Step Up',                    musculo:'gluteo',  secundarios:['Pernas'],            equipamento:'corpo',   nivel:'iniciante',     instrucao:'Sobe no step com um pé. Empurra com o glúteo.', search:'step up box glute exercise' },
  { id:126, nome:'Agachamento no Smith',       musculo:'gluteo',  secundarios:['Pernas'],            equipamento:'maquina', nivel:'iniciante',     instrucao:'Máquina Smith. Pés à frente aumentam foco no glúteo.', search:'smith machine squat glute legs' },

  // CORE
  { id:140, nome:'Abdominal Crunch',           musculo:'core',    secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Contraia o abdômen, não puxe o pescoço. Expire na contração.', search:'crunch ab exercise core' },
  { id:141, nome:'Abdominal Bicicleta',        musculo:'core',    secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Cotovelo no joelho oposto. Rotação completa. Excelente para oblíquos.', search:'bicycle crunch abs oblique' },
  { id:142, nome:'Prancha',                    musculo:'core',    secundarios:['Ombros'],            equipamento:'corpo',   nivel:'iniciante',     instrucao:'Corpo rígido como prancha. Não deixe o quadril cair.', search:'plank exercise core abs' },
  { id:143, nome:'Prancha Lateral',            musculo:'core',    secundarios:['Ombros'],            equipamento:'corpo',   nivel:'iniciante',     instrucao:'Lateral no antebraço. Oblíquos ativados. Eleve o quadril.', search:'side plank oblique exercise' },
  { id:144, nome:'Mountain Climber',           musculo:'core',    secundarios:['Full Body'],         equipamento:'corpo',   nivel:'iniciante',     instrucao:'Posição de prancha. Alterne os joelhos em direção ao peito rapidamente.', search:'mountain climber core exercise' },
  { id:145, nome:'Elevação de Pernas',         musculo:'core',    secundarios:[],                    equipamento:'corpo',   nivel:'intermediario', instrucao:'Deitado, pernas retas. Eleve até 90°. Desça controlado.', search:'leg raise ab exercise core' },
  { id:146, nome:'Abdominal na Polia',         musculo:'core',    secundarios:[],                    equipamento:'cabo',    nivel:'intermediario', instrucao:'Polia alta. Ajoelhado, puxe em direção ao chão contraindo o abdômen.', search:'cable crunch abs kneeling' },
  { id:147, nome:'Russian Twist',              musculo:'core',    secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Sentado inclinado. Rotação lateral. Pode usar halter ou medicine ball.', search:'russian twist oblique exercise' },
  { id:148, nome:'Ab Wheel (Roda Abdominal)', musculo:'core',    secundarios:['Ombros','Costas'],   equipamento:'corpo',   nivel:'avancado',      instrucao:'Rola a roda para frente com core contraído. Muito desafiador.', search:'ab wheel rollout exercise core' },
  { id:149, nome:'Flexão de Quadril',          musculo:'core',    secundarios:[],                    equipamento:'maquina', nivel:'iniciante',     instrucao:'Máquina ou faixa elástica. Levanta o joelho em direção ao peito.', search:'hip flexor exercise machine' },

  // CARDIO
  { id:160, nome:'Burpee',                     musculo:'cardio',  secundarios:['Full Body'],         equipamento:'corpo',   nivel:'intermediario', instrucao:'Agacha, mãos no chão, joga as pernas, faz flexão, volta e salta. O mais completo.', search:'burpee exercise full body cardio' },
  { id:161, nome:'Jumping Jack',               musculo:'cardio',  secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Pernas e braços abrem e fecham. Ótimo aquecimento.', search:'jumping jacks exercise cardio' },
  { id:162, nome:'Agachamento com Salto',      musculo:'cardio',  secundarios:['Pernas','Glúteo'],   equipamento:'corpo',   nivel:'intermediario', instrucao:'Agachamento normal com salto explosivo no topo.', search:'jump squat plyometric exercise' },
  { id:163, nome:'Corrida no Lugar',           musculo:'cardio',  secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Corra no mesmo lugar elevando os joelhos ao máximo.', search:'high knees running in place cardio' },
  { id:164, nome:'Box Jump',                   musculo:'cardio',  secundarios:['Pernas','Glúteo'],   equipamento:'corpo',   nivel:'avancado',      instrucao:'Salto explosivo sobre o box. Aterrisse suavemente com joelhos dobrados.', search:'box jump plyometric cardio' },
  { id:165, nome:'Polichinelo',                musculo:'cardio',  secundarios:[],                    equipamento:'corpo',   nivel:'iniciante',     instrucao:'Variação do Jumping Jack. Excelente para aquecimento e cardio leve.', search:'jumping jacks cardio exercise' },
  { id:166, nome:'Skater Jump',                musculo:'cardio',  secundarios:['Pernas','Glúteo'],   equipamento:'corpo',   nivel:'intermediario', instrucao:'Saltos laterais alternando as pernas. Imita movimento do patinador.', search:'skater jump lateral plyometric' },
];

export default EXERCISES;
