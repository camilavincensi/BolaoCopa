const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
require("../models/cadastroUsuarios")
const Usuario = mongoose.model("usuarios")


router.get('/', (req,res) => {
    res.render("apostador/index")
})

router.get('/cadastro', (req,res) => {
    res.render("apostador/cadastro")
})

router.get('/cadastro/add', (req, res) => {
    res.render("apostador/addapostador")
})

router.post("/cadastro/nova", (req, res) =>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text: "Nome inválido"})
    }

    if(!req.body.usuario || typeof req.body.usuario == undefined || req.body.usuario == null){
        erros.push({text: "Usuario inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({text: "E-mail inválido"})
    }
    if(!req.body.dtnascimento || typeof req.body.dtnascimento == undefined || req.body.dtnascimento == null){
        erros.push({text: "Data de Nascimento inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({text: "Senha inválida"})
    }

    if(erros.length > 0){
        res.render("apostador/addapostador", {erros: erros})
    }else{ 
        const novoUsuario = {
            nome: req.body.nome,
            usuario: req.body.usuario,
            email: req.body.email,
            dtnascimento: req.body.dtnascimento,
            senha: req.body.senha
        }
        new Usuario(novoUsuario).save().then(() =>{
            req.flash("success_msg", "Usuario cadastrado com sucesso")
            res.redirect("/apostador/index")
        }).catch((err) => {
            req.flash("erro_mds", "Houve um erro ao salvaro time!, tente novamente")
            console.log("Erro ao salvar time!")
        })
    }
    
})


module.exports = router