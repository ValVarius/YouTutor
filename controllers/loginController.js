const db = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// router.get("/", function (req, res) {
//     res.redirect("/userSignup")
//     res.render("<h1> Signup Please </h1>");
// });
router.post("/login", function (req, res) {
    db.User.findOne({
        where: {
            email: req.body.email
        }
        ,
        include: [db.Teacher, db.Studentpost,db.StudentSkill,db.TeacherSkill]

    }).then(dbUser => {
        if (req.session.user) {
            res.json(dbUser)
        }
        else if (!dbUser) {
            req.session.user = false
            console.log("WRONG USER");
            res.send("WRONG USERNAME")
        }
        else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = dbUser
            console.log("JUST CREATED SESSION ", req);
            res.json(dbUser)
        }
        
        else {
            req.session.user = false
            console.log("WRONG password");
            res.send("WRONG PASSWORD")
        }
    }).catch(err => {
        console.log(err);
        // res.redirect("/userSignup")
    });
});
router.get("/readsessions", (req, res) => {
    res.json(req.session)
})
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.json("logged out!")
})

module.exports = router;

