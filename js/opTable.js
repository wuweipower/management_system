    // 数组
    let data = [
        {
            id:1101,
            name:'小王',
            Chinese:100,
            Math:80,
           English:91,
            total:271
        },
        {
            id:1102,
            name:'小曾',
            Chinese:88,
            Math:87,
            English:92,
            total:267
        },
        {
            id:1103,
            name:'小赵',
            Chinese:75,
            Math:20,
            English:86,
            total:181
        },
        {
            id:1104,
            name:'小周',
            Chinese:65,
            Math:81,
            English:83,
            total:229
        }
    ]
    window.onload = function(){
        initdata()
    }
    //初始化数据
    // 模板填入数据
    function initdata(){
        let tbodyinner = document.getElementsByTagName("tbody")[0]
        let html = ''
        for(let i=0;i<data.length;i++){
            html+=`
            <tr>
                <td>${data[i].id}</td>
                <td>${data[i].name}</td>
                <td name="grade" class="chinese">${data[i].Chinese}</td>
                <td name="grade" class="math">${data[i].Math}</td>
                <td name="grade" class="english">${data[i].English}</td>
                <td class="allscore">${parseInt(data[i].Chinese)+parseInt(data[i].Math)+parseInt(data[i].English)}</td>
            </tr>
            `
        }
        // tbody.innerHTML="..."往tbody中添加内容
        tbodyinner.innerHTML = html
        getNode()
        addData();
    }
    // 监听click事件
    function getNode(){
        let subject = document.getElementsByName("grade")
        for(let i=0;i<subject.length;i++){
            subject[i].addEventListener('click',function(){
                edit(this)
            })
        }
    }
    //鼠标 移入点
    function edit(i){
        let inputlen = document.getElementsByTagName('input').length
        let oldvalue = i.innerHTML
        if(inputlen==0){
            // 设置该标签为空
            i.innerHTML = ''
            // 添加input对象
            let inp = document.createElement("input")
            inp.value = oldvalue
            inp.classList.add("inputClass")
            // 添加子节点
            i.appendChild(inp)
            // 获取文本中的内容
            inp.select()
            // 失去焦点事件
            inp.onblur = function(){
                if(inp.value<=100&&inp.value>=0){
                    i.innerHTML = inp.value
                    let val1 = i.parentNode.childNodes[5].innerHTML
                    let val2 = i.parentNode.childNodes[7].innerHTML
                    let val3 = i.parentNode.childNodes[9].innerHTML
                    i.parentNode.childNodes[11].innerHTML = parseInt(val1)+parseInt(val2)+parseInt(val3)
                }else{
                 
                    return alert("数据值不对，请重新输入！");
                }
            }
        }
    }

function addData()
{
    var table = document.getElementById("tableData");
    var tr = document.createElement("tr");//一行


    var id = document.createElement("td");//一列
    var name = document.createElement("td");//一列
    var sex = document.createElement("td");//一列
    var e_a = document.createElement("td");//一列
    var e_y = document.createElement("td");//一列
    var cl = document.createElement("td");//一列
    var del = document.createElement("td");//删除
    var ud = document.createElement("td");//update
    var op = document.createElement("td");


    //每一列的内容
    id.innerHTML=1;
    name.innerHTML="Mrax";
    sex.innerHTML = "male";
    e_a.innerHTML="18";
    e_y.innerHTML = "2020";
    cl.innerHTML = "2020cs";
    // del.innerHTML="<a href='javascript:;' onclick='deleteData(this)'>delete</a>"
    // ud.innerHTML="<a href='javascript:;' onclick='updateData(this)'>update</a>"
    op.innerHTML="<a><a href='javascript:;' onclick='deleteData(this)'>delete</a>/<a href='javascript:;' onclick='updateData(this)'>update</a></a>"
    op.id = id.innerHTML;

    tr.appendChild(id);
    tr.appendChild(name);
    tr.appendChild(sex);
    tr.appendChild(e_a);
    tr.appendChild(e_y);
    tr.appendChild(cl);
    tr.appendChild(op);

    table.appendChild(tr);

    //进行数据库操作
}
function deleteData(obj)
{
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
    console.log(obj.parentNode.id);
    //进行数据库的操作

}
function updateData(obj)
{

    document.getElementById('inputbox').style.display=1?'block':'none';
    //进行数据库操作
}

function getData()
{
    var table = document.getElementById("tableData");

    var tds=[];
    for(var i=0;i<7;i++){
        tds.push(document.createElement("td"));
    }
    //根据数据库得到的数据进行添加
    for(var i=0;i<6;i++){
        tds[i].innerHTML = ""; 
    }

    var tr = document.createElement("tr");//一行
    for(var i=0;i<6;i++){
        tr.appendChild(tds[i]);
    }

    tds[6].innerHTML="<a><a href='javascript:;' onclick='deleteData(this)'>delete</a>/<a href='javascript:;' onclick='updateData(this)'>update</a></a>"
    tds[6] = tds[0].innerHTML;
    tr.appendChild(op);
    table.appendChild(tr);

}
function search()
{
    if(a)//
    {

    }
    else
    {
        
    }
}

function cleanTable()
{
    var table = document.getElementById("tableData");
    var children = table.childNodes;
    for(var i=children.length-1;i>=0;i++)
    {
        table.removeChild(children[i]);
    }
}
