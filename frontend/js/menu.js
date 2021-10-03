var data=JSON.parse(localStorage.getItem('userDetails'));


console.log(data);
if(data.userType=='User')
{    document.getElementById("todo").style.display="none";
	console.log('hello');
	$('#item1').css('display','none')
}


function logout()
{
	localStorage.clear();
	location.href="/";
}
var user=JSON.parse(localStorage.getItem("userDetails"));
$("#user").html(user.name)