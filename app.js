//carregando modulos
    const express = require('express');
    const handlebars = require('express-handlebars')
    const app = express();
    const admin = require("./routes/admin")
    const apostador = require("./routes/apostador")
    const path = require("path");
    const db_mongoose = require('./config/db_mongoose');
    const mongoose = require("mongoose")
    const session = require("express-session")
    const flash = require("connect-flash")

//configuração
    //sessão
        app.use(session({
            secret:"bolaocopa",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    //bodyParser
        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
    //Handlebars
        app.engine('handlebars', handlebars.engine({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },    
    }))
        app.set('view engine', 'handlebars');
    //mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(db_mongoose.connection, {
        useUnifiedTopology: true, useNewUrlParser: true
    }).then(() => {
        console.log('conectado');
    }).catch((erro) => {
        console.log(erro);
    });
    //Public
        app.use(express.static(path.join(__dirname, "public")))
    //rotas
//prefixo da rota admin
    app.use('/admin', admin)
//prefixo da rota apostador
    app.use('/apostador', apostador)
//chamar as rotas abaixo das config

//outros
    const PORT = 8081
    app.listen(PORT, () => {
        console.log("Servidor rodando")
    })