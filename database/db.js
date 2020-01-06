const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('sql9317476', 
                                'sql9317476', 
                                'sKFqPx55ky', {
  host: 'sql9.freemysqlhosting.net',
  dialect: 'mysql',
  logging: console.log,
  freezeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
