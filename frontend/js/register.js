function register(){
    var name=$("#name").val();
    var email=$("#email").val();
    var mobileNumber=$("#phone").val();
    var password=$("#password").val();
    var usertype=$("#userType").val();
     console.log(name+""+email+","+password+","+mobileNumber);
     console.log(usertype);
  $.ajax({
    type: "POST",
    url: "/api/user/signup",
    data: {
        
        userType:usertype,
        name: name,
        email: email,
        password: password,
        mobileNumber: mobileNumber
        
    },
    success: function(resultData) {
        if (resultData.message == "user created") {
            var x = document.getElementById("snackbar");
            x.style.backgroundColor = 'green'
            x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Verify Your Mail`
            x.className = "show";
            setTimeout(function() {
                x.className = x.className.replace("show", "");
                window.location.href = '/login';
  
            }, 2000);
        }
  
    }, //sucess
    error: function(resultData) {
        console.log(resultData);
            if (resultData.responseJSON.message == "Email already exists") {
                var x = document.getElementById("snackbar");
                x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i>Email already exists`
                x.className = "show";
                setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
            }
            else{
              var x = document.getElementById("snackbar");
              x.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i>Please Enter Valid Credentials`
              x.className = "show";
              setTimeout(function() { x.className = x.className.replace("show", ""); }, 3000);
            } 
        } //error
  });
  }