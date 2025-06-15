const Category = require("../models/categoryModel")


const createCategory = async(req, res) =>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(400).json({message: "Category name is required"})
        }
     const existingCategory = await Category.findOne({name})   
        if(existingCategory){
            return res.status(409).json({message:"Category already exists"})
        }
        const category = new Category({name})
        await category.save()
        res.status(201).json({message: "Category Created", category})
    } catch (error) {
        res.status(500).json({message:"Server error", error: error.message})
        
    }


}


const getAllCategories = async(req, res)=>{
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message})
    }
}

module.exports = {
    createCategory,
    getAllCategories
}