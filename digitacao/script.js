// Jogo de Digitação
// Iris Mirelis

const TEMPO_TOTAL = 60; // segundos

// palavras sem acento para facilitar a digitação
const palavras = {
  historia: [
    'caravela', 'cabral', 'tiradentes', 'imperador', 'imperatriz', 'princesa',
    'isabel', 'capitania', 'bandeirantes', 'quilombo', 'palmares', 'zumbi',
    'monarquia', 'museu', 'passado', 'arqueologia', 'egito', 'roma',
    'castelo', 'cavaleiro', 'feudo', 'rainha', 'templo', 'senado',
    'liberdade', 'tratado', 'tordesilhas', 'coroa', 'trono', 'batalha',
    'engenho', 'ouro', 'tupi', 'guarani', 'catedral', 'mapa',
    'regente', 'leopoldina', 'fortaleza', 'cronologia'
  ],
  informatica: [
    'computador', 'teclado', 'mouse', 'monitor', 'internet', 'arquivo',
    'pasta', 'imprimir', 'salvar', 'copiar', 'colar', 'senha',
    'email', 'rede', 'planilha', 'documento', 'navegador', 'impressora',
    'suporte', 'chamado', 'programa', 'tela', 'cabo', 'backup',
    'tabela', 'texto', 'site', 'link', 'download', 'notebook',
    'pendrive', 'cursor', 'atalho', 'tecla', 'anexo', 'nuvem',
    'servidor', 'sistema', 'login', 'janela'
  ]
};

// elementos da página
const telaTema = document.getElementById('tela-tema');
const telaJogo = document.getElementById('tela-jogo');
const textoTema = document.getElementById('tema-atual');
const textoTempo = document.getElementById('tempo');
const textoAcertos = document.getElementById('acertos');
const textoPalavra = document.getElementById('palavra');
const campo = document.getElementById('campo');
const botaoComecar = document.getElementById('comecar');
const textoResultado = document.getElementById('resultado');

// variáveis do jogo
let tema = '';
let tempoRestante = TEMPO_TOTAL;
let acertos = 0;
let palavraAtual = '';
let cronometro = null;

// guarda o tema escolhido e começa o jogo
function escolherTema(temaEscolhido) {
  tema = temaEscolhido;

  if (tema === 'historia') {
    textoTema.textContent = '📜 História';
  } else {
    textoTema.textContent = '💻 Informática';
  }

  prepararJogo();
  telaTema.classList.add('escondido');
  telaJogo.classList.remove('escondido');
}

// volta para a tela de escolher o tema
function trocarTema() {
  prepararJogo(); // para o relógio se estiver rodando
  telaJogo.classList.add('escondido');
  telaTema.classList.remove('escondido');
}

// deixa tudo como no começo
function prepararJogo() {
  clearInterval(cronometro);
  tempoRestante = TEMPO_TOTAL;
  acertos = 0;
  palavraAtual = '';
  textoTempo.textContent = TEMPO_TOTAL;
  textoTempo.classList.remove('acabando');
  textoAcertos.textContent = 0;
  textoPalavra.textContent = 'Pronto?';
  textoResultado.textContent = '';
  campo.value = '';
  campo.disabled = true;
  campo.classList.remove('errado');
  botaoComecar.disabled = false;
  botaoComecar.textContent = '▶️ Começar';
}

// sorteia uma palavra diferente da atual
function sortearPalavra() {
  const lista = palavras[tema];
  let nova = palavraAtual;
  while (nova === palavraAtual) {
    nova = lista[Math.floor(Math.random() * lista.length)];
  }
  palavraAtual = nova;
  mostrarPalavra(0);
}

// mostra a palavra com as letras certas em verde
function mostrarPalavra(letrasCertas) {
  const parteCerta = palavraAtual.slice(0, letrasCertas);
  const resto = palavraAtual.slice(letrasCertas);
  textoPalavra.innerHTML = '<span class="letras-certas">' + parteCerta + '</span>' + resto;
}

// começa a partida e liga o cronômetro
function comecar() {
  tempoRestante = TEMPO_TOTAL;
  acertos = 0;
  textoTempo.textContent = tempoRestante;
  textoTempo.classList.remove('acabando');
  textoAcertos.textContent = acertos;
  textoResultado.textContent = '';

  campo.disabled = false;
  campo.value = '';
  campo.classList.remove('errado');
  campo.focus();
  botaoComecar.disabled = true;

  sortearPalavra();

  // a cada 1 segundo diminui o tempo
  cronometro = setInterval(function () {
    tempoRestante--;
    textoTempo.textContent = tempoRestante;

    if (tempoRestante <= 10) {
      textoTempo.classList.add('acabando');
    }
    if (tempoRestante <= 0) {
      terminar();
    }
  }, 1000);
}

// acabou o tempo: mostra o resultado
function terminar() {
  clearInterval(cronometro);
  campo.disabled = true;
  botaoComecar.disabled = false;
  botaoComecar.textContent = '🔁 Jogar de novo';
  textoPalavra.textContent = '⏰ Tempo esgotado!';

  let frase = '';
  if (acertos >= 25) {
    frase = '🚀 Velocidade de profissional!';
  } else if (acertos >= 12) {
    frase = '🎉 Muito bem!';
  } else {
    frase = '💪 Continue praticando, você vai melhorar!';
  }
  textoResultado.textContent = frase + ' Você digitou ' + acertos + ' palavras em ' + TEMPO_TOTAL + ' segundos.';
}

// confere cada letra que a pessoa digita
campo.addEventListener('input', function () {
  const digitado = campo.value.trim().toLowerCase();

  if (digitado === palavraAtual) {
    acertos++;
    textoAcertos.textContent = acertos;
    campo.value = '';
    campo.classList.remove('errado');
    sortearPalavra();
  } else if (palavraAtual.startsWith(digitado)) {
    campo.classList.remove('errado');
    mostrarPalavra(digitado.length);
  } else {
    campo.classList.add('errado');
  }
});

// botões
const botoesTema = document.querySelectorAll('.opcao-tema');
for (const botao of botoesTema) {
  botao.addEventListener('click', function () {
    escolherTema(botao.dataset.tema);
  });
}

document.getElementById('trocar-tema').addEventListener('click', trocarTema);
botaoComecar.addEventListener('click', comecar);
