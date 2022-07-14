document.getElementById("searchScores").addEventListener("click", function(){
    searchScore();
});
document.getElementById("AStudentAvg").addEventListener("click", function(){
    AStudentAvg();
});
document.getElementById("AllStudentAvg").addEventListener("click", function(){
    AllStudentAvg();
});
document.getElementById("SameCourseAvg").addEventListener("click", function(){
    sameCourseAvg();
});
document.getElementById("SameClassAvg").addEventListener("click", function(){
    sameClassAvg();
});


function showScoreSearch()
{
   // console.log("11")
    $('#Search').modal('show');
}
function searchScore()
{
    var id = document.getElementById('ID').value;
    var name = document.getElementById("Name").value;
    var data;
    var api="findScore";
    if(id!='')
    {
        data = "para="+id+"&kind=id";
    }
    else if(name!='')
    {
        data="para="+name+"&kind=name";
    }
    else
    {
        data='para=0';
    }
    ajaxSearch(data,api);
    showScoreSearch();
}
function ajaxSearch(data,api)
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
        document.getElementById("searchResult").innerHTML=xmlhttp.response;
      }
    }
    xmlhttp.open("post","http://localhost:3000/"+api,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    xmlhttp.send(data);
}

function AStudentAvg()
{
    var id = document.getElementById("searchById").value;
    var data = "para="+id+"&kind=stu";
    var api = "findAvgScore";
    ajaxSearchAvg(data,api);
    showScoreSearch();
}
function ajaxSearchAvg(data,api)
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
        document.getElementById("searchResult").innerHTML=xmlhttp.response;
        //console.log(xmlhttp.response);
      }
    }
    xmlhttp.open("post","http://localhost:3000/"+api,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    xmlhttp.send(data);
}

function AllStudentAvg()
{
    var data = "para=0&kind=all";
    var api = "findAvgScore";
    ajaxSearchAvg(data,api);
    showScoreSearch();
}

function sameClassAvg()
{
    var data = "para=0&kind=class";
    var api = "findAvgScore";
    ajaxSearchAvg(data,api);
    showScoreSearch();
}

function sameCourseAvg()
{
    var data = "para=0&kind=course";
    var api = "findAvgScore";
    ajaxSearchAvg(data,api);
    showScoreSearch();
}