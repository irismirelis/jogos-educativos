// Desafio dos Números
// Iris Mirelis

const TOTAL_DE_PERGUNTAS = 10;

// perguntas de cada tema (a resposta é sempre um número)
const perguntas = {
  historia: [
    {
      pergunta: 'Os portugueses chegaram ao Brasil em 1500 e a independência foi em 1822. Por quantos anos o Brasil foi colônia de Portugal?',
      resposta: 322,
      conta: 'Colônia: 1822 − 1500 = 322 anos'
    },
    {
      pergunta: 'O Brasil ficou independente em 1822 e virou república em 1889. Por quantos anos o Brasil foi um império?',
      resposta: 67,
      conta: 'Império: 1889 − 1822 = 67 anos'
    },
    {
      pergunta: 'Salvador foi a capital do Brasil de 1549 até 1763. Por quantos anos ela foi a capital?',
      resposta: 214,
      conta: 'Salvador capital: 1763 − 1549 = 214 anos'
    },
    {
      pergunta: 'O Rio de Janeiro foi a capital do Brasil de 1763 até 1960. Por quantos anos ele foi a capital?',
      resposta: 197,
      conta: 'Rio de Janeiro capital: 1960 − 1763 = 197 anos'
    },
    {
      pergunta: 'Brasília foi inaugurada em 1960. Quantos anos ela completou em 2020?',
      resposta: 60,
      conta: 'Brasília: 2020 − 1960 = 60 anos'
    },
    {
      pergunta: 'A família real portuguesa chegou ao Brasil em 1808. Quantos anos depois veio a independência, em 1822?',
      resposta: 14,
      conta: 'Da família real à independência: 1822 − 1808 = 14 anos'
    },
    {
      pergunta: 'Tiradentes foi executado em 1792. Quantos anos depois o Brasil ficou independente, em 1822?',
      resposta: 30,
      conta: 'De Tiradentes à independência: 1822 − 1792 = 30 anos'
    },
    {
      pergunta: 'Dom Pedro II governou o Brasil de 1840 até 1889. Por quantos anos ele governou?',
      resposta: 49,
      conta: 'Governo de Dom Pedro II: 1889 − 1840 = 49 anos'
    },
    {
      pergunta: 'A República foi proclamada em 1889 e a Constituição atual é de 1988. Quantos anos separam esses dois fatos?',
      resposta: 99,
      conta: 'Da República à Constituição atual: 1988 − 1889 = 99 anos'
    },
    {
      pergunta: 'As mulheres conquistaram o direito de votar no Brasil em 1932. Quantos anos depois da Proclamação da República, em 1889?',
      resposta: 43,
      conta: 'Da República ao voto feminino: 1932 − 1889 = 43 anos'
    },
    {
      pergunta: 'Getúlio Vargas governou o Brasil de 1930 até 1945. Por quantos anos?',
      resposta: 15,
      conta: 'Primeiro governo Vargas: 1945 − 1930 = 15 anos'
    },
    {
      pergunta: 'A independência do Brasil foi em 1822. Esse ano é de qual século? (Responda só com o número.)',
      resposta: 19,
      conta: 'O século 19 (XIX) vai de 1801 até 1900, então 1822 é do século 19'
    }
  ],

  informatica: [
    {
      pergunta: '1 byte tem 8 bits. Quantos bits têm 4 bytes?',
      resposta: 32,
      conta: '4 bytes: 8 × 4 = 32 bits'
    },
    {
      pergunta: '1 KB tem 1024 bytes. Quantos bytes têm 2 KB?',
      resposta: 2048,
      conta: '2 KB: 1024 × 2 = 2048 bytes'
    },
    {
      pergunta: '1 GB tem 1024 MB. Quantos MB têm 3 GB?',
      resposta: 3072,
      conta: '3 GB: 1024 × 3 = 3072 MB'
    },
    {
      pergunta: 'Um pendrive tem 16 GB e você já usou 9 GB. Quantos GB ainda estão livres?',
      resposta: 7,
      conta: 'Pendrive: 16 − 9 = 7 GB livres'
    },
    {
      pergunta: 'Um e-mail aceita anexos de até 25 MB. Quantos arquivos de 5 MB cabem em um e-mail?',
      resposta: 5,
      conta: 'Anexos: 25 ÷ 5 = 5 arquivos'
    },
    {
      pergunta: 'A internet baixa 10 MB por segundo. Quantos segundos leva para baixar um arquivo de 80 MB?',
      resposta: 8,
      conta: 'Download: 80 ÷ 10 = 8 segundos'
    },
    {
      pergunta: 'Uma impressora imprime 20 páginas por minuto. Quantos minutos ela leva para imprimir 100 páginas?',
      resposta: 5,
      conta: 'Impressão: 100 ÷ 20 = 5 minutos'
    },
    {
      pergunta: 'Um teclado tem 12 teclas de função, de F1 até F12. Quantas teclas de função existem em 3 teclados?',
      resposta: 36,
      conta: 'Teclas de função: 12 × 3 = 36'
    },
    {
      pergunta: 'Cada número de um endereço IP, como 192.168.0.1, vai de 0 até 255. Quantos valores diferentes isso dá?',
      resposta: 256,
      conta: 'De 0 até 255: 255 + 1 = 256 valores'
    },
    {
      pergunta: 'Um HD de 500 GB está com 320 GB ocupados. Quantos GB ainda estão livres?',
      resposta: 180,
      conta: 'HD: 500 − 320 = 180 GB livres'
    },
    {
      pergunta: 'Um vídeo ocupa 6 MB por minuto. Quantos MB ocupa um vídeo de 10 minutos?',
      resposta: 60,
      conta: 'Vídeo: 6 × 10 = 60 MB'
    },
    {
      pergunta: 'O laboratório de informática tem 6 fileiras com 5 computadores em cada uma. Quantos computadores há no laboratório?',
      resposta: 30,
      conta: 'Laboratório: 6 × 5 = 30 computadores'
    }
  ]
};

