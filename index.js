const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
    apis: ["./controllers/*.js"], // Chemin vers les fichiers contenant les commentaires JSDoc
};

const specs = swaggerJsdoc(options);

// Route pour la documentation Swagger
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API des films ! Pour accéder à la documentation, visitez <a href='/api-docs'>/api-docs</a>");
});
app.use("/api/movies", require("./routes/movies"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
