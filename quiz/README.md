# ❓ Quiz Educativo

Quiz de múltipla escolha. Antes de começar você escolhe o tema: **História** ou **Informática**.

São 10 perguntas por rodada e depois de cada resposta aparece uma explicação curta, para aprender mesmo quando erra.

▶️ **[Jogar online](https://irismirelis.github.io/jogos-educativos/quiz/)**

![Print do jogo](print.png)

## Como jogar
1. Abra o `index.html` no navegador.
2. Escolha História ou Informática.
3. Clique na resposta. A certa fica verde.
4. No final aparece quantos pontos você fez.

## Como adicionar uma pergunta
No `script.js`, copie um bloco da lista `perguntas` e troque os textos:
```js
{
  tema: 'historia',
  pergunta: 'Sua pergunta aqui?',
  opcoes: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
  resposta: 'Opção B',
  explicacao: 'Uma frase explicando a resposta.'
},
```

## O que eu usei
- Lista de objetos com as perguntas
- `filter` para pegar só as perguntas do tema
- Botões criados pelo JavaScript

---
Faz parte do projeto [Jogos Educativos](https://github.com/irismirelis/jogos-educativos). Feito por [Iris Mirelis](https://github.com/irismirelis).
