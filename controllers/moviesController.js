const mongoose = require("mongoose");

// Définition du schéma Movie directement ici
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
    year: Number,
    genre: [String],
    rating: Number,
});

// Création du modèle Movie
const Movie = mongoose.model("Movie", movieSchema);

// CRUD
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate("director");
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate("director");
        if (!movie) return res.status(404).json({ msg: "Movie not found" });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMovie) return res.status(404).json({ msg: "Movie not found" });
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ msg: "Movie not found" });
        res.json({ msg: "Movie deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
};
