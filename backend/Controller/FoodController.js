const Food = require("../Models/Food");

const FoodController = {};

// Get all foods
FoodController.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a food by ID
FoodController.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new food
FoodController.createFood = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    const image = req.file.path
    const foods = {...req.body, image}
    const newFood = await Food.create(foods);
    res.status(201).json({ newFood, message: "Food created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a food
FoodController.updateFood = async (req, res) => {
  try {
    let image=req.body.image
    if(req.file){
     image=req.file.path 
    }

    const food = {...req.body, image}
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, food, {
      new: true,
    });
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a food
FoodController.deleteFood = async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    res.json({ deletedFood, message: "Food deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = FoodController;
