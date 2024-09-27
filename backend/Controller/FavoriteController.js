const Favorite = require("../Models/Favorite");

const FavoriteController = {};

// Create a new favorite
FavoriteController.createFavorite = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        const foodId= req.params.foodId;
        const {userId}= req.body
        const favorite = await Favorite.findOne({ userId, foodId });
        if (favorite) {
            return res.status(400).json({ message: "Favorite already exists" });
        }
        const newFavorite = await Favorite.create({ userId, foodId });
        res.status(201).json({ newFavorite, message: "Favorite created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all favorites for a user
FavoriteController.getFavorites = async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await Favorite.find({userId}).populate("foodId");
        res.json(favorites);
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
};

// Delete a favorite
FavoriteController.deleteFavorite = async (req, res) => {
    try {
        const foodId= req.params.foodId;
        const {userId}= req.body
        const deletedFavorite = await Favorite.findOneAndDelete({ userId, foodId });
        res.json(deletedFavorite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = FavoriteController