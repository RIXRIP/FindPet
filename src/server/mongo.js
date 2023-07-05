const express = require('express')
const mongoose = require('mongoose').default;
const animalsRouter = require('./routs/animalsRouter')
const authRouter = require('./routs/authRouter')
const cookieParser = require('cookie-parser')
const corsMiddleware = require('./middlewaree/corsMiddleware')
const fileUpload = require("express-fileupload")
const Animal = require("./models/Animal");
const cors = require('cors');
const PORT = process.env.PORT || 8000

const app = express()
const corsOptions ={
    origin:"http://localhost:3000",
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware)
app.use(fileUpload({}))
app.use("/auth", authRouter)
app.use("/animals", animalsRouter)
app.use(express.static('src/server/static'))

const start = async () => {
    try {
            await mongoose.connect(`mongodb+srv://admin123:admin123@cluster0.dwsnlzu.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log('server started ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

start();
let timer = 360;
let timerId = setTimeout(function tick() {
    try {
        console.log("отработала")
        const animals = Animal.find()
        for (let i = 0; i < animals.length; i++) {
            const date1 = new Date(animals[i].dateRegistration);
            const date2 = new Date(Date.now());
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays >= 365) {
                Animal.deleteOne({_id: animals[i]._id})
            }
        }
    } catch (e) {
        console.log(e)
    }
    timer-- ;
    if(timer !== 0){
        timer++;
        timerId = setTimeout(tick, timer*1000);
    }
    else
        console.log('stop');
}, 8640000);

