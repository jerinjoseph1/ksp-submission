const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const multer  = require('multer');

const app = express();
var ObjectID = require('mongodb').ObjectId;

app.use(cors())


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

var upload = multer({ dest:__dirname + "/uploads" });


mongoose.set('strictQuery', true)

var ObjectID = require('mongodb').ObjectId;
var {icjrsModel} = require('./mongoose/models/icjrs');
const {statePoliceModel} = require('./mongoose/models/state_police');

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port:${process.env.PORT}`);
});


app.post("/findPerson", upload.fields([{name:"Photo_Full_front",maxCount:1},{name:"Fingerprint",maxCount:1}]), async (req, res) => {

    console.log(req.body)
    console.log(req.files)
    
    // let key = req.body.key
    // let keyword = (typeof req.body.keyword == String) ? { '$regex': req.body.keyword, $options: 'i' } : req.body.keyword

    let query = JSON.parse(JSON.stringify(req.body));

    for(var key in query) {
        if(query[key] === "") {
           delete query[key]
        }
    }

    console.log(query)
    
    try {
        const stateResult = await statePoliceModel.find({
            // [key]: keyword
            $and:[query]
        })

        console.log(stateResult)

        if (stateResult.length==0) {
            console.log("here")
            const icjrsResult = await icjrsModel.find({ $and:[query] })
            if (icjrsResult.length==0)
                return res.json({ status: 404, message: "No data found" }).end()
            else
                return res.json({status: 200, message: "Found in icjrs", result: icjrsResult}).end()
        } 

        else {
            const icjrsResult = await icjrsModel.find({ $and:[query] })
            if (icjrsResult.length==0)
                return res.json({status: 200, message: "Found in state db", result: stateResult}).end()
            return res.json({status: 200, message: "Found in state db & icjrs", result: stateResult}).end()

        }
    } 
    catch (error) {
      return res.json({ status: 500, message: "Error", error:error}).end();
    }
});


app.get('/getPerson/:id', async(req,res)=>{
     statePoliceModel.findOne({'_id':req.params.id}, function(err,result){
        if(err)
            return res.json({status:500}).end()
        return res.json({status:200,result:result}).end()  
     }) 
})