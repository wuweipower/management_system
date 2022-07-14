
//获取全部课程的信息
function getChooseAll()
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
            console.log(data[i]);
            addData(data[i],1);
        }

    }

  }
  xmlhttp.open("post","http://localhost:3000/find",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  //xmlhttp.send("fname=Henry&lname=Ford");\
  xmlhttp.send("table=choose");
}
//清除所有表格方便多次点击getall
function cleanTable()
{
    var table = document.getElementById("tableChoose");
    var children = table.childNodes;
    for(var i=children.length-1;i>=0;i--)
    {
        table.removeChild(children[i]);
    }
}
//将数据库的东西加入表格
function addData(Data,t)//传入一个对象 
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


    var table = document.getElementById("tableChoose");
    var tr = document.createElement("tr");//一行
    var op = document.createElement("td");
    op.innerHTML="<a><a href='javascript:;' onclick='deleteChoose(this)'>delete</a>/<a href='javascript:;' onclick='showUpdate(this)'>update</a></a>"
    op.id = tds[0].innerHTML;
    tds.push(op);
    for(var i=0;i<tds.length;i++)
    {
        tr.appendChild(tds[i]);
    }

    table.appendChild(tr);
}


/*********************delete************ */
function deleteChoose(obj)
{
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    var id = obj.parentNode.id;
    console.log(id);
    //进行数据库的操作
    var data ="c_id="+id+"id="+"&table=choose";/**********************************************************要改 */
    ajaxDel(data)

}
function ajaxDel(data)
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
      //document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("POST","http://localhost:3000/delete",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xmlhttp.send(data);


}

/*********************delete************ */

/*******************************update */

function showUpdate(obj)
{
    $('#UpdateChoose').modal('show');
    document.getElementById("u_id").value = obj.parentNode.id;
   // console.log(obj.parentNode.parentNode.innerHTML)

}
function updateChoose()
{
    var id = document.getElementById("u_id").value;
    var c_id = document.getElementById("u_course_id").value;
    var t_id = document.getElementById("u_teacher_id").value;
    var chosen_year = document.getElementById("u_chosen_year").value;
    var score = document.getElementById("u_score").value;
    var data = "score="+score+"&id="+id+"&t_id="+t_id+"&c_id="+c_id+"&chosen_year="+chosen_year+"&table=choose";

    ajaxUpdate(data)
   // console.log(name);

}

function ajaxUpdate(data)
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
      document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("POST","http://localhost:3000/update",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xmlhttp.send(data);
}
/************************update */


/****************************search */
function showChooseSearch()
{
   // console.log("11")
    $('#searchChoose').modal('show');
}
function searchChoose()
{
    var id = document.getElementById('f_id').value;
    var name = document.getElementById("f_name").value;
    var data;
    var api="findChoose";
    if(id!='')
    {
        data = "para="+id+"&kind=id";
    }
    else if(name!='')
    {
        data = "para="+name+"&kind=name";
    }
    else
    {
        data='kind=0';
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
        document.getElementById("result").innerHTML=xmlhttp.response;
      }
    }
    xmlhttp.open("post","http://localhost:3000/"+api,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  
    xmlhttp.send(data);
}
/*******************search */

/************InsertCourse****************/
function showChooseInsert()
{
   // console.log("11")
    $('#InsertChoose').modal('show');

}

function insertChoose()
{
    var id = document.getElementById("id").value;
    var c_id = document.getElementById("course_id").value;
    var t_id = document.getElementById("teacher_id").value;
    var chosen_year = document.getElementById("chosen_year").value;
    var score = document.getElementById("score").value;

    //console.log(id)
    //var data = `id=${id}&name=${name}&sex=${sex}&entrance_age=${entrance_age}&entrance_year=${entrance_year}&clas=${clas}`;
    var data = "score="+score+"&id="+id+"&t_id="+t_id+"&c_id="+c_id+"&chosen_year="+chosen_year+"&table=choose";
    ajaxSend(String(data));
}

function ajaxSend(data)
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
      //document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("POST","http://localhost:3000/insert",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xmlhttp.send(data);

    //console.log(e);

}
/*********************insert ***************/