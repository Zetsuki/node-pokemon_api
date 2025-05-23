const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déja pris.'
        },
        validate : {
          notEmpty: { msg: 'Le nom ne peut pas être vide.'},
          notNull: { msg: 'Le nom est une propriété requise.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
          notNull: { msg: 'Les points de vie sont une propriété requise.'},
          min: {args: [0], msg: 'Le nombre de points de vie doit être supérieur ou égal à 0.'},
          max: {args: [999], msg: 'Le nombre de points de vie doit être inferieur ou égal à 999.'},
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de dégâts.'},
          notNull: { msg: 'Les points de dégâts sont une propriété requise.'},
          min: {args: [0], msg: 'Le nombre de dégâts doit être supérieur ou égal à 0.'},
          max: {args: [99], msg: 'Le nombre de dégâts doit être inferieur ou égal à 99.'},
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          isUrl: { msg: 'L\'URL de l\'image du pokemon n\'est pas valide.'},
          notNull: { msg: 'L\'URL de l\'image du pokemon est une propriété requise.'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValide(value) {
            if(!value) {
              throw new Error('Un pokémon doit au moins avoir un type.')
            }
            if(value.split(',').length > 3) {
              throw new Error('Un pokémon ne peux pas avoir plus de trois types')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)) {
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            });
          }
        }

      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }