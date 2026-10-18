// Linha do Tempo
// Iris Mirelis

const QUANTIDADE_POR_RODADA = 6;

// o mesmo ano não pode repetir dentro do tema
const temas = {
  historia: [
    { ano: 1500, texto: 'Chegada dos portugueses ao Brasil' },
    { ano: 1549, texto: 'Fundação de Salvador, a primeira capital' },
    { ano: 1792, texto: 'Execução de Tiradentes' },
    { ano: 1808, texto: 'Chegada da família real portuguesa ao Brasil' },
    { ano: 1822, texto: 'Independência do Brasil' },
    { ano: 1888, texto: 'Assinatura da Lei Áurea' },
    { ano: 1889, texto: 'Proclamação da República' },
    { ano: 1960, texto: 'Inauguração de Brasília' },
    { ano: 1988, texto: 'Promulgação da Constituição atual' }
  ],
  informatica: [
    { ano: 1946, texto: 'Apresentação do ENIAC, um dos primeiros computadores eletrônicos' },
    { ano: 1971, texto: 'Envio do primeiro e-mail entre computadores em rede' },
    { ano: 1981, texto: 'Lançamento do computador pessoal IBM PC' },
    { ano: 1985, texto: 'Lançamento do Windows 1.0' },
    { ano: 1991, texto: 'A World Wide Web (WWW) é aberta ao público' },
    { ano: 1995, texto: 'Início da internet comercial no Brasil' },
    { ano: 1998, texto: 'Fundação do Google' },
    { ano: 2007, texto: 'Lançamento do primeiro iPhone' }
  ]
};

// elementos da página
const telaTema = document.getElementById('tela-tema');
const telaJogo = document.getElementById('tela-jogo');
const textoTema = document.getElementById('tema-atual');
const divOpcoes = document.getElementById('opcoes');
const listaLinha = document.getElementById('linha');
const textoErros = document.getElementById('erros');
const textoMensagem = document.getElementById('mensagem');

// variáveis do jogo
let tema = '';
let ordemCerta = []; // acontecimentos do mais antigo para o mais recente
let proximo = 0;     // qual deles tem que ser clicado agora
let erros = 0;

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
function escolherTema(temaEscolhido) {
  tema = temaEscolhido;

  if (tema === 'historia') {
    textoTema.textContent = '📜 História do Brasil';
  } else {
    textoTema.textContent = '💻 História da Informática';
  }

  telaTema.classList.add('escondido');
  telaJogo.classList.remove('escondido');
  comecarRodada();
}

// volta para a tela de escolher o tema
function trocarTema() {
  telaJogo.classList.add('escondido');
  telaTema.classList.remove('escondido');
}

// sorteia os acontecimentos da rodada
function comecarRodada() {
  const sorteados = embaralhar(temas[tema]).slice(0, QUANTIDADE_POR_RODADA);

  // copia a lista e ordena pelo ano
  ordemCerta = sorteados.slice().sort(function (a, b) {
    return a.ano - b.ano;
  });

  proximo = 0;
  erros = 0;
  textoErros.textContent = 0;
  textoMensagem.textContent = '';
  textoMensagem.className = 'mensagem';
  listaLinha.innerHTML = '';
  divOpcoes.innerHTML = '';

  for (const acontecimento of sorteados) {
    const botao = document.createElement('button');
    botao.className = 'acontecimento';
    botao.textContent = acontecimento.texto;
    botao.addEventListener('click', function () {
      escolher(botao, acontecimento);
    });
    divOpcoes.appendChild(botao);
  }
}

// confere se a pessoa clicou no acontecimento mais antigo
function escolher(botao, acontecimento) {
  if (acontecimento === ordemCerta[proximo]) {
    // acertou: sai da lista e entra na linha do tempo com o ano
    botao.remove();

    const item = document.createElement('li');
    item.innerHTML = '<span class="ano">' + acontecimento.ano + '</span>' + acontecimento.texto;
    listaLinha.appendChild(item);

    proximo++;
    textoMensagem.textContent = '';

    if (proximo === ordemCerta.length) {
      terminar();
    }
  } else {
    erros++;
    textoErros.textContent = erros;
    textoMensagem.textContent = '🤔 Ainda não! Existe um acontecimento mais antigo que esse.';
    textoMensagem.className = 'mensagem errado';

    // o botão fica vermelho e treme
    botao.classList.add('tremer');
    setTimeout(function () {
      botao.classList.remove('tremer');
    }, 400);
  }
}

// mensagem do final da rodada
function terminar() {
  if (erros === 0) {
    textoMensagem.textContent = '🏆 Perfeito! Você montou a linha do tempo sem nenhum erro!';
  } else {
    textoMensagem.textContent = '🎉 Linha do tempo completa! Você errou ' + erros + ' vez(es).';
  }
  textoMensagem.textContent += ' Clique em Nova rodada para jogar de novo.';
  textoMensagem.className = 'mensagem certo';
}

// botões
const botoesTema = document.querySelectorAll('.opcao-tema');
for (const botao of botoesTema) {
  botao.addEventListener('click', function () {
    escolherTema(botao.dataset.tema);
  });
}

document.getElementById('trocar-tema').addEventListener('click', trocarTema);
document.getElementById('nova-rodada').addEventListener('click', comecarRodada);
