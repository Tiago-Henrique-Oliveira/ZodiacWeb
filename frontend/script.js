const musica =
  document.getElementById(
    "musica"
  );

const botaoMusica =
  document.querySelector(
    ".botao-musica"
  );

let tocando = false;

function toggleMusica() {

  if (!tocando) {

    musica.volume = 0.4;

    musica.play();

    tocando = true;

    botaoMusica.innerHTML =
      "🔊 Música ON";

  }

  else {

    musica.pause();

    tocando = false;

    botaoMusica.innerHTML =
      "🎵 Música OFF";

  }

}

function descobrirSigno() {

  const data =
    document.getElementById(
      "dataNascimento"
    ).value;

  if (!data) {

    alert("Escolha uma data!");

    return;

  }

  const partes = data.split("-");

  const mes =
    parseInt(partes[1]);

  const dia =
    parseInt(partes[2]);

  let signo = "";

  if (
    (mes == 3 && dia >= 21) ||
    (mes == 4 && dia <= 19)
  ) {

    signo = "Áries";

  }

  else if (
    (mes == 4 && dia >= 20) ||
    (mes == 5 && dia <= 20)
  ) {

    signo = "Touro";

  }

  else if (
    (mes == 5 && dia >= 21) ||
    (mes == 6 && dia <= 20)
  ) {

    signo = "Gêmeos";

  }

  else if (
    (mes == 6 && dia >= 21) ||
    (mes == 7 && dia <= 22)
  ) {

    signo = "Câncer";

  }

  else if (
    (mes == 7 && dia >= 23) ||
    (mes == 8 && dia <= 22)
  ) {

    signo = "Leão";

  }

  else if (
    (mes == 8 && dia >= 23) ||
    (mes == 9 && dia <= 22)
  ) {

    signo = "Virgem";

  }

  else if (
    (mes == 9 && dia >= 23) ||
    (mes == 10 && dia <= 22)
  ) {

    signo = "Libra";

  }

  else if (
    (mes == 10 && dia >= 23) ||
    (mes == 11 && dia <= 21)
  ) {

    signo = "Escorpião";

  }

  else if (
    (mes == 11 && dia >= 22) ||
    (mes == 12 && dia <= 21)
  ) {

    signo = "Sagitário";

  }

  else if (
    (mes == 12 && dia >= 22) ||
    (mes == 1 && dia <= 19)
  ) {

    signo = "Capricórnio";

  }

  else if (
    (mes == 1 && dia >= 20) ||
    (mes == 2 && dia <= 18)
  ) {

    signo = "Aquário";

  }

  else {

    signo = "Peixes";

  }

  document.getElementById(
    "resultadoSigno"
  ).innerHTML =

    `Seu signo é ${signo} ✨`;

}

async function registrar() {

  const nome =
    document.getElementById(
      "cadastroNome"
    ).value;

  const email =
    document.getElementById(
      "cadastroEmail"
    ).value;

  const senha =
    document.getElementById(
      "cadastroSenha"
    ).value;

  const signo =
    document.getElementById(
      "cadastroSigno"
    ).value;

  const resposta =
    await fetch(

      "https://zodiacweb-production.up.railway.app/register",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          nome,
          email,
          senha,
          signo

        })

      }

    );

  const dados =
    await resposta.json();

  alert(dados.mensagem);

}

async function login() {

  const email =
    document.getElementById(
      "loginEmail"
    ).value;

  const senha =
    document.getElementById(
      "loginSenha"
    ).value;

  const resposta =
    await fetch(

      "https://zodiacweb-production.up.railway.app/login",

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

          email,
          senha

        })

      }

    );

  const dados =
    await resposta.json();

  if (resposta.status === 200) {

    localStorage.setItem(
      "usuario",
      email
    );

    mostrarUsuarioLogado(
      email
    );

    alert(dados.mensagem);

  }

  else {

    alert(dados.mensagem);

  }

}

