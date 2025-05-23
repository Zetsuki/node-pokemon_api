const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null) {
        const message = 'Le pokémon demandé n\'existe pas? Réessayez avec un autre identifiant'
        return res.status(404).json({message})
      }

      const pokemonDeleted = pokemon;
      Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
      .catch(error => {
        const message = 'Le pokémon n\'a pas pu être modifié. Réessayez dans quelques instants.'
        return res.status(500).json({message, data: error})
      })
    })
  })
}