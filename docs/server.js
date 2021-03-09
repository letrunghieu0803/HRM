const express = require("express");
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const mongoose = require("mongoose")
require('dotenv').config({ path: 'ENV_FILENAME' })
const app = express();
const path = require('path');

const AuthRouter = require("./modules/auth/auth.router")
// console.log(process.env.MONGODB_URI)
mongoose.connect("mongodb+srv://hieult:hieupk123@cluster0.fh1op.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true }, (error)=>{
    if(error) throw error;
    console.log("Connect to MongoDb")
})


app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

app.use(express.static('client'));


app.get('/', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/html/home.html');
    res.sendFile(pathFile)
  });
  app.get('/create', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/html/create.html');
    res.sendFile(pathFile)
  });
  app.get('/update/:idUser', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/html/update.html');
    res.sendFile(pathFile)
  });
//   app.get('/api/games/:idUser', async (req, res) => {
//     const { idUser } = req.params;
//     try {
//       const fo = await GameModel.findById(idUser);
//       if (!foundGame) {
//         return res
//           .status(400)
//           .send({ success: 0, data: null });
//       }
  
//       return res.send({ success: 1, data: foundGame });
      
//     } catch (err) {
//       res
//         .status(500)
//         .send({ success: 0, data: null, message: err });
//     }
//   })
// prefix de confix luong version trang muon nang cap
const prefix = 'api'

app.use(`/${prefix}/auth`,AuthRouter)



app.get('*', (request, response) => {
    response.send({ say: '404' });
  })

app.listen(8080,(error)=>{
    if(error){
        throw error
    }
    console.log("Server Started!!!")
});
