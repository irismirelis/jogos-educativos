// Jogo da Memória
// Iris Mirelis

const TOTAL_DE_DICAS = 3;

// cada par vira duas cartas (carta1 e carta2)
// a dica aparece quando a pessoa pede ajuda e quando acha o par
const temas = {
  informatica: {
    instrucao: 'Encontre os pares: cada atalho de teclado com o que ele faz.',
    pares: [
      { carta1: 'Ctrl + C', carta2: 'Copiar', dica: 'C de cópia: copia o que estiver selecionado.' },
      { carta1: 'Ctrl + V', carta2: 'Colar', dica: 'Vem depois do copiar. O V fica do lado do C no teclado.' },
      { carta1: 'Ctrl + X', carta2: 'Recortar', dica: 'O X parece uma tesoura: tira do lugar para colar em outro.' },
      { carta1: 'Ctrl + Z', carta2: 'Desfazer', dica: 'Serve para quando a gente erra: volta um passo.' },
      { carta1: 'Ctrl + P', carta2: 'Imprimir', dica: 'P de print, que é imprimir em inglês.' },
      { carta1: 'Alt + Tab', carta2: 'Trocar de janela', dica: 'Passa de um programa aberto para outro.' },
      { carta1: 'Windows + L', carta2: 'Bloquear o PC', dica: 'L de lock, que é trancar em inglês. Use quando sair de perto do computador.' },
      { carta1: 'Windows + E', carta2: 'Abrir pastas e arquivos', dica: 'E de Explorer: abre o Explorador de Arquivos.' }
    ]
  },
  historia: {
    instrucao: 'Encontre os pares: cada ano com o que aconteceu no Brasil.',
    pares: [
      { carta1: '1500', carta2: 'Chegada de Cabral', dica: 'A esquadra portuguesa chegou ao litoral da Bahia.' },
      { carta1: '1549', carta2: 'Salvador vira capital', dica: 'Tomé de Sousa fundou a cidade, que foi a capital até 1763.' },
      { carta1: '1808', carta2: 'Chegada da família real', dica: 'Fugindo de Napoleão, a corte portuguesa veio para o Brasil.' },
      { carta1: '1822', carta2: 'Grito do Ipiranga', dica: 'Dom Pedro I declarou a Independência do Brasil.' },
      { carta1: '1888', carta2: 'Lei Áurea', dica: 'Assinada pela Princesa Isabel, acabou com a escravidão no Brasil.' },
      { carta1: '1889', carta2: 'Fim do Império', dica: 'O Marechal Deodoro da Fonseca proclamou a República.' },
      { carta1: '1932', carta2: 'Voto feminino', dica: 'As mulheres conquistaram o direito de votar no Brasil.' },
      { carta1: '1960', carta2: 'Brasília vira capital', dica: 'JK inaugurou a nova capital no Planalto Central.' }
    ]
  }
};

// elementos da página
const telaTema = document.getElementById('tela-tema');
const telaJogo = document.getElementById('tela-jogo');
const textoTema = document.getElementById('tema-atual');
const textoInstrucao = document.getElementById('instrucao-do-tema');
const tabuleiro = document.getElementById('tabuleiro');
const textoJogadas = document.getElementById('jogadas');
const textoPares = document.getElementById('pares');
const textoMensagem = document.getElementById('mensagem');
const botaoDica = document.getElementById('dica');

// variáveis do jogo
let pares = [];
let primeiraCarta = null;
let segundaCarta = null;
let travado = false; // trava enquanto as cartas erradas desviram
let jogadas = 0;
let paresEncontrados = 0;
let dicasRestantes = TOTAL_DE_DICAS;
let temporizador = null;

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

// guarda o tema escolhido e começa o jogo
function escolherTema(tema) {
  pares = temas[tema].pares;
  textoInstrucao.textContent = temas[tema].instrucao;

  if (tema === 'historia') {
    textoTema.textContent = '📜 História';
  } else {
    textoTema.textContent = '💻 Informática';
  }

  telaTema.classList.add('escondido');
  telaJogo.classList.remove('escondido');
  reiniciar();
}

// volta para a tela de escolher o tema
function trocarTema() {
  clearTimeout(temporizador);
  telaJogo.classList.add('escondido');
  telaTema.classList.remove('escondido');
}

