const express = require("express");
const router = express.Router();
const Product =require("../models/Products");
const { getProducts, addProduct } = require("../controller/productController"); // make sure folder is 'controller', not 'controllers'
const { Products } = require("../models/Products");

// GET all products
// router.get("/", getProducts);
router.get("/",async(req,res)=>{
    try{
        const{search,category,sort,page=1,limit=6}=req.query;
        const query={};
        if(search){
            query.name={$regex:search,$options:"i"};
        }
        if(category){
            query.category=category;
        }
        let sortOption ={};
        if(sort === "price_asc") sortOption =1;
        else if(sort === "price_dec") sortOption=-1;
        const Product =await Product.find(query)
        .sort(sortOption)
        .skip((page -1)* limit)
        .limit(Number(limit));
        res.json(Products);

    }catch(err){
        res.status(500).json({message:err.message});

    }
});

// POST add product
router.post("/",async(req,res)=>{
    try{
        const newProduct =new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);

    }catch(err){
        res.status(500).json({message:err.message});
    }
});

module.exports = router;
