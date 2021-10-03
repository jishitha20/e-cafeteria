
function remove(id)
{console.log(id);
  $.ajax({
    url: "/api/new/remove/" + id,
    method: "PATCH",
    success: function(result) {
        location.reload();
    },
    error: function(err) {
        console.log("Error", err);
        location.reload(); //change this url ....
    }
});
}
$("#formSubmit").click(()=>{
    
    
    
    $.ajax({
      type: "POST",
      url: "/api/new/add",
      data: {
          name: $("#contestname").val(),
          url:$("#organisation").val(),
          price:$("#descp").val()
      },
      success: function(response) {
          response=JSON.parse(JSON.stringify(response));
          //console.log(response);
          draw();
      }, //sucess
      error: function(error) { } //error
  });

  })

function draw()
{  
  console.log("hello");
   $.ajax({
        type: "GET",
        url: "/api/new/",
        success: function(list) {
            console.log(list);
            let l=list.length;
            var h="";
            var data=JSON.parse(localStorage.getItem('userDetails'));
            for(let i=0; i<l;i++)
            {   if(!list[i].isdeleted){
              h+=`<figure class="fig">
              <img src=${list[i].url}>
              <figcaption>${list[i].name}</figcaption>
                <span class="price">Price: Rs.${list[i].price}/-</span>
                <a class="button" href="#"  onclick="buy('${list[i]._id}')">Buy Now</a>`
                if(data.userType!='User')

                h+=`<button onclick="remove('${list[i]._id}')">Remove</button>`
             h+=` </figure>`;  }
            }
    console.log(h);
    document.getElementById("columns").innerHTML=h;
        }, //sucess
        error: function(error) { } //error
    })
    
}
draw();