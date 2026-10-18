// Caça-Palavras
// Iris Mirelis

const TAMANHO = 10; // a grade tem 10 linhas e 10 colunas

// palavras sem acento, em maiúsculas e com no máximo 10 letras
const temas = {
  informatica: ['TECLADO', 'MOUSE', 'MONITOR', 'IMPRESSORA', 'INTERNET', 'EMAIL', 'PLANILHA', 'DRIVER'],
  historia: ['REPUBLICA', 'IMPERIO', 'COLONIA', 'BRASILIA', 'CABRAL', 'TIRADENTES', 'PIRAMIDE', 'FARAO']
};

// direções: [quanto anda na linha, quanto anda na coluna]
const direcoes = [
  [0, 1], // horizontal
  [1, 0], // vertical
  [1, 1]  // diagonal
];

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// elementos da página
const telaTema = document.getElementById('tela-tema');
const telaJogo = document.getElementById('tela-jogo');
const textoTema = document.getElementById('tema-atual');
const divGrade = document.getElementById('grade');
const listaNaTela = document.getElementById('lista-de-palavras');
const textoMensagem = document.getElementById('mensagem');

// variáveis do jogo
let tema = '';
let grade = [];           // grade[linha][coluna]
let palavras = [];
let encontradas = [];
let primeiraLetra = null; // { linha, coluna } da primeira letra clicada

// devolve um número sorteado de 0 até quantidade - 1
function sortear(quantidade) {
  return Math.floor(Math.random() * quantidade);
}

// ---------- montar a grade ----------

function criarGradeVazia() {
  const novaGrade = [];
  for (let linha = 0; linha < TAMANHO; linha++) {
    const letras = [];
    for (let coluna = 0; coluna < TAMANHO; coluna++) {
      letras.push('');
    }
    novaGrade.push(letras);
  }
  return novaGrade;
}

// confere se a palavra cabe nessa posição e direção
function palavraCabe(novaGrade, palavra, linha, coluna, direcao) {
  for (let i = 0; i < palavra.length; i++) {
    const l = linha + i * direcao[0];
    const c = coluna + i * direcao[1];

    if (l >= TAMANHO || c >= TAMANHO) {
      return false; // saiu da grade
    }
    if (novaGrade[l][c] !== '' && novaGrade[l][c] !== palavra[i]) {
      return false; // já tem outra letra aqui
    }
  }
  return true;
}

// tenta esconder a palavra em um lugar sorteado (até 100 vezes)
function esconderPalavra(novaGrade, palavra) {
  for (let tentativa = 0; tentativa < 100; tentativa++) {
    const direcao = direcoes[sortear(direcoes.length)];
    const linha = sortear(TAMANHO);
    const coluna = sortear(TAMANHO);

    if (palavraCabe(novaGrade, palavra, linha, coluna, direcao)) {
      for (let i = 0; i < palavra.length; i++) {
        novaGrade[linha + i * direcao[0]][coluna + i * direcao[1]] = palavra[i];
      }
      return true;
    }
  }
  return false;
}

// esconde todas as palavras; se alguma não couber, começa uma grade nova
function montarGrade(lista) {
  // as maiores primeiro porque são mais difíceis de encaixar
  const ordenadas = lista.slice().sort(function (a, b) {
    return b.length - a.length;
  });

  while (true) {
    const novaGrade = criarGradeVazia();
    let deuCerto = true;

    for (const palavra of ordenadas) {
      if (!esconderPalavra(novaGrade, palavra)) {
        deuCerto = false;
        break;
      }
    }

    if (deuCerto) {
      // completa os espaços vazios com letras sorteadas
      for (let linha = 0; linha < TAMANHO; linha++) {
        for (let coluna = 0; coluna < TAMANHO; coluna++) {
          if (novaGrade[linha][coluna] === '') {
            novaGrade[linha][coluna] = ALFABETO[sortear(ALFABETO.length)];
          }
        }
      }
      return novaGrade;
    }
  }
}

// ---------- mostrar na tela ----------

function desenharGrade() {
  divGrade.innerHTML = '';
  divGrade.style.gridTemplateColumns = 'repeat(' + TAMANHO + ', 1fr)';

  for (let linha = 0; linha < TAMANHO; linha++) {
    for (let coluna = 0; coluna < TAMANHO; coluna++) {
      const celula = document.createElement('button');
      celula.className = 'celula';
      celula.id = 'celula-' + linha + '-' + coluna;
      celula.textContent = grade[linha][coluna];
      celula.addEventListener('click', function () {
        clicarNaLetra(linha, coluna);
      });
      divGrade.appendChild(celula);
    }
  }
}

