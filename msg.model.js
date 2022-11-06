const { DataTypes } = require('sequelize')
const db = require('./db')

const Messages = db.define('message', {
    msg_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Messages