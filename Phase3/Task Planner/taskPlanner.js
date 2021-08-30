let http = require("http");
let url = require ("url");
let fs = require ("fs")

// addDelete
// viewTasks

let indexPage = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1>Welcome to Task Planner</h1>
                    <p>What would you like to do?</p>
                    <a href="addDelete">Add/Delete a task</a>
                    <a style = "margin-left:10px" href="viewTasks">View Tasks</a>
                </body>
                </html>`
let addDeletePage = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <h1>ADD A TASK</h1>
                        <form action="addTask">
                            <table>
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td><label for="">Employee Id: </label></td>
                                        <td><input type="text" name = "eid" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="">Task Id: </label></td>
                                        <td><input type="text" name = "taskid" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="">Task: </label></td>
                                        <td><input type="text" name = "taskd" required></td>
                                    </tr>
                                    <tr>
                                        <td><label for="">Deadline: </label></td>
                                        <td><input type="date" name = "deadline" required></td>
                                    </tr>
                                </tbody>
                                <tfoot></tfoot>
                            </table>   
                            <input style = "margin-left:100px" type="submit" value = "Add">
                            <input style = "margin-left:10px" type="reset" value = "Reset">
                        </form>   
                        <h1>DELETE A TASK</h1>
                        <form action = "deleteTask">
                            <label for="">Task Id: </label>
                            <input type="text" name = "taskid_delete" required>
                            <input type="submit" value = "Delete">
                        </form>  
                        <a href = "viewTasks" >View Tasks</a>
                    </body>
                    </html>
                    `
let viewTableUp = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                        <h1>TASKS ADDED</h1>
                        <table border = "1">
                            <thead>
                                <tr>
                                    <th>EMPLOYEE ID</th>
                                    <th>TASK ID</th>
                                    <th>TASK</th>
                                    <th>DEADLINE</th>
                                </tr>
                            </thead>
                            <tbody>
                            `
let viewTable = "";
//let task = {eid,taskid,taskd,deadline}
let tasks = [];

let server = http.createServer((request,response)=>{
    response.writeHead(200,{"content-type":"text/html"});
    let urlInfo = url.parse(request.url,true);
    if(fs.readFileSync("tasks.json".toString()) == ""){
        let empty_tasks = [];
        fs.writeFileSync("tasks.json",JSON.stringify(empty_tasks));
    }
    tasks = JSON.parse(fs.readFileSync("tasks.json".toString()));

    if (urlInfo.path != "/favicon.ico"){
        viewTable = "";
        if(urlInfo.path == "/addDelete"){
            response.write(addDeletePage);
        }else if(urlInfo.path == "/viewTasks"){
            if (tasks.length == 0){
                response.write("<h3 style = 'color:red' >Oops! There are no tasks to show. Please add tasks.</h2><br/>")
                response.write("<a href = 'addDelete'>Go back to add/delete</a>")
            }else{
                let temp_rows = ``;
                for(let tsk of tasks){
                    let row = `<tr>`
                    let column1 = `<td>`+tsk.eid+`</td>`
                    let column2 = `<td>`+tsk.taskid+`</td>`
                    let column3 = `<td>`+tsk.taskd+`</td>`
                    let column4 = `<td>`+tsk.deadline+`</td>`
                    row += column1 + column2 + column3 + column4 + `</tr>`;
                    temp_rows += row;//console.log(tsk.eid);
                }
                viewTable = viewTableUp + temp_rows + `</tbody>
                                        <tfoot></tfoot>
                                    </table>
                                    <a href = "addDelete" >Go to Add/Delete</a> 
                                </body>
                            </html>`
                //<a href = "addDelete" >Go to Add/Delete</a>
                response.write(viewTable);
            }
        }else if(urlInfo.pathname == "/addTask"){
            task = urlInfo.query;
            let element = tasks.find(e => e.taskid == task.taskid)
            if (element == undefined){
                tasks.push(task);
            fs.writeFileSync("tasks.json",JSON.stringify(tasks));
            //console.log(tasks);
            response.write("<h3 style = 'color:blue'>Task '"+ task.taskd + "' was successfully added!</h3><br/>");
            response.write("<a href = 'viewTasks'>ViewTasks</a>")
            }else{
                response.write("<h3 style = 'color:red;'>Sorry, task with id "+ task.taskid +" already exists!</h3><br/>");
                response.write(" <a href = 'addDelete' >Go to Add/Delete</a> ")
            }
            
        }else if (urlInfo.pathname == "/deleteTask"){
            let task = urlInfo.query;
            let index_todelete = tasks.findIndex(c => c.taskid == task.taskid_delete);
            //console.log(index_todelete);
            if (index_todelete == -1){
                response.write("<h3 style = 'color:red'>Oops! There's no task with id " + task.taskid_delete + "</h3><br/>");
                response.write("<a href = 'addDelete'>Go to add/delete</a>");
            }else{
                tasks.splice(index_todelete,1);
                response.write("<h3 style = 'color:blue' >Task with id: " + task.taskid_delete + " has been deleted!</h3><br/>");
                response.write("<a href = 'viewTasks'>ViewTasks</a>")
                fs.writeFileSync("tasks.json",JSON.stringify(tasks));
            }
        }else{
            response.write(indexPage);
        }
    }
    response.end();
})
server.listen(9090,()=>console.log("Server running on port 9090"));