// mostra a lista das palavras que tem que achar
function desenharLista() {
  listaNaTela.innerHTML = '';
  for (const palavra of palavras) {
    const item = document.createElement('li');
    item.id = 'palavra-' + palavra;
    item.textContent = palavra;
    listaNaTela.appendChild(item);
  }
}

// pega o botão da letra pela linha e pela coluna
function pegarCelula(linha, coluna) {
  return document.getElementById('celula-' + linha + '-' + coluna);
}

// troca o texto e a cor da mensagem
function mostrarMensagem(texto, tipo) {
  textoMensagem.textContent = texto;
  textoMensagem.className = 'mensagem ' + tipo;
}

// ---------- jogar ----------

function clicarNaLetra(linha, coluna) {
  // primeiro clique
  if (primeiraLetra === null) {
    primeiraLetra = { linha: linha, coluna: coluna };
    pegarCelula(linha, coluna).classList.add('selecionada');
    return;
  }

  // segundo clique
  const inicio = primeiraLetra;
  pegarCelula(inicio.linha, inicio.coluna).classList.remove('selecionada');
  primeiraLetra = null;

  // clicou na mesma letra duas vezes: cancela
  if (inicio.linha === linha && inicio.coluna === coluna) {
    return;
  }

  const caminho = calcularCaminho(inicio, { linha: linha, coluna: coluna });
  if (caminho === null) {
    mostrarMensagem('As letras precisam estar na mesma linha, coluna ou diagonal.', 'errado');
    return;
  }

  let texto = '';
  for (const posicao of caminho) {
    texto += grade[posicao.linha][posicao.coluna];
  }
  // aceita também de trás para frente
  const textoAoContrario = texto.split('').reverse().join('');

  for (const palavra of palavras) {
    if (palavra === texto || palavra === textoAoContrario) {
      if (encontradas.includes(palavra)) {
        mostrarMensagem('Você já tinha encontrado ' + palavra + '. 😉', 'certo');
      } else {
        marcarComoEncontrada(palavra, caminho);
      }
      return;
    }
  }

  mostrarMensagem('Hmm, essa não é uma das palavras. Tente de novo!', 'errado');
}

// devolve as posições entre as duas letras, ou null se não estiverem alinhadas
function calcularCaminho(inicio, fim) {
  const difLinhas = fim.linha - inicio.linha;
  const difColunas = fim.coluna - inicio.coluna;

  const mesmaLinha = difLinhas === 0;
  const mesmaColuna = difColunas === 0;
  const mesmaDiagonal = Math.abs(difLinhas) === Math.abs(difColunas);

  if (!mesmaLinha && !mesmaColuna && !mesmaDiagonal) {
    return null;
  }

  // Math.sign devolve -1, 0 ou 1
  const passoLinha = Math.sign(difLinhas);
  const passoColuna = Math.sign(difColunas);
  const quantidade = Math.max(Math.abs(difLinhas), Math.abs(difColunas)) + 1;

  const caminho = [];
  for (let i = 0; i < quantidade; i++) {
    caminho.push({
      linha: inicio.linha + i * passoLinha,
      coluna: inicio.coluna + i * passoColuna
    });
  }
  return caminho;
}

// pinta as letras e risca a palavra da lista
function marcarComoEncontrada(palavra, caminho) {
  encontradas.push(palavra);

  for (const posicao of caminho) {
    pegarCelula(posicao.linha, posicao.coluna).classList.add('encontrada');
  }
  document.getElementById('palavra-' + palavra).classList.add('riscada');

  if (encontradas.length === palavras.length) {
    mostrarMensagem('🏆 Parabéns! Você encontrou todas as palavras!', 'certo');
  } else {
    mostrarMensagem('✔️ Você achou ' + palavra + '!', 'certo');
  }
}

// guarda o tema escolhido e começa o jogo
function escolherTema(temaEscolhido) {
  tema = temaEscolhido;

  if (tema === 'historia') {
    textoTema.textContent = '📜 História';
  } else {
    textoTema.textContent = '💻 Informática';
  }

  telaTema.classList.add('escondido');
  telaJogo.classList.remove('escondido');
  novoJogo();
}

// volta para a tela de escolher o tema
function trocarTema() {
  telaJogo.classList.add('escondido');
  telaTema.classList.remove('escondido');
}

// monta uma grade nova com as palavras do tema
function novoJogo() {
  palavras = temas[tema];
  encontradas = [];
  primeiraLetra = null;

  grade = montarGrade(palavras);
  desenharGrade();
  desenharLista();
  mostrarMensagem('', '');
}

// botões
const botoesTema = document.querySelectorAll('.opcao-tema');
for (const botao of botoesTema) {
  botao.addEventListener('click', function () {
    escolherTema(botao.dataset.tema);
  });
}

document.getElementById('trocar-tema').addEventListener('click', trocarTema);
document.getElementById('novo-jogo').addEventListener('click', novoJogo);
