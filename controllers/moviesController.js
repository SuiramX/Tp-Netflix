const mongoose = require("mongoose");

// Définition du schéma Movie
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
    year: Number,
    genre: [String],
    rating: Number,
});

// Création du modèle Movie
const Movie = mongoose.model("Movie", movieSchema);

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Gestion des films
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Récupère la liste de tous les films
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Liste des films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Erreur serveur
 */
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find().populate("director");
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Récupère un film par son ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film
 *     responses:
 *       200:
 *         description: Détails du film
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur serveur
 */
const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate("director");
        if (!movie) return res.status(404).json({ msg: "Movie not found" });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Crée un nouveau film
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Film créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Erreur dans la requête
 */
const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Met à jour un film existant
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Film mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Film non trouvé
 *       400:
 *         description: Erreur dans la requête
 */
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

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Supprime un film
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du film
 *     responses:
 *       200:
 *         description: Film supprimé avec succès
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur serveur
 */
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
    Movie,
};