function mostrarUsuarioLogado(email) {

  const painel =

    document.getElementById(
      "painelUsuario"
    );

  painel.style.display =
    "flex";

  document.getElementById(
    "nomeUsuario"
  ).innerHTML =

    email;

}

function logout() {

  localStorage.removeItem(
    "usuario"
  );

  location.reload();

}

window.onload = () => {

  const usuario =

    localStorage.getItem(
      "usuario"
    );

  if (usuario) {

    mostrarUsuarioLogado(
      usuario
    );

  }

};

function verCompatibilidade() {

  const signo1 =
    document.getElementById(
      "signo1"
    ).value;

  const signo2 =
    document.getElementById(
      "signo2"
    ).value;

  let porcentagem = 70;

  if (
    signo1 === signo2
  ) {

    porcentagem = 95;

  }

  if (

    (signo1 === "Áries" &&
      signo2 === "Leão")

    ||

    (signo1 === "Leão" &&
      signo2 === "Áries")

  ) {

    porcentagem = 98;

  }

  document.getElementById(
    "resultadoCompatibilidade"
  ).innerHTML =

    `${signo1} ❤️ ${signo2}
     = ${porcentagem}%`;

}

function abrirModal(signo) {

  const textos = {

    "Áries":
      "Impulsivo, corajoso e cheio de energia.",

    "Touro":
      "Persistente, leal e determinado.",

    "Gêmeos":
      "Comunicativo e inteligente.",

    "Câncer":
      "Emocional e protetor.",

    "Leão":
      "Confiante e criativo.",

    "Virgem":
      "Organizado e perfeccionista.",

    "Libra":
      "Charmoso e pacificador.",

    "Escorpião":
      "Intenso e leal.",

    "Sagitário":
      "Livre, otimista e filósofo.",

    "Capricórnio":
      "Responsável e focado.",

    "Aquário":
      "Humanitário e visionário.",

    "Peixes":
      "Sonhador e artístico."

  };

  document.getElementById(
    "modal"
  ).style.display = "flex";

  document.getElementById(
    "modalTitulo"
  ).innerHTML = signo;

  document.getElementById(
    "modalTexto"
  ).innerHTML =

    textos[signo];

}

function fecharModal() {

  document.getElementById(
    "modal"
  ).style.display = "none";

}

function gerarHoroscopo() {

  const frases = [

    "✨ Hoje será um ótimo dia para novas oportunidades.",

    "💘 O amor pode surpreender você hoje.",

    "🚀 Grandes mudanças estão chegando.",

    "🌙 Escute mais sua intuição.",

    "💼 Seu esforço será recompensado.",

    "🔥 Energia intensa e motivadora hoje.",

    "🧠 Um momento ideal para aprender algo novo.",

    "🌟 Você chamará atenção naturalmente hoje."

  ];

  const aleatorio =

    Math.floor(
      Math.random() *
      frases.length
    );

  document.getElementById(
    "horoscopoResultado"
  ).innerHTML =

    frases[aleatorio];

}

function resultadoQuiz(signo) {

  const mensagens = {

    "Áries":
      "🔥 Você possui energia intensa e espírito de liderança!",

    "Touro":
      "🌱 Você é forte, persistente e confiável!",

    "Gêmeos":
      "🧠 Você possui mente rápida e comunicativa!",

    "Câncer":
      "💖 Você é sensível e protetor!",

    "Leão":
      "👑 Você nasceu para brilhar!",

    "Virgem":
      "📚 Você é inteligente e extremamente organizado!",

    "Libra":
      "⚖️ Você busca o equilíbrio e a justiça!",

    "Escorpião":
      "🦂 Você é magnético e profundamente leal!",

    "Sagitário":
      "🏹 Você é otimista e aventureiro!",

    "Capricórnio":
      "💼 Você é focado em construir bases sólidas para o futuro!",

    "Aquário":
      "✨ Você é original, humanitário e visionário!",

    "Peixes":
      "😍 Você é empático, sonhador e artístico!"

  };

  document.getElementById(
    "resultadoQuiz"
  ).innerHTML =

    mensagens[signo];

}