const express = require("express");

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

app.post("/register", (req, res) => {

  const {

    nome,
    email,
    senha,
    signo

  } = req.body;

  const sql =

    `
    INSERT INTO usuarios
    (nome, email, senha, signo)
    VALUES (?, ?, ?, ?)
    `;

  db.query(

    sql,

    [
      nome,
      email,
      senha,
      signo
    ],

    (erro, resultado) => {

      if (erro) {

        console.log(erro);

        return res.status(500).json({

          mensagem:
            "Erro ao cadastrar!"

        });

      }

      res.json({

        mensagem:
          "Cadastro realizado com sucesso!"

      });

    }

  );

});

app.post("/login", (req, res) => {

  const {

    email,
    senha

  } = req.body;

  const sql =

    `
    SELECT * FROM usuarios
    WHERE email = ?
    AND senha = ?
    `;

  db.query(

    sql,

    [
      email,
      senha
    ],

    (erro, resultado) => {

      if (erro) {

        console.log(erro);

        return res.status(500).json({

          mensagem:
            "Erro no login!"

        });

      }

      if (resultado.length > 0) {

        res.json({

          mensagem:
            "Login realizado!"

        });

      }

      else {

        res.status(401).json({

          mensagem:
            "Email ou senha incorretos!"

        });

      }

    }

  );

});

app.listen(3000, () => {

  console.log(
    "🚀 Servidor rodando na porta 3000!"
  );

});