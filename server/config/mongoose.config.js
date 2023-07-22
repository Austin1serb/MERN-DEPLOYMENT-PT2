mongoose  = require("mongoose");



const username = process.env.ATLAS_USERNAME
const password = process.env.ATLAS_PASSWORD
const cluster = process.env.ATLAS_CLUSTER
const db = process.env.ATLAS_DB

//WAS NOT WORKING THE OTHER WAY
const connectionString =`mongodb+srv://serbaustin:asd123@cluster0.miragf2.mongodb.net/exam?retryWrites=true&w=majority`;


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(()=>console.log(`Established connection----------------------------------------------------------------${db}`))
.catch(err => console.log("Mongoose connection Failed!!",err))