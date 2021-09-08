let express = require("express");
let app = express();
let port = 9090;
let bodyParser = require("body-parser");

let table = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Courses</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
    <h1 style = "text-align: center;">Let's take a look at the courses!</h1>
    <table id = "list_courses" border = "1">
        <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Amount</th>
        </tr>       
`

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let url = "mongodb://localhost:27017/schoolAdmin";


mongoose.pluralize(null);

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// app.use(cors());
mongoose
  .connect(url)
  .then((res) => console.log("connected to database"))
  .catch((err) => console.log(err));
let db = mongoose.connection;

//db.once("open",()=>{
let courseSchema = mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
  amount: Number,
});

let courseModel = mongoose.model("Course", courseSchema);
let courses_count = 0;
courseModel.countDocuments({},(err,count)=>{
   if (err){return handleError(err)}
   courses_count = count;
})

app.get("/", (request, response) => {
  response.sendFile(__dirname + "\\main.html");
});

app.get("/deleteP", (request, response) => {
  response.sendFile(__dirname + "\\delete.html");
});

app.get("/updateP", (request, response) => {
  response.sendFile(__dirname + "\\update.html");
});
app.get("/addP", (request, response) => {
  response.sendFile(__dirname + "\\add.html");
});

app.get("/viewP", (request, response) => {
  //response.sendFile(__dirname + "\\table.html");
  
  courseModel.find({},(err,doc)=>{
    let temp_row = "";
    let temp_table = "";
    if (!err){
        if (courses_count != 0){
            doc.forEach(co=>{
                temp_row = `<tr>
                                <td>${co._id}</td>
                                <td>${co.name}</td>
                                <td>${co.description}</td>
                                <td>${co.amount}</td>
                            </tr>`
                temp_table += temp_row;
                //console.log(rec); display all attributes
            })
            response.send(table +temp_table+  `</table>   
                                    </body>
                                </html>`);
        }else{
            response.send("<h2>There are no courses added to the database.Please add courses.</h2>")
        }   
    }else{
        console.log(err);
    }
  })
  
});

app.post("/addCourse", (request, response) => {
  let temp_course = new courseModel(request.body);
  courseModel.insertMany([temp_course], (err, result) => {
    if (!err) {
        response.send("<h2>Course added!</h2>");
    } else{
        response.send("<h2>Course didn't add!</h2>");
    }
    //mongoose.disconnect();
  });
  //console.log(id_exists(request.body._id))
 

});
app.post("/updateCourse", (request, response) => {
    //console.log("inf0"+ request.query.id_update + request.query.amount_update)
    //console.log(request.body.id_update);
    courseModel.updateOne({_id:request.body.id_update},{$set:{amount:request.body.amount_update}},(err,result)=>{
        if (!err){
            if(result.modifiedCount >0 || result.matchedCount >0){
                response.send("<h2>Course updated successfully! </h2>")
            }else{
                response.send("<h2>Course didn't update, please check your responses.</h1>")
            }
        }else{
            console.log(err);
        }
    })
    
})

app.post("/deleteCourse", (request, response) => {
    courseModel.deleteOne({_id:request.body.id_delete},(err,result)=>{
        if (!err){
            if(result.deletedCount>0){
                response.send("<h2>Course deleted succesfully!</h2>");
            }else{
                response.send("<h2>Course not present!</h2>");
            }
        }else{
            console.log(err);
        }
    })
})

// function id_exists (id){
//     courseModel.exists({_id:id},(err,result)=>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log("result:",result)
//         }
//     })
// }


app.listen(port, () => console.log("Server running on port number " + port));

