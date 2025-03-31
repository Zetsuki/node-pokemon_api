const express = require('express')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express !'))

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.send(`Le pokémon est ${pokemon.name}`)
})

app.get('/api/pokemons', (req, res) => {
    res.send(`Il y a actuellement ${pokemons.length} pokémon dans le pokedex.`)
})

app.listen(port, () => console.log(`Node app started on : http://localhost:${port}`))