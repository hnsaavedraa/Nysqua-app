const express = require('express');
const router = new express.Router();
const path = require("path");
const multer = require("multer");
const authenticate = require("../middleware/auth");
var fs = require('fs');

const Garment = require('../models/garments');
const { ObjectID } = require('mongodb');


router.post('/add', authenticate, async (req, res) => {

    garment = new Garment({
        idUser: req.user._id,
        category: req.body.category,
        subcategory: req.body.subcategory,
        title: req.body.title,
        description: req.body.description,
        size: req.body.size,
        userperiod: req.body.userperiod,
        color: req.body.color,
        state: req.body.state,
        images: req.body.images,
        tags: req.body.tags
        //postDate: req.boy.postDate
    });
    try {
        await garment.save()
        req.user.addGarment(garment)
        res.send(garment);
    } catch (error) {
        res.status(400).send()
    }
});

//get all the garments that meet with categories, subcategories
router.post('/preferences', authenticate, async (req, res) => {
    req.user
    var categories = req.body.categories
    var subcategories = req.body.subcategories
    var user = req.user._id
    console.log(user)
    console.log(categories)
    console.log(subcategories)
    try {
        var r = await Garment.find({ $and: [{ category: { $in: categories } }, { subcategory: { $in: subcategories } }, { idUser: { $not: { $eq: user } } }] });
        console.log(r);
    } catch (error) {
        console.log(error)
    }

    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }
});

//delete the garment associated to garmentID
router.post('/delete', authenticate, async (req, res) => {
    var garmentID = req.body.garmentID
    var user  = req.user
    console.log(garmentID);
    var r = await Garment.deleteOne({ _id: garmentID },async function (error) {
        if (error) return handleError(error)

        user.garmentList.splice(user.garmentList.indexOf(garmentID), 1);
        await user.save()
        return true
    })
    console.log(r)
    try {
        res.send(r)
    } catch (error) {
        res.status(400).send()
    }
});

//get all the garments that meet with categories, subcategories, size, color
router.get('/search', authenticate, async (req, res) => {
    req.user
    var categories = req.body.categories
    var subcategories = req.body.subcategories
    var size = req.body.size
    var color = req.body.color
    var r = await Garment.find({ $and: [{ category: categories }, { subcategory: subcategories }, { color: color }, { size: size }] });
    console.log(r);
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }

});

//get the garment associated to garmentID
router.post('/get', authenticate, async (req, res) => {
    req.user
    var id = req.body.garmentID
    var r = await Garment.findOne({ _id: id });
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }
});



module.exports = router