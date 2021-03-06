const {Router} = require('express');
const passport = require('passport');
const router = Router();

const fs = require('fs');
const readClients = fs.readFileSync('src/files/clients.json','utf-8');
const readInventory = fs.readFileSync('src/files/inventory.json','utf-8');
const readJobs = fs.readFileSync('src/files/jobs.json','utf-8');

let clients = JSON.parse(readClients);
let inventorys = JSON.parse(readInventory);
let jobs = JSON.parse(readJobs);

router.get('/',(req,res)=>{
    res.render('index.ejs');
});

router.get('/consult',(req,res)=>{
    res.render('consult.ejs');
});

router.get('/register',(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
    }
},(req,res)=>{
    res.render('register.ejs');
});

router.get('/add',(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
    }
},(req,res)=>{
    res.render('add.ejs');
});

router.get('/delete',(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/login');
    }
},(req,res)=>{
    res.render('delete.ejs',{
        clients
    });
});

router.get('/login',(req,res)=>{
    res.render('login.ejs');
});

router.post('/login',passport.authenticate('local',{
    successRedirect:"/register",
    failureRedirect:"/login"
}));

router.get('/Logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
});

router.post('/addClient', (req,res)=>{
    const {nombre,apellido,documento} = req.body;

    if(!nombre || !apellido || !documento){
        res.status(400).send('Datos invalidos');
        return;
    }

    let newClient = {
        nombre,
        apellido,
        documento
    }

    const consulta = clients.find(lista => lista.documento === documento);
    if(consulta){
        res.status(400).send('El cliente ya existe');
    }
    else{
        clients.push(newClient);
    }
    

    const jsonClients = JSON.stringify(clients);
    fs.writeFileSync('src/files/clients.json',jsonClients,'utf-8');


    res.send('recibido');

});

router.get('/deleteClient/:id',(req,res)=>{
    clients = clients.filter(client => client.documento != req.params.id);
    const jsonClients = JSON.stringify(clients);
    fs.writeFileSync('src/files/clients.json',jsonClients,'utf-8');
    res.redirect('/delete');
});
module.exports = router;