// elementos da página
const telaTema = document.getElementById('tela-tema');
const telaJogo = document.getElementById('tela-jogo');
const telaFim = document.getElementById('tela-fim');
const textoTema = document.getElementById('tema-atual');
const textoProgresso = document.getElementById('progresso');
const textoPergunta = document.getElementById('pergunta');
const formulario = document.getElementById('formulario');
const campoResposta = document.getElementById('resposta');
const textoMensagem = document.getElementById('mensagem');
const textoResultado = document.getElementById('resultado');
const blocoRevisar = document.getElementById('bloco-revisar');
const listaRevisar = document.getElementById('lista-revisar');

// variáveis do jogo
let perguntasDaRodada = [];
let indiceAtual = 0;
let acertos = 0;
let erradas = [];

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
  telaJogo.classList.add('escondido');
  telaFim.classList.add('escondido');
  tela.classList.remove('escondido');
}

// sorteia as perguntas do tema e começa o jogo
function comecarJogo(tema) {
  perguntasDaRodada = embaralhar(perguntas[tema]).slice(0, TOTAL_DE_PERGUNTAS);
  indiceAtual = 0;
  acertos = 0;
  erradas = [];

  if (tema === 'historia') {
    textoTema.textContent = '📜 História';
  } else {
    textoTema.textContent = '💻 Informática';
  }

  textoMensagem.textContent = '';
  mostrarTela(telaJogo);
  mostrarPergunta();
}

// mostra a pergunta atual na tela
function mostrarPergunta() {
  textoProgresso.textContent = 'Pergunta ' + (indiceAtual + 1) + ' de ' + perguntasDaRodada.length;
  textoPergunta.textContent = perguntasDaRodada[indiceAtual].pergunta;
  campoResposta.value = '';
  campoResposta.focus();
}

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault(); // não deixa a página recarregar

  const atual = perguntasDaRodada[indiceAtual];
  const resposta = Number(campoResposta.value);

  if (resposta === atual.resposta) {
    acertos++;
    textoMensagem.textContent = '✔️ Certo! ' + atual.conta;
    textoMensagem.className = 'mensagem certo';
  } else {
    erradas.push(atual.conta);
    textoMensagem.textContent = '✖️ Quase! A resposta é ' + atual.resposta + '. ' + atual.conta;
    textoMensagem.className = 'mensagem errado';
  }

  indiceAtual++;
  if (indiceAtual < perguntasDaRodada.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

// tela final com os acertos
function mostrarResultado() {
  const total = perguntasDaRodada.length;

  let frase = '';
  if (acertos === total) {
    frase = '🏆 Perfeito!';
  } else if (acertos >= 7) {
    frase = '🎉 Muito bem!';
  } else {
    frase = '💪 Continue treinando!';
  }
  textoResultado.textContent = frase + ' Você acertou ' + acertos + ' de ' + total + '.';

  // lista das perguntas que a pessoa errou
  listaRevisar.innerHTML = '';
  for (const conta of erradas) {
    const item = document.createElement('li');
    item.textContent = conta;
    listaRevisar.appendChild(item);
  }

  if (erradas.length === 0) {
    blocoRevisar.classList.add('escondido');
  } else {
    blocoRevisar.classList.remove('escondido');
  }

  mostrarTela(telaFim);
}

// botões
const botoesTema = document.querySelectorAll('.opcao-tema');
for (const botao of botoesTema) {
  botao.addEventListener('click', function () {
    comecarJogo(botao.dataset.tema);
  });
}

document.getElementById('trocar-tema').addEventListener('click', function () {
  mostrarTela(telaTema);
});

document.getElementById('jogar-de-novo').addEventListener('click', function () {
  mostrarTela(telaTema);
});
