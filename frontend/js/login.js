function snackbar(mssg) {
    var x = document.getElementById("snackbar");
    x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${mssg}`
    x.className = "show";
    setTimeout(function() { x.className = x.className.replace("show", ""); }, 2000);
}
function login(){
    
    var email=$("#email").val();
    var password=$("#password").val();
     console.log(email+","+password);
$.ajax({
    type: "POST",
    url: "/api/user/login",
    data: {
        email: email,
        password: password
        
    },
    success: function(resultData) {
        console.log(resultData);
        if (resultData.message == "Auth successful") {
            localStorage.setItem("userDetails", JSON.stringify(resultData.userDetails));
                    localStorage.setItem("token", resultData.token);
                    window.location.href = "/"
                    
        }
  
    }, //sucess
    error: function(resultData) {
        snackbar("INVALID CREDENTIALS!!");
    }
  });
}