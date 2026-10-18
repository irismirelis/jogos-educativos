// Quiz de História e Informática
// Iris Mirelis

const PERGUNTAS_POR_RODADA = 10;

// a resposta tem que estar escrita igual a uma das opções
const perguntas = [
  // História
  {
    tema: 'historia',
    pergunta: 'Em que ano o Brasil declarou sua independência?',
    opcoes: ['1500', '1822', '1888', '1889'],
    resposta: '1822',
    explicacao: 'Dom Pedro I declarou a independência em 7 de setembro de 1822.'
  },
  {
    tema: 'historia',
    pergunta: 'Quem assinou a Lei Áurea, que aboliu a escravidão no Brasil?',
    opcoes: ['Dom Pedro I', 'Princesa Isabel', 'Tiradentes', 'Getúlio Vargas'],
    resposta: 'Princesa Isabel',
    explicacao: 'A Lei Áurea foi assinada pela Princesa Isabel em 13 de maio de 1888.'
  },
  {
    tema: 'historia',
    pergunta: 'Em que ano foi proclamada a República no Brasil?',
    opcoes: ['1822', '1889', '1930', '1964'],
    resposta: '1889',
    explicacao: 'A República foi proclamada em 15 de novembro de 1889, pelo Marechal Deodoro da Fonseca.'
  },
  {
    tema: 'historia',
    pergunta: 'Qual é a capital do Brasil desde 1960?',
    opcoes: ['Rio de Janeiro', 'Salvador', 'Brasília', 'São Paulo'],
    resposta: 'Brasília',
    explicacao: 'Brasília foi inaugurada em 21 de abril de 1960.'
  },
  {
    tema: 'historia',
    pergunta: 'Qual foi a primeira capital do Brasil?',
    opcoes: ['Salvador', 'Rio de Janeiro', 'Recife', 'Brasília'],
    resposta: 'Salvador',
    explicacao: 'Salvador foi a capital de 1549 até 1763, quando a capital passou para o Rio de Janeiro.'
  },
  {
    tema: 'historia',
    pergunta: 'Qual povo antigo construiu as pirâmides de Gizé?',
    opcoes: ['Romanos', 'Gregos', 'Egípcios', 'Astecas'],
    resposta: 'Egípcios',
    explicacao: 'As pirâmides de Gizé foram construídas no Egito Antigo, há mais de 4.500 anos.'
  },
  {
    tema: 'historia',
    pergunta: 'Tiradentes foi um dos líderes de qual movimento?',
    opcoes: ['Inconfidência Mineira', 'Revolução Farroupilha', 'Cabanagem', 'Balaiada'],
    resposta: 'Inconfidência Mineira',
    explicacao: 'A Inconfidência Mineira, de 1789, foi um movimento contra o domínio e os altos impostos de Portugal.'
  },
  {
    tema: 'historia',
    pergunta: 'Em que ano a esquadra de Pedro Álvares Cabral chegou ao Brasil?',
    opcoes: ['1492', '1500', '1530', '1549'],
    resposta: '1500',
    explicacao: 'A esquadra chegou em 22 de abril de 1500, no litoral do atual estado da Bahia.'
  },
  {
    tema: 'historia',
    pergunta: 'Quem era o presidente do Brasil quando Brasília foi inaugurada?',
    opcoes: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Dom Pedro II', 'Tancredo Neves'],
    resposta: 'Juscelino Kubitschek',
    explicacao: 'Juscelino Kubitschek (JK) prometeu "50 anos em 5" e levou a capital para o Planalto Central.'
  },
  {
    tema: 'historia',
    pergunta: 'Quem foi o último imperador do Brasil?',
    opcoes: ['Dom Pedro I', 'Dom Pedro II', 'Dom João VI', 'Marechal Deodoro'],
    resposta: 'Dom Pedro II',
    explicacao: 'Dom Pedro II governou até 1889, quando a República foi proclamada.'
  },

  // Informática
  {
    tema: 'informatica',
    pergunta: 'Qual peça é considerada o "cérebro" do computador?',
    opcoes: ['Monitor', 'Processador (CPU)', 'Teclado', 'Impressora'],
    resposta: 'Processador (CPU)',
    explicacao: 'O processador faz os cálculos e executa as instruções dos programas.'
  },
  {
    tema: 'informatica',
    pergunta: 'Qual programa do Pacote Office é usado para criar planilhas?',
    opcoes: ['Word', 'Excel', 'PowerPoint', 'Outlook'],
    resposta: 'Excel',
    explicacao: 'No Excel organizamos dados em linhas e colunas e fazemos cálculos com fórmulas.'
  },
  {
    tema: 'informatica',
    pergunta: 'Qual programa é usado para criar apresentações de slides?',
    opcoes: ['Excel', 'Word', 'PowerPoint', 'Paint'],
    resposta: 'PowerPoint',
    explicacao: 'No PowerPoint montamos slides com textos, imagens e animações.'
  },
  {
    tema: 'informatica',
    pergunta: 'Para que serve o driver de uma impressora?',
    opcoes: [
      'Para limpar a tinta',
      'Para o computador se comunicar com a impressora',
      'Para deixar a internet mais rápida',
      'Para proteger contra vírus'
    ],
    resposta: 'Para o computador se comunicar com a impressora',
    explicacao: 'Sem o driver certo, o computador não sabe como mandar a impressão para o aparelho.'
  },
  {
    tema: 'informatica',
    pergunta: 'Qual atalho de teclado copia um texto selecionado?',
    opcoes: ['Ctrl + V', 'Ctrl + C', 'Ctrl + Z', 'Ctrl + P'],
    resposta: 'Ctrl + C',
    explicacao: 'Ctrl + C copia, Ctrl + V cola e Ctrl + X recorta.'
  },
  {
    tema: 'informatica',
    pergunta: 'O que significa a sigla PDF?',
    opcoes: ['Portable Document Format', 'Programa De Fotos', 'Página Digital Final', 'Print Document File'],
    resposta: 'Portable Document Format',
    explicacao: 'Em português, "formato de documento portátil": o arquivo abre do mesmo jeito em qualquer computador.'
  },
  {
    tema: 'informatica',
    pergunta: 'Qual destas é a senha mais segura?',
    opcoes: ['123456', 'iris2024', 'Gato#Azul!73', 'senha'],
    resposta: 'Gato#Azul!73',
    explicacao: 'Senhas fortes misturam letras maiúsculas e minúsculas, números e símbolos.'
  },
  {
    tema: 'informatica',
    pergunta: 'Qual comando do Windows mostra o endereço IP do computador?',
    opcoes: ['ipconfig', 'ping', 'cls', 'dir'],
    resposta: 'ipconfig',
    explicacao: 'O ipconfig é usado no Prompt de Comando e ajuda muito no suporte técnico.'
  },
  {
    tema: 'informatica',
    pergunta: 'O que é phishing?',
    opcoes: [
      'Um tipo de antivírus',
      'Um golpe com mensagens falsas para roubar dados',
      'Um programa para editar fotos',
      'Uma peça do computador'
    ],
    resposta: 'Um golpe com mensagens falsas para roubar dados',
    explicacao: 'Desconfie de mensagens que pedem senha ou dados pessoais com urgência.'
  },
  {
    tema: 'informatica',
    pergunta: 'Qual memória perde os dados quando o computador é desligado?',
    opcoes: ['HD', 'SSD', 'Memória RAM', 'Pen drive'],
    resposta: 'Memória RAM',
    explicacao: 'A RAM só guarda os dados enquanto o computador está ligado. Por isso é importante salvar os arquivos!'
  }
];

