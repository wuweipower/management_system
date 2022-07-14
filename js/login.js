document.getElementById("login").addEventListener("click", function(){
  login();
});
function login()
{
  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;
  var info = "username="+username+"&password="+password;
  ajaxLogin(info,password);
}


function ajaxLogin(info,password)
{
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        //console.log(xmlhttp.response);
        var data = JSON.parse(xmlhttp.response);
        console.log(data);
        if(data.password==password)
        {
          if(data.status=="admin")
          {
            window.location.assign("admin.html")
          }
          else if(data.status=="teacher")
          {
            window.location.assign("teacher.html")
          }
          else if(data.status=="student")
          {
            window.location.assign("student.html")
          }
        }
    }

  }
  xmlhttp.open("post","http://localhost:3000/login",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  //xmlhttp.send("fname=Henry&lname=Ford");\
  xmlhttp.send(info);
}