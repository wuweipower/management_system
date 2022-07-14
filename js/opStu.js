
//获取全部学生的信息
function getStuAll()
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
  xmlhttp.send("table=student");
}
//清除所有表格方便多次点击getall
function cleanTable()
{
    var table = document.getElementById("tableStu");
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


    var table = document.getElementById("tableStu");
    var tr = document.createElement("tr");//一行
    var op = document.createElement("td");
    op.innerHTML="<a><a href='javascript:;' onclick='deleteStu(this)'>delete</a>/<a href='javascript:;' onclick='showUpdate(this)'>update</a></a>"
    op.id = tds[0].innerHTML;
    tds.push(op);
    for(var i=0;i<tds.length;i++)
    {
        tr.appendChild(tds[i]);
    }

    table.appendChild(tr);
}



/*********************delete************ */
function deleteStu(obj)
{
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    var id = obj.parentNode.id;
    console.log(id);
    //进行数据库的操作
    var data ="id="+id+"&table=student";
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
      document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }
  xmlhttp.open("POST","http://localhost:3000/delete",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    xmlhttp.send(data);

    console.log(e);

}

/*********************delete************ */

/*******************************update */

function showUpdate(obj)
{
    $('#UpdateStu').modal('show');
    document.getElementById("u_id").value = obj.parentNode.id;
   // console.log(obj.parentNode.parentNode.innerHTML)

}
function updateStu()
{
    var id = document.getElementById("u_id").value;
    var name = document.getElementById("u_name").value;
    var sex = document.getElementById("u_sex").value;
    var entrance_age = document.getElementById("u_entrance_age").value;
    var entrance_year = document.getElementById("u_entrance_year").value;
    var clas = document.getElementById("u_class").value;

    var data = "id="+id+"&name="+name+"&sex="+sex+"&entrance_year="+entrance_year+"&entrance_age="+entrance_age+"&clas="+clas+"&table=student";

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
function showSearch()
{
   // console.log("11")
    $('#SearchStu').modal('show');
}
function searchStu()
{
    var id = document.getElementById('f_id').value;
    var name = document.getElementById("f_name").value;
    var data;
    var api;
    if(id!='')
    {
        data = "id="+id;
        api="findStuCourseById";
    }
    else if(name!='')
    {
        data="name="+name;
        api="findStuCourseByName";
    }
    else
    {
        data='';
        api='findStuCourseAll';
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
        cleanTable1();
        var data = JSON.parse(xmlhttp.response);
        for(var i=0;i<data.length;i++)
        {
            //console.log(data[i]);
            addData1(data[i],1);
        }

      }
    }
    xmlhttp.open("post","http://localhost:3000/"+api,true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  
    xmlhttp.send(data);
}
function cleanTable1()
{
    var table = document.getElementById("tableStuCourse");
    var children = table.childNodes;
    for(var i=children.length-1;i>=0;i--)
    {
        table.removeChild(children[i]);
    }
}
//将数据库的东西加入表格
function addData1(Data,table)//传入一个对象 
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


    var table = document.getElementById("tableStuCourse");
    var tr = document.createElement("tr");//一行
    for(var i=0;i<tds.length;i++)
    {
        tr.appendChild(tds[i]);
    }

    table.appendChild(tr);
}

/*******************search */

/************InsertStu****************/
function showInsert()
{
   // console.log("11")
    $('#InsertStu').modal('show');

}

function insertStu()
{
    var id = document.getElementById("s_id").value;
    var name = document.getElementById("name").value;
    var sex = document.getElementById("sex").value;
    var entrance_age = document.getElementById("entrance_age").value;
    var entrance_year = document.getElementById("entrance_year").value;
    var clas = document.getElementById("class").value;

    //console.log(id)
    //var data = `id=${id}&name=${name}&sex=${sex}&entrance_age=${entrance_age}&entrance_year=${entrance_year}&clas=${clas}`;
    var data = "id="+id+"&name="+name+"&sex="+sex+"&entrance_year="+entrance_year+"&entrance_age="+entrance_age+"&clas="+clas+"&table=student";
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
/*********************insertstu ***************/