// elementos da página
const telaTema = document.getElementById('tela-tema');
const telaPergunta = document.getElementById('tela-pergunta');
const telaFim = document.getElementById('tela-fim');
const textoTema = document.getElementById('tema-atual');
const textoProgresso = document.getElementById('progresso');
const textoPontos = document.getElementById('pontos');
const barraPreenchida = document.getElementById('barra-preenchida');
const textoPergunta = document.getElementById('pergunta');
const divOpcoes = document.getElementById('opcoes');
const textoExplicacao = document.getElementById('explicacao');
const botaoProxima = document.getElementById('proxima');
const textoNota = document.getElementById('nota');
const textoFrase = document.getElementById('frase');

// variáveis do jogo
let perguntasDaRodada = [];
let indiceAtual = 0;
let pontos = 0;

// embaralha a lista (algoritmo de Fisher-Yates)
function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copia[i];
    copia[i] = copia[j];
    copia[j] = temp;
  }
  return copia;
}

// esconde todas as telas e mostra só a que foi pedida
function mostrarTela(tela) {
  telaTema.classList.add('escondido');
  telaPergunta.classList.add('escondido');
  telaFim.classList.add('escondido');
  tela.classList.remove('escondido');
}

// começa o quiz com o tema escolhido
function comecarQuiz(tema) {
  // pega só as perguntas do tema escolhido
  const doTema = perguntas.filter(function (item) {
    return item.tema === tema;
  });

  perguntasDaRodada = embaralhar(doTema).slice(0, PERGUNTAS_POR_RODADA);
  indiceAtual = 0;
  pontos = 0;

  if (tema === 'historia') {
    textoTema.textContent = '📜 História';
  } else {
    textoTema.textContent = '💻 Informática';
  }

  mostrarTela(telaPergunta);
  mostrarPergunta();
}

