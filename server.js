const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const { nome, email, senha, signo } = req.body;

    try {
        const senhaHash = await bcrypt.hash(senha, 10);

        const sql = "INSERT INTO usuarios (nome, email, senha, signo) VALUES (?, ?, ?, ?)";

        db.query(sql, [nome, email, senhaHash, signo], (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send("Usuário cadastrado!");
            }
        });

    } catch (erro) {
        res.status(500).send(erro);
    }
});

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).send(err);

        if (result.length === 0) {
            return res.status(401).send("Usuário não encontrado");
        }

        const usuario = result[0];

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).send("Senha incorreta");
        }

        res.json({
            mensagem: "Login realizado!",
            usuario: {
                nome: usuario.nome,
                signo: usuario.signo
            }
        });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor rodando!");
})