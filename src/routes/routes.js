const {Router} = require('express');
const passport = require('passport');
const router = Router();

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
module.exports = router;