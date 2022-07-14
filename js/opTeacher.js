//获取全部老师的信息
function getTeacherAll()
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
        cleanTable();
        //console.log(xmlhttp.response);
        var data = JSON.parse(xmlhttp.response);
        for(var i=0;i<data.length;i++)
        {
            //console.log(data[i]);
            addData(data[i],1);
        }

    }

  }
  xmlhttp.open("post","http://localhost:3000/find",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  //xmlhttp.send("fname=Henry&lname=Ford");\
  xmlhttp.send("table=teacher");
}
//清除所有表格方便多次点击getall
function cleanTable()
{
    var table = document.getElementById("tableTeacher");
    var children = table.childNodes;
    for(var i=children.length-1;i>=0;i--)
    {
        table.removeChild(children[i]);
    }
}
//将数据库的东西加入表格
function addData(Data,table)//传入一个对象 
{

   // console.log("aaa",Data);
    var arr = Object.keys(Data);
    var len = arr.length;
    var tds = [];
    for(var i=0;i<len;i++)
    {
        tds.push(document.createElement("td"));
    }
    for(var i=0;i<len;i++)
    {
        //console.log("a",Data[arr[i]]);
        tds[i].innerHTML=Data[arr[i]];
    }
    var table = document.getElementById("tableTeacher");
    var tr = document.createElement("tr");//一行
    // var op = document.createElement("td");
    // op.innerHTML="<a><a href='javascript:;' onclick='deleteStu(this)'>delete</a>/<a href='javascript:;' onclick='showUpdate(this)'>update</a></a>"
    // op.id = tds[0].innerHTML;
    // tds.push(op);
    for(var i=0;i<tds.length;i++)
    {
        tr.appendChild(tds[i]);
    }
    table.appendChild(tr);
}

//搜索老师
function showTeacherSearch()
{
   // console.log("11")
    $('#SearchTeacher').modal('show');
}
function searchTeacher()
{
    var id = document.getElementById('f_id').value;
    var name = document.getElementById("f_name").value;
    var data;
    var api="findTeacher";
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
        //document.getElementById("result").innerHTML=xmlhttp.response;
        cleanTable();
        //console.log(xmlhttp.response);
        var data = JSON.parse(xmlhttp.response);
        for(var i=0;i<data.length;i++)
        {
            //console.log(data[i]);
            addData(data[i],1);
        }
      }
    }
    xmlhttp.open("post","http://localhost:3000/"+api,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
    xmlhttp.send(data);
}