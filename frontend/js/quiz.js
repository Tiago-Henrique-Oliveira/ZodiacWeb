const perguntas = [
    {
        pergunta: "O que você prefere fazer no tempo livre?",
        respostas: [
            { texto: "Aventuras", signo: "Áries" },
            { texto: "Relaxar", signo: "Touro" },
            { texto: "Conversar", signo: "Gêmeos" },
            { texto: "Ficar em casa", signo: "Câncer" }
        ]
    },
    {
        pergunta: "Como você lida com problemas?",
        respostas: [
            { texto: "Enfrento direto", signo: "Áries" },
            { texto: "Com calma", signo: "Touro" },
            { texto: "Analiso tudo", signo: "Virgem" },
            { texto: "Com emoção", signo: "Câncer" }
        ]
    },
    {
        pergunta: "Qual modalidade mais te define?",
        respostas: [
            { texto: "Coragem", signo: "Áries" },
            { texto: "Paciência", signo: "Touro" },
            { texto: "Inteligência", signo: "Aquário" },
            { texto: "Sensibilidade", signo: "Peixes" }
        ]
    }
];

let perguntaAtual = 0;
let pontuacao = {};

function carregarPergunta() {
    const perguntaObj = perguntas[perguntaAtual];

    document.getElementById("pergunta").innerText = perguntaObj.pergunta;

    const respostasDiv = document.getElementById("respostas");
    respostasDiv.innerHTML = "";

    perguntaObj.respostas.forEach(resposta => {
        const btn = document.createElement("button");
        btn.innerText = resposta.texto;

        btn.onclick = () => selecionarResposta(resposta.signo);

        respostasDiv.appendChild(btn);
    });
}

function selecionarResposta(signo) {
    pontuacao[signo] = (pontuacao[signo] || 0) + 1;

    proximaPergunta();
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultadoQuiz();
    }
}

function mostrarResultadoQuiz() {
    let maiorPontuacao = 0;
    let signoFinal = "";

    for (let signo in pontuacao) {
        if (pontuacao[signo] > maiorPontuacao) {
            maiorPontuacao = pontuacao[signo];
            signoFinal = signo;
        }
    }

    document.getElementById("pergunta").innerText = "Resultado final 🎉";
    document.getElementById("respostas").innerHTML = "";

    document.getElementById("resultado-quiz").innerText = `Seu signo seria: ${signoFinal} ✨`;
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = {};
    document.getElementById("resultado-quiz").innerText = "";
    carregarPergunta();
}