const express = require("express");

const bcrypt = require("bcrypt");

const mysql = require("mysql2");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({

  host: process.env.DB_HOST,

  user: process.env.DB_USER,

  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME

});

db.connect((erro) => {

  if (erro) {

    console.log("❌ Erro MySQL:");

    console.log(erro);

    return;

  }

  console.log("✅ MySQL conectado!");

});

app.get("/", (req, res) => {

  res.json({

    mensagem:
      "Servidor funcionando!"

  });

});

app.post("/register", async (req, res) => {
    const { nome, email, senha, signo } = req.body;
    
    try {
      const senhaHash = await bcrypt.hash(senha, 10);

      const sql = `
          INSERT INTO usuarios
          (nome, email, senha, signo)
          VALUES (?, ?, ?, ?)
      `;

      db.query(sql, [nome, email, senhaHash, signo], (err) => {
          if (err) {
              console.log(err);
              return res.status(500).json({ erro: "Erro ao cadastrar" });
          }

          res.json({ mensagem: "Usuário cadastrado!" });
      });

    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro interno" });
    }
});

app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ?";

    db.query(sql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                erro: "Erro no servidor"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                erro: "Usuário não encontrado"
            });
        }

        const usuario = results[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                erro: "Senha incorreta"
            });
        }

        res.json({
            mensagem: "Login realizado!",
            usuario
        });

    });

});

app.listen(3000, () => {

  console.log(
    "🚀 Servidor rodando na porta 3000!"
  );

});