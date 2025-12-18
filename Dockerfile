# Image de base
FROM node:20

# Dossier de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le projet
COPY . .

# Expose le port de l'app
EXPOSE 3000

# Démarrage
CMD ["node", "index.js"]