// mostra a pergunta atual na tela
function mostrarPergunta() {
  const atual = perguntasDaRodada[indiceAtual];

  textoProgresso.textContent = 'Pergunta ' + (indiceAtual + 1) + ' de ' + perguntasDaRodada.length;
  textoPontos.textContent = '⭐ Pontos: ' + pontos;
  barraPreenchida.style.width = (indiceAtual / perguntasDaRodada.length) * 100 + '%';
  textoPergunta.textContent = atual.pergunta;
  textoExplicacao.textContent = '';
  textoExplicacao.className = 'explicacao';
  botaoProxima.classList.add('escondido');

  // cria um botão para cada opção
  divOpcoes.innerHTML = '';
  for (const opcao of embaralhar(atual.opcoes)) {
    const botao = document.createElement('button');
    botao.className = 'opcao';
    botao.textContent = opcao;
    botao.addEventListener('click', function () {
      responder(botao);
    });
    divOpcoes.appendChild(botao);
  }
}

// confere a resposta e mostra a explicação
function responder(botaoClicado) {
  const atual = perguntasDaRodada[indiceAtual];

  // trava as opções e pinta a certa de verde
  const botoes = divOpcoes.querySelectorAll('.opcao');
  for (const botao of botoes) {
    botao.disabled = true;
    if (botao.textContent === atual.resposta) {
      botao.classList.add('certa');
    }
  }

  if (botaoClicado.textContent === atual.resposta) {
    pontos++;
    textoPontos.textContent = '⭐ Pontos: ' + pontos;
    textoExplicacao.textContent = '✔️ Acertou! ' + atual.explicacao;
    textoExplicacao.className = 'explicacao certo';
  } else {
    botaoClicado.classList.add('errada');
    textoExplicacao.textContent = '✖️ Não foi dessa vez. ' + atual.explicacao;
    textoExplicacao.className = 'explicacao errado';
  }

  if (indiceAtual === perguntasDaRodada.length - 1) {
    botaoProxima.textContent = 'Ver resultado 🏁';
  } else {
    botaoProxima.textContent = 'Próxima →';
  }
  botaoProxima.classList.remove('escondido');
  botaoProxima.focus();
}

// tela final com a nota
function mostrarResultado() {
  const total = perguntasDaRodada.length;

  let frase = '';
  if (pontos === total) {
    frase = '🏆 Incrível! Você acertou todas!';
  } else if (pontos >= 7) {
    frase = '🎉 Muito bem!';
  } else if (pontos >= 4) {
    frase = '🙂 Bom trabalho! Dá para melhorar ainda mais.';
  } else {
    frase = '📚 Que tal estudar mais um pouquinho e tentar de novo?';
  }

  textoNota.textContent = pontos + ' de ' + total;
  textoFrase.textContent = frase;
  mostrarTela(telaFim);
}

// botões
const botoesTema = document.querySelectorAll('.opcao-tema');
for (const botao of botoesTema) {
  botao.addEventListener('click', function () {
    comecarQuiz(botao.dataset.tema);
  });
}

botaoProxima.addEventListener('click', function () {
  indiceAtual++;
  if (indiceAtual < perguntasDaRodada.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

document.getElementById('trocar-tema').addEventListener('click', function () {
  mostrarTela(telaTema);
});

document.getElementById('jogar-de-novo').addEventListener('click', function () {
  mostrarTela(telaTema);
});
