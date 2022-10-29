const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
require("../models/Times")
const Time = mongoose.model("times")


router.get('/', (req,res) => {
    res.render("admin/index")
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


module.exports = router