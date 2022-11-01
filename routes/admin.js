const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
require("../models/Times")
require("../models/cadastroUsuarios")
const Time = mongoose.model("times")
const Usuario = mongoose.model("usuarios")


router.get('/', (req,res) => {

    res.render("admin/index")
})

router.get('/apostadores', (req,res) => {
    Usuario.find().then((usuarios) =>{
        res.render("admin/apostadores", {usuarios: usuarios})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os apostadores")
        res.redirect("/admin")
    })
})

router.get('/times', (req,res) => {
    res.render("admin/times")
})

router.get('/times/add', (req, res) => {
    res.render("admin/addtimes")
})

router.post("/times/nova", (req, res) =>{

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({text: "Nome inválido"})
    }

    if(!req.body.grupo || typeof req.body.grupo == undefined || req.body.grupo == null){
        erros.push({text: "Grupo inválido"})
    }

    if(erros.length > 0){
        res.render("admin/addtimes", {erros: erros})
    }else{ 
        const novoTime = {
            nome: req.body.nome,
            grupo: req.body.grupo
        }
    
        new Time(novoTime).save().then(() =>{
            req.flash("success_msg", "Time cadastrao com sucesso")
            res.redirect("/admin/times")
        }).catch((err) => {
            req.flash("erro_mds", "Houve um erro ao salvaro time!, tente novamente")
            console.log("Erro ao salvar time!")
        })
    }
    
})

router.get("/apostadores/edit/:id", (req, res) => {
    Usuario.findOne({_id:req.params.id}).then((usuario) =>{
        res.render("admin/editapostadores", {usuario:usuario})
    }) .catch((err) => {
        req.flash("error_msg", "Este apostador não existe")
        req.redirect("/admin/apostadores")
    })
})

router.post("/apostadores/edit", (req, res) => {
    Usuario.findOne({_id: req.body.id}).then((usuario) => {

        usuario.nome = req.body.nome
        usuario.usuario = req.body.usuario
        usuario.email = req.body.email
        usuario.dtnascimento = req.body.dtnascimento
        usuario.senha = req.body.senha

        usuario.save().then(() => {
            req.flash("success_msg", "Apostadores editados com sucessos")
            res.redirect("/admin/apostadores")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição dos apostadores")
            res.redirect("/admin/apostadores")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar apostadores")
        res.redirect("/admin/apostadores")
    })
})


module.exports = router