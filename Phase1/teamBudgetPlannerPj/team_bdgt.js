function clearData() {
    document.getElementById("client").value = "";
    document.getElementById("project").value = "";
    document.getElementById("budget").value = "";
}
function clear_crtsy_msg(){
    document.getElementById('crtsy_msg').innerHTML = "";
}

function addData() {
    let index= localStorage.length +1;
    var client_n = document.getElementById("client").value;
    var project_n = document.getElementById("project").value;
    var budget_n = document.getElementById("budget").value;
    var new_itemfortable = {
        client: client_n,
        project: project_n,
        budget: budget_n
    };
    localStorage.setItem(index.toString(),JSON.stringify(new_itemfortable));
    
    //clear text boxes after one entry is read
    document.getElementById("client").value = "";
    document.getElementById("project").value = "";
    document.getElementById("budget").value = "";
    document.getElementById('crtsy_msg').innerHTML = "<h6 style = 'color: blue' >Project " 
    + project_n + " added! </h6>";
}

function displayData() {
    //let objJson = localStorage.getItem("new_obj");
    //console.log(objJson);
    var tableContent = "";
    var startTable = "<table border = 1><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>";
    var total_budget = 0;

    let dollarUS = Intl.NumberFormat("en-US",{style: "currency", currency: "USD",});
    
    for (var i=1; i <=localStorage.length; i++)
    {
        let item_Json = localStorage.getItem(i);
        let item_reg = JSON.parse(item_Json);

        tableContent += "<tr><td>" + item_reg.client + "</td><td>" 
        + item_reg.project + "</td><td>" + dollarUS.format(Number(item_reg.budget)) + "</td></tr>";
        
        total_budget += Number(item_reg.budget);
    }


    var endTable = "</table></br><h3>Total Budget is " + dollarUS.format(total_budget) + "</h3></br>";
    tableContent = startTable + tableContent + endTable;
    document.getElementById('table_showing').innerHTML = tableContent;
}

function goToMain() {
    window.location.href = "team_bdgtMain.html"
}