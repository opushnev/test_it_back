const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.json({ extended: false })
const router = express.Router();
const { Op } = require('sequelize')
const Messages = require('./msg.model')

//ПОЛУЧЕНИЕ ВСЕХ СООБЩЕНИЙ
router.route('/')
    .get((req, res) => {
        Messages.findAll({
                attributes: ['body'],
                order: [
                    ['createdAt', 'ASC']
                ]
            })
            .then(data => res.json(data))
            .catch((error) => {
                res.json({});
            })
    })
    // ПОИСК ПО СООБЩЕНИЯМ
router.route('/:id')
    .get((req, res) => {
        let d = req.params.id
        console.log(d);
        Messages.findAll({
                where: {
                    body: {
                        [Op.iLike]: `%${d}%`
                    }
                }
            })
            .then(data => res.json(data))
            .catch((error) => {
                res.json({});
            })
    })

// ЗАПИСЬ СООБЩЕНИЯ В БАЗУ ДАННЫХ
router.route('/')
    .post(urlencodedParser, (req, res) => {
        let { msg } = req.body;
        Messages.create({
            body: msg
        }).then(res => {
            res.json({});
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
            res.json({});
        });
    })

module.exports = router;