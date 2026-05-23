function calcularSigno(data) {
    const dia = new Date(data).getDate();
    const mes = new Date(data).getMonth() + 1;

    if ((mes == 3 && dia >= 21) || (mes == 4 && dia <= 19)) return "Áries";
    if ((mes == 4 && dia >= 20) || (mes == 5 && dia <= 20)) return "Touro";
    if ((mes == 5 && dia >= 21) || (mes == 6 && dia <= 20)) return "Gêmeos";
    if ((mes == 6 && dia >= 21) || (mes == 7 && dia <= 22)) return "Câncer";
    if ((mes == 7 && dia >= 23) || (mes == 8 && dia <= 22)) return "Leão";
    if ((mes == 8 && dia >= 23) || (mes == 9 && dia <= 22)) return "Virgem";
    if ((mes == 9 && dia >= 23) || (mes == 10 && dia <= 22)) return "Libra";
    if ((mes == 10 && dia >= 23) || (mes == 11 && dia <= 21)) return "Escorpião";
    if ((mes == 11 && dia >= 22) || (mes == 12 && dia <= 21)) return "Sagitário";
    if ((mes == 12 && dia >= 22) || (mes == 1 && dia <= 19)) return "Capricórnio";
    if ((mes == 1 && dia >= 20) || (mes == 2 && dia <= 18)) return "Aquário";

    return "Peixes";
}

function salvarPerfil() {
    const nome = document.getElementById("nomeUsuario").value;
    const data = document.getElementById("dataNascimento").value;

    if (!nome || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    const signo = calcularSigno(data);

    const perfil = {
        nome: nome,
        dataNascimento: data,
        signo: signo
    };

    localStorage.setItem("perfil", JSON.stringify(perfil));

    document.getElementById("resultado-signo").innerText = `${nome}, seu signo é ${signo} ✨`;

    document.getElementById("mensagem-sucesso").innerText = "Perfil salvo com sucesso! ✅";
}

function carregarPerfil() {
    const perfilSalvo = localStorage.getItem("perfil");

    if (!perfilSalvo) return;

    const perfil = JSON.parse(perfilSalvo);

    document.getElementById("nomeUsuario").value = perfil.nome;
    document.getElementById("dataNascimento").value == perfil.dataNascimento;

    document.getElementById("resultado-signo").innerText =
        `Bem-vindo de volta, ${perfil.nome}! Seu signo é ${perfil.signo} ✨`;
}