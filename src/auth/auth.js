const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
  
    if(!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
        return res.status(401).json({ message })
    }

    const token = authorizationHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, privateKey)
        const userId = decodedToken.userId

        if (req.body.userId && req.body.userId !== userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`
            return res.status(401).json({ message })
        } else {
            next()
        }

    } catch (error) {
        const message = `Le jeton est invalide.`
        return res.status(401).json({ message, data: error })
    }
}