// cria as cartas embaralhadas na tela
function montarTabuleiro() {
  const cartas = [];
  for (let i = 0; i < pares.length; i++) {
    // as duas cartas do par ficam com o mesmo número
    cartas.push({ par: i, texto: pares[i].carta1, tipo: 'carta1' });
    cartas.push({ par: i, texto: pares[i].carta2, tipo: 'carta2' });
  }

  tabuleiro.innerHTML = '';
  for (const carta of embaralhar(cartas)) {
    const botao = document.createElement('button');
    botao.className = 'carta';
    botao.textContent = '?';
    botao.dataset.par = carta.par;
    botao.dataset.texto = carta.texto;
    botao.dataset.tipo = carta.tipo; // a carta1 (atalho ou ano) usa outra letra no CSS
    botao.addEventListener('click', function () {
      virarCarta(botao);
    });
    tabuleiro.appendChild(botao);
  }
}

// vira a carta clicada e confere quando tiver duas viradas
function virarCarta(botao) {
  if (travado || botao.classList.contains('virada')) {
    return;
  }

  botao.classList.remove('piscando');
  botao.classList.add('virada');
  botao.textContent = botao.dataset.texto;

  if (primeiraCarta === null) {
    primeiraCarta = botao;
    return;
  }

  segundaCarta = botao;
  jogadas++;
  textoJogadas.textContent = jogadas;

  if (primeiraCarta.dataset.par === segundaCarta.dataset.par) {
    acertouPar();
  } else {
    errouPar();
  }
}

// as duas cartas combinam e ficam viradas
function acertouPar() {
  const par = pares[Number(primeiraCarta.dataset.par)];

  primeiraCarta.classList.add('encontrada');
  segundaCarta.classList.add('encontrada');
  primeiraCarta = null;
  segundaCarta = null;

  paresEncontrados++;
  textoPares.textContent = paresEncontrados + ' de ' + pares.length;

  if (paresEncontrados === pares.length) {
    mostrarMensagem('🏆 Parabéns! Você encontrou todos os pares em ' + jogadas + ' jogadas!', 'certo');
  } else {
    mostrarMensagem('✔️ ' + par.carta1 + ' = ' + par.carta2 + '. ' + par.dica, 'certo');
  }
}

// as duas cartas não combinam
function errouPar() {
  travado = true;
  // espera 1 segundo e desvira as duas
  temporizador = setTimeout(function () {
    desvirar(primeiraCarta);
    desvirar(segundaCarta);
    primeiraCarta = null;
    segundaCarta = null;
    travado = false;
  }, 1000);
}

// volta a carta para baixo
function desvirar(botao) {
  botao.classList.remove('virada');
  botao.textContent = '?';
}

// a dica explica o par da carta virada e faz a carta do par piscar
function usarDica() {
  if (travado || dicasRestantes === 0) {
    return;
  }
  if (primeiraCarta === null) {
    mostrarMensagem('💡 Vire uma carta primeiro. Depois clique em Dica para ver onde está o par dela.', 'dica');
    return;
  }

  dicasRestantes--;
  botaoDica.textContent = '💡 Dica (' + dicasRestantes + ')';
  botaoDica.disabled = dicasRestantes === 0;

  const numeroDoPar = primeiraCarta.dataset.par;
  mostrarMensagem('💡 ' + pares[Number(numeroDoPar)].dica + ' O par está piscando!', 'dica');

  for (const carta of tabuleiro.children) {
    if (carta.dataset.par === numeroDoPar && carta !== primeiraCarta) {
      carta.classList.add('piscando');
      // para de piscar depois de 1,5 segundo
      setTimeout(function () {
        carta.classList.remove('piscando');
      }, 1500);
    }
  }
}

// troca o texto e a cor da mensagem
function mostrarMensagem(texto, tipo) {
  textoMensagem.textContent = texto;
  textoMensagem.className = 'mensagem ' + tipo;
}

// zera tudo e embaralha as cartas de novo
function reiniciar() {
  clearTimeout(temporizador); // cancela o desvirar que ainda estava esperando
  primeiraCarta = null;
  segundaCarta = null;
  travado = false;
  jogadas = 0;
  paresEncontrados = 0;
  dicasRestantes = TOTAL_DE_DICAS;

  textoJogadas.textContent = 0;
  textoPares.textContent = '0 de ' + pares.length;
  botaoDica.textContent = '💡 Dica (' + dicasRestantes + ')';
  botaoDica.disabled = false;
  mostrarMensagem('', '');
  montarTabuleiro();
}

// botões
const botoesTema = document.querySelectorAll('.opcao-tema');
for (const botao of botoesTema) {
  botao.addEventListener('click', function () {
    escolherTema(botao.dataset.tema);
  });
}

document.getElementById('trocar-tema').addEventListener('click', trocarTema);
document.getElementById('reiniciar').addEventListener('click', reiniciar);
botaoDica.addEventListener('click', usarDica);
