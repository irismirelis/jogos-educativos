// Jogo da Forca
// Iris Mirelis

const MAXIMO_DE_ERROS = 6; // o boneco tem 6 partes

// palavras sem acento e em maiúsculas
const palavras = {
  historia: [
    { palavra: 'INDEPENDENCIA', dica: 'Aconteceu em 7 de setembro de 1822' },
    { palavra: 'REPUBLICA', dica: 'Forma de governo proclamada no Brasil em 1889' },
    { palavra: 'BRASILIA', dica: 'Capital do Brasil inaugurada em 1960' },
    { palavra: 'TIRADENTES', dica: 'Herói da Inconfidência Mineira' },
    { palavra: 'PIRAMIDE', dica: 'Construção famosa do Egito Antigo' },
    { palavra: 'CABRAL', dica: 'Navegador português que chegou ao Brasil em 1500' },
    { palavra: 'IMPERIO', dica: 'Período em que o Brasil foi governado por Dom Pedro I e Dom Pedro II' },
    { palavra: 'CARAVELA', dica: 'Embarcação usada pelos portugueses nas Grandes Navegações' }
  ],
  informatica: [
    { palavra: 'TECLADO', dica: 'Usamos para digitar' },
    { palavra: 'IMPRESSORA', dica: 'Passa para o papel o que está na tela' },
    { palavra: 'NAVEGADOR', dica: 'Programa para acessar sites, como o Chrome' },
    { palavra: 'PLANILHA', dica: 'Arquivo do Excel, com linhas e colunas' },
    { palavra: 'SENHA', dica: 'Deve ser forte e ninguém pode saber' },
    { palavra: 'MONITOR', dica: 'A tela do computador' },
    { palavra: 'ROTEADOR', dica: 'Aparelho que espalha o sinal de Wi-Fi' },
    { palavra: 'DRIVER', dica: 'Programa que ajuda o computador a reconhecer um aparelho' }
  ]
};

// elementos da página
const telaTema = document.getElementById('tela-tema');
const telaJogo = document.getElementById('tela-jogo');
const textoTema = document.getElementById('tema-atual');
const textoDica = document.getElementById('dica');
const textoPalavra = document.getElementById('palavra');
const textoErros = document.getElementById('erros');
const divTeclado = document.getElementById('teclado');
const textoMensagem = document.getElementById('mensagem');
const partesDoBoneco = document.querySelectorAll('.parte');

// variáveis do jogo
let tema = '';
let palavraSecreta = '';
let letrasUsadas = [];
let erros = 0;
let jogoAcabou = true; // nenhuma partida começou ainda

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
  novaPalavra();
}

// volta para a tela de escolher o tema
function trocarTema() {
  jogoAcabou = true; // para o teclado não funcionar na tela de escolha
  telaJogo.classList.add('escondido');
  telaTema.classList.remove('escondido');
}

// sorteia uma palavra e limpa a tela para a nova rodada
function novaPalavra() {
  const lista = palavras[tema];

  // sorteia de novo se cair a mesma palavra da rodada anterior
  let sorteada = lista[Math.floor(Math.random() * lista.length)];
  while (sorteada.palavra === palavraSecreta) {
    sorteada = lista[Math.floor(Math.random() * lista.length)];
  }

  palavraSecreta = sorteada.palavra;
  textoDica.textContent = sorteada.dica;

  letrasUsadas = [];
  erros = 0;
  jogoAcabou = false;
  textoMensagem.textContent = '';
  textoMensagem.className = 'mensagem';

  for (const parte of partesDoBoneco) {
    parte.classList.remove('mostrar');
  }

  criarTeclado();
  atualizarPalavra();
  atualizarErros();
}

// cria um botão para cada letra
function criarTeclado() {
  divTeclado.innerHTML = '';
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (const letra of alfabeto) {
    const tecla = document.createElement('button');
    tecla.className = 'tecla';
    tecla.id = 'tecla-' + letra;
    tecla.textContent = letra;
    tecla.addEventListener('click', function () {
      tentarLetra(letra);
    });
    divTeclado.appendChild(tecla);
  }
}

// mostra a palavra com _ nas letras que faltam
function atualizarPalavra() {
  let texto = '';
  for (const letra of palavraSecreta) {
    if (letrasUsadas.includes(letra)) {
      texto += letra + ' ';
    } else {
      texto += '_ ';
    }
  }
  textoPalavra.textContent = texto.trim();
}

// mostra quantos erros a pessoa já teve
function atualizarErros() {
  textoErros.textContent = 'Erros: ' + erros + ' de ' + MAXIMO_DE_ERROS;
}

// confere se a letra está na palavra
function tentarLetra(letra) {
  if (jogoAcabou || letrasUsadas.includes(letra)) {
    return;
  }
  letrasUsadas.push(letra);

  const tecla = document.getElementById('tecla-' + letra);
  tecla.disabled = true;

  if (palavraSecreta.includes(letra)) {
    tecla.classList.add('certa');
    atualizarPalavra();
    verificarVitoria();
  } else {
    tecla.classList.add('errada');
    erros++;
    partesDoBoneco[erros - 1].classList.add('mostrar');
    atualizarErros();

    if (erros === MAXIMO_DE_ERROS) {
      fimDeJogo(false);
    }
  }
}

// ganha quando todas as letras da palavra já foram usadas
function verificarVitoria() {
  for (const letra of palavraSecreta) {
    if (!letrasUsadas.includes(letra)) {
      return; // ainda falta letra
    }
  }
  fimDeJogo(true);
}

// mensagem de vitória ou de derrota e trava o teclado
function fimDeJogo(ganhou) {
  jogoAcabou = true;

  if (ganhou) {
    textoMensagem.textContent = '🎉 Parabéns! Você descobriu a palavra!';
    textoMensagem.className = 'mensagem certo';
  } else {
    textoMensagem.textContent = '😢 Não foi dessa vez! A palavra era ' + palavraSecreta + '.';
    textoMensagem.className = 'mensagem errado';
    textoPalavra.textContent = palavraSecreta.split('').join(' ');
  }

  const teclas = divTeclado.querySelectorAll('.tecla');
  for (const tecla of teclas) {
    tecla.disabled = true;
  }
}

// também dá para jogar com o teclado do computador
document.addEventListener('keydown', function (evento) {
  if (evento.ctrlKey || evento.altKey || evento.metaKey) {
    return; // ignora atalhos tipo Ctrl + R
  }
  const letra = evento.key.toUpperCase();
  if (letra.length === 1 && letra >= 'A' && letra <= 'Z') {
    tentarLetra(letra);
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
document.getElementById('nova-palavra').addEventListener('click', novaPalavra);
