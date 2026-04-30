const container = document.getElementById("signos-container");
const detalhes = document.getElementById("detalhes");

function carregarSignos() {
    signos.forEach((signo, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        card.innerHTML = `
        <img src="${signo.imagem}" alt="${signo.nome}">
        <div class="info">${signo.nome}</div>
        `;

        card.onclick = () => mostrarDetalhes(index);

        container.appendChild(card);
    });
}

function mostrarDetalhes(index) {
    const signo = signos[index];

    document.getElementById("nome-signo").innerText = signo.nome;
    document.getElementById("descricao").innerText = signo.descricao;
    document.getElementById("compatibilidade").innerText = "Compatível com: " + signo.compatibilidade;
    document.getElementById("previsao").innerText = "🔮 Previsão: " + gerarPrevisao(signo);
    document.getElementById("banner").style.backgroundImage = `url('${signo.imagem}')`;

    container.style.display = "none";
    detalhes.classList.remove("hidden");
}

function voltar() {
    detalhes.classList.add("hidden");
    container.style.display = "flex";
}

function gerarPrevisao(signo) {
    const frases = [
        `Hoje é um bom dia para ${signo.nome.toLowerCase()} tomar decisões importantes.`,
        `${signo.nome} pode encontrar novas oportunidades inesperadas.`,
        `Evite conflitos hoje, ${signo.nome}. Foque no equilíbrio.`,
        `Um momento positivo está chegando para ${signo.nome}.`,
        `${signo.nome} deve confiar mais na sua intuição hoje.`,
    ];

    const index = Math.floor(Math.random() * frases.length);
    return frases[index];
}

carregarSignos();