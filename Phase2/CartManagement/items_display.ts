interface items {
    name: string;
    price: number;
    url: string;
    added: boolean;
}

let item1: items = {
    name: "Five Star Wirebound Notebook, 3 Subject",
    price: 3.50,
    url: "https://i5.walmartimages.com/asr/cd55fb43-f3fe-44ae-9c05-1f73eaacda80_1.0b54cefb1111c7636a48d682d5347496.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff",
    added: false
}

let item2: items = {
    name: "Pen + Gear Flexible Plastic Ruler, Assorted Colors",
    price: 1.65,
    url:"https://i5.walmartimages.com/asr/8777bddd-9b57-46b4-9540-b3dcf86c9958_1.db6efce97f9a0432a4e72dd4a73215a5.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
    added: false

}

let item3: items = {
    name: "Pen + Gear Erasers and Toppers Set",
    price: 2.15,
    url: "https://i5.walmartimages.com/asr/86c892a2-a416-4fcf-99b2-4ca3b25d3a2d_1.388696df3e0520f1b69cf780ec5dd63b.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
    added:false
}

let item4: items = {
    name: "Paper Mate InkJoy Gel Pens, Medium Point, Assorted Colors, 10 Count",
    price: 9.85,
    url: "https://i5.walmartimages.com/asr/dff8c092-b69f-42ed-b446-dc9c7e270e93.62f6f183b75183d80c4c3a058d08ef5d.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff",
    added: false,
}

let items_list: items[] = [];
items_list.push(item1);
items_list.push(item2);
items_list.push(item3);
items_list.push(item4);

let formatter = new Intl.NumberFormat( 'en-US', {
    style:'currency',
    currency:'USD',
})
function displayItems():void{
    let table_contents_table:string = "<div class = 'row'>"

    for (let i in items_list){
        let price_formatted:string = formatter.format(items_list[i].price);

        table_contents_table += `<div class = "col-3" style = 'border-radius:15px; border-color:#FC913A;background-color:#EDE574;
                                    border-style:double; margin:10px'>
                                    <h5 id = 'art_name'>${items_list[i].name}</h5>
                                    <h6 id = 'art_price' style = "color:orange ">${price_formatted}</h6>
                                    <img src = ${items_list[i].url}></img>
                                    <input type="button" value="ADD" id = '${i}' 
                                    onClick = updateCart('${i}') style = "border-radius: 5px; 
                                    color:#FF4E50; border-color:#FF4E50; background-color:white; margin:15px">
                                 </div>`
                                
    }
    document.getElementById('items').innerHTML += '</div>' + table_contents_table;
}

let in_cart:number = 0;
let items_in_storage:number = sessionStorage.length;
function updateCart(index_item:number): void{
    if (items_list[index_item].added == false)
    {
        in_cart++;
        items_list[index_item].added = true;
        document.getElementById('size').innerHTML =  `(${in_cart})`;
        sessionStorage.setItem(index_item.toString(), JSON.stringify(items_list[index_item]));
    }
    //document.getElementById('size').innerHTML =  `(${in_cart})`;
    //sessionStorage.setItem(index_item.toString(), JSON.stringify(items_list[index_item]));
}

function showPurchasedItems():void {
    let total_price:number = 0;
    let table_contents = `<table border = 1 >
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                            </tr>
                            <tbody>`
    for (let i:number = 0; i < sessionStorage.length; i++)
    {
        let item_json = sessionStorage.getItem(i.toString());
        let item_reg = JSON.parse(item_json);
        table_contents += `<tr>
                            <td>
                                ${item_reg.name}
                            </td>
                            <td>
                                ${formatter.format(item_reg.price)}
                            </td>
                           </tr>`
        total_price += item_reg.price;    
    }
    table_contents += '</tbody></table>';
    document.getElementById('table').innerHTML = table_contents; 
    document.getElementById('total').innerHTML = `Total: ${formatter.format(total_price)}`; 
    sessionStorage.clear();             
}





