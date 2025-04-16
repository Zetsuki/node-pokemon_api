const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json("Hello, Heroku ! ")
})

// Terminaisons
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

// Gestion d'erreurs
app.use((req, res) => {
    const message = 'Impossible de trouver la ressource demandée.'
    res.status(404).json({ message })
})
app.listen(port, () => console.log(`Node app started on : http://localhost:${port}`))