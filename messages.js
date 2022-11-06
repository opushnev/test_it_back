const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.json({ extended: false })
const router = express.Router();
const Messages = require('./msg.model')

router.use(function log_use(req, res, next) {
    console.log(Date.now())
    next();
})

router.route('/')
    .get((req, res) => {
        Messages.findAll({
                attributes: ['body'],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(data => res.json(data))
            .catch((error) => {
                res.json({});
            })
    })

router.route('/:id')
    .get((req, res) => {
        let d = req.params.id
        console.log('MESSAGE NUMBER');
        res.send(`MESSAGE NUMBER ${d}`);
    })
router.route('/')
    .post(urlencodedParser, (req, res) => {
        // console.log(req);
        let { msg } = req.body;
        Messages.create({
            body: msg
        }).then(res => {
            console.log(res)
        }).catch((error) => {
            console.error('Failed to create a new record : ', error);
        });
        res.send(`MESSAGE ADD ${msg}`);
    })

module.exports = router;