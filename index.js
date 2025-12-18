const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const Movie = require("./controllers/moviesController").Movie; // Importe le modèle Movie

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Configuration de Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de gestion des films",
            version: "1.0.0",
            description: "Une API pour gérer les films et leurs réalisateurs",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            schemas: {
                Movie: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            description: "ID du film",
                        },
                        title: {
                            type: "string",
                            description: "Titre du film",
                        },
                        director: {
                            type: "string",
                            description: "ID du réalisateur",
                        },
                        year: {
                            type: "integer",
                            description: "Année de sortie du film",
                        },
                        genre: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "Genres du film",
                        },
                        rating: {
                            type: "number",
                            description: "Note du film",
                        },
                    },
                },
            },
        },
    },
    apis: ["./controllers/*.js"],
};

const specs = swaggerJsdoc(options);

// Route pour la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Route racine : affiche la liste des films
app.get("/", async (req, res) => {
    try {
        const movies = await Movie.find().populate("director");
        res.json(movies);
    } catch (err) {
        console.error("Erreur lors de la récupération des films :", err);
        res.status(500).send(`Erreur lors de la récupération des films : ${err.message}`);
    }
});

// Routes
app.use("/api/movies", require("./routes/movies"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
