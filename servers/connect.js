const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://krishnangshusinha15:QLNJYUn3AjSxCULZ@cluster0.ssen8jm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("MongoDB connected successfully"))
.catch(() => console.log("Cant connect database"))