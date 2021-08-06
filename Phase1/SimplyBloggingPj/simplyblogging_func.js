var items = 0;
var cell_content = "";
var content = "";
//var articles_array = [];
function addBlogs() {
    items ++;
    /*var a_title = document.getElementById("title").value;
    var a_content = document.getElementById("articles").value;
    var a_image = document.getElementById("image_url").value;
    /*var new_articles_array = {
        article_title : a_title,
        article_content: a_content,
        image_url: a_image
    };*/

    var article_title = document.getElementById("title").value;
    var article_content = document.getElementById("articles").value;
    var image_url= document.getElementById("image_url").value;

    //articles_array.push(new_articles_array);
    

    
    cell_content += "<h3>" + article_title + "</h3></br><p>" + 
        article_content + "</p></br>";
    cell_content += "<img style = 'display:block;' width = '100%' height = '100%' src='" + 
    image_url + "' alt='" + article_title + " image'>";
    
    //document.getElementById(toString(items)).innerHTML += content;
    /*
    var content = "<div class = 'row' style = 'border: red solid 1px'><div class = 'col-4'>" + cell_content + "</div>"
    document.getElementById('container').innerHTML += content;*/
    content = "";

    let mod =items % 3;
    switch (mod){
        case (1):
            content = "<div class = 'row'><div class = 'col-4' style = 'background-color: #99738E'>" +cell_content + "</div>";
            break;
        case (2):
            content = "<div class = 'col-4' style = 'background-color: #553D67'>" + cell_content + "</div>"
            break;
        case (0):
            content = "<div class = 'col-4' style = 'background-color: #F64C72'>" + cell_content + "</div>"
            break;
    
    }
    document.getElementById('con').innerHTML += content;
    console.log(items%3 ==1)
    //console.log(articles_array);

    /*for (let i = 0; i < articles_array.length ; i++)
    {
        
        //console.log(cell_content);

        switch (i){
            case (i%3 == 1):
                content = "<div class = 'row' style = 'border: red solid 1px'><div class = 'col-4'>" +cell_content + "</div>";
                break;
            case (i%3 == 2):
                content = "<div class = 'col-4'>" + cell_content + "</div>"
                break;
            case (i%3 == 0):
                content = "<div class = 'col-4'>" + cell_content + "</div></div>"
                break;
        
        }
        //console.log(content);
        document.getElementById('containers').innerHTML += content;
    }
    document.getElementById('containers').innerHTML += '</div>'*/


    
}
function createContainer(){
    let container = "<div class = 'container' style= 'border:black solid 1px'>";
    document.getElementById('containers').innerHTML = container;
}

    

function clearData() {
    document.getElementById("title").value = "";
    document.getElementById("articles").value = "";
    document.getElementById("image_url").value = "";
}
/*
function displayData() {
    let cell_content = "";
    let create_container = "";
    document.getElementById('containers').innerHTML = "";
    create_container = "<div class = 'container' style= 'border:black solid 1px'>";
    document.getElementById('containers').innerHTML = create_container;
    for (let i = 0; i < articles_array.length; i++) {
        let article_title = articles_array[i].a_title;
        let article_content = articles_array[i].a_content;
        let image_url = articles_aray[i].a_image;
        cell_content += "<h3>" + article_title + "</h3></br><p>" + article_content + "</p></br>";
        cell_content += "<img style = 'display:block;' width = '100%' height = '100%' src='" + image_url + "' alt='" + title + "image'>";

        var table_creation = "";

        if (i%3 == 0) {
            table_creation = "<div class = 'row' style = 'border: red solid 1px'><div class = 'col-4'>" + cell_content + "</div>";
            
        }else{
            table_creation = "<div class = 'col-4'>" + cell_content + "</div></div>";
        }
        document.getElementById("containers").innerHTML += table_creation + "</div>";

    }
    let end_container = "</div>";
    document.getElementById("containers").innerHTML += end_container;

}*/