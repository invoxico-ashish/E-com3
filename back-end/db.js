const mongoose = require("mongoose");
const { Await } = require("react-router-dom");
const URI = "mongodb://localhost:27017/goFood";
const mongoDB = async() => {
    await mongoose.connect(URI, async(err, res) => {
        if (!err) {
            console.log("Connected");
            const fetch_data = await mongoose.connection.db.collection("foodData");
            fetch_data.find({}).toArray(async(err, data)=> {
                const foodcategory = await mongoose.connection.db.collection("foodCategory");
                foodcategory.find({}).toArray((err,catData)=>{
                    if(err){
                        console.log("error", err);
                    }
                    else{
                        global.foodData = data
                        global.foodcategory = catData
                    }

                })
                // if (err) {
                //     console.log("there is an error", err);
                // }
                //     else {
                //      global.foodData = data;
                //     console.log(data); 
                // }
            
            })
}
        else {
    console.log("Not connected", err);
}

    });
}

module.exports = mongoDB;


// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/GoFood";

// const mongoDB =  ()=>{
//     // mongoose.connect(mongoURI)
//     // mongoose.connect('mongodb://localhost:27017/inotebook', function(err) {
//     //     if (err) throw err;
//     // });

//     mongoose.connect('mongodb://localhost:27017/GoFood');
// }

// module.exports = mongoDB;