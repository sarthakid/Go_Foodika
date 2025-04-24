const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://GoFoodika:Test1234@cluster0.qlapz.mongodb.net/GoFoodMern?retryWrites=true&w=majority&appName=Cluster0'
const mongoDB = async () => {

    await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected successfully");
            const fetched_data = mongoose.connection.db.collection("Food_Items");
            fetched_data.find({}).toArray(function(err, data){
                const FoodCategory = mongoose.connection.db.collection("Food_Category");
                FoodCategory.find({}).toArray(function(err, catData){
                    if (err) console.log(err);
                    else {
                        global.Food_Items = data;
                        global.Food_Category = catData;
                    }
                })
                
            })

        }
    });

}
module.exports = mongoDB;

