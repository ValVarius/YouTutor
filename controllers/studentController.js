const db = require("../models");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.delete("/api/userskillsdelete", function (req, res) {
   console.log(req.session.user.id);
    
db.StudentSkill.destroy({
    where: {
        UserId: req.session.user.id
    }
}).then(result => {
    console.log("DELETED STUFF: " + result);
    res.json(result)
}).catch(err => {
    console.log(err);
    res.status(500).json(err);
});

   
})
// Create student skills
router.post("/api/userskills", function (req, res) {
    if(req.body) {
        req.body.forEach(newSkill => {
            db.StudentSkill.create({
                skill: newSkill,
                UserId: req.session.user.id
    }).then(result => {
        //console.log(result);
        res.json(result)
    }).catch(err => {
        console.log(err);
        
    });
})
}})


//get all the posts

router.get("/posts/user", function (req, res) {
    res.send("see all posts");
});

//get all users own posts
router.get("/posts/saved", function (req, res) {
    //console.log("hi");
    db.Studentpost.findAll({
        where: {
            email: req.session.user.id
        }
    }).then(function (savedPost) {
        res.json(savedPost)

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// new posts route

router.post("/posts", function (req, res) {
        console.log(req.body.about);
        
    db.Studentpost.create({
        about: req.body.about,
        UserId: req.session.user.id

    }).then(function (newPost) {
        // console.log(newPost);
        
        res.json(newPost)
    }).catch(err => {
        //console.log(err);
        res.status(500).json(err);
    });
})


router.delete("/posts/:delete", function (req, res) {
    db.Studentpost.destroy({

        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete("/posts/delete/currentuser", function (req, res) {
    db.Studentpost.destroy({

        where: {
            UserId: req.session.user.id
        }
    }).then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})


module.exports = router;