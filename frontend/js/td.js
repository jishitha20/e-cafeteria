draw();
function show() {

    var text=document.getElementById("todo").value;
    console.log(text);
    if(text!="")
    {$.ajax({
        type: "POST",
        url: "/api/todo/add",
        data: {
            name: text,
            isactive:true,
            isdeleted:false
        },
        success: function(response) {
            response=JSON.parse(JSON.stringify(response));
            //console.log(response);
            draw();
        }, //sucess
        error: function(error) { } //error
    });}
} //End of show function

function draw()
{   $.ajax({
        type: "GET",
        url: "/api/orders/",
        success: function(res) {
            let l=res.length;
            console.log(res);
            var h="";
            for(let i=0; i<l;i++)
            {   /*res[i].isdeleted==false*/
                if(true)
                {let s=res[i].name;
                 console.log(res[i].status);
                 if(res[i].status==false)
                 h+=`<div class="todo" style="background-color:#90EE90">`;
                 else h+=`<div class="todo">`;
                 h+=`<div class="badge badge-secondary" >${res[i].user_id.name}-${res[i].item_id.name}</div>`;
                 if(res[i].status==false)
                  h+=`<button class="btnc" onclick=mark("${res[i]._id}")>Completed</button>`;
                  else
                 h+=`Delivered successfully`;
                 }   
            }
    console.log(h);
    document.getElementById("insert").innerHTML=h;
        }, //sucess
        error: function(error) { } //error
    });
    
}
draw();
function mark(id)
{
    $.ajax({
        type: "PATCH",
        url: "/api/orders/remove/"+id,
       
        success: function(response) {
            //response=JSON.parse(JSON.stringify(response));
            //console.log(response);
            //draw();
            location.reload();
        }, //sucess
        error: function(error) { alert(error);} //error
    });
}

function remove(index,id)
{
    $.ajax({
        type: "PATCH",
        url: "/api/orders/remove/"+id,
        
        success: function(response) {
            //response=JSON.parse(JSON.stringify(response));
            console.log(response);
           location.reload();
        }, //sucess
        error: function(error) { } //error
    });
}