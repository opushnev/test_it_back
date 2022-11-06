const express = require("express");
const cors = require("cors");
const messages = require("./messages");
const PORT = 9500;
const app = express();

const db = require('./db.js')
db.authenticate()
    .catch(error => console.error(error))

db.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`);
    })

app.use(cors());
app.get("/", (req, res) => {
    res.send('START MESSAGES');
});

app.use('/messages', messages);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});