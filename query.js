
import { ifError } from 'assert';
import { createRequire } from 'module';
import {Student,Teacher,Course,Choose} from './js/entities.js'
const require = createRequire(import.meta.url);

var express = require('express');
const path = require('path')
const __dirname = path.resolve()
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'100mb',extended:true}))
app.use(bodyParser.json({limit:'100mb'}))
var pg = require('pg');
const port = 3000;
var cors = require('cors');
app.use(cors());

/**
 * var cors = require('cors');
var app = express();//创建express实例
app.use(cors());//为了解决跨域问题
npm install cors
 */
/**
 * npm install --save body-parser
 * express
 * cors
 * pg
 */
// 数据库配置
var config = { 
 user:"postgres",
 database:"scut",
 password:"postgres",
 port:5432,

 // 扩展属性
 max:20, // 连接池最大连接数
 idleTimeoutMillis:3000, // 连接最大空闲时间 3s
}
// 创建连接池
var pool=new pg.Pool(config);

export function login(username,password,callback)
{
    console.log("login",username,password);

    var sql = "select password, status from users where username='" + username +"'";
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
                callback(result.rows[0]);
            done();
        })
    })
}
app.post('/login', (req, res) => {
    let {username,password}=req.body;
    login(username,password,function(result){
        // if(result.password==password)
        // {
        //     if(result.status=="admin")
        //         res.redirect("admin");
        //     else if(result.status=="teacher")
        //     {
        //         res.redirect("teacher");
        //     }
        //     else if(result.status=="student")
        //     {
        //         res.redirect("student");
        //     }
        // }
        res.json(result);
    })
})
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'login.html'))
// })
// app.get('/admin', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'admin.html'))
// })
// app.get('/teacher', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'teacher.html'))
// })
// app.get('/student', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'student.html'))
// })

app.listen(port,()=> {
    console.log(`listening on port ${port}`)
})


// login("admin","admin",function(res){
//     var rs = res
//     console.log(rs.rows);
// })



export function insert(obj,table)
{
    var sql;
    
    if(table=='student')
    {
        sql="insert into student(id,name,sex,entrance_age,entrance_year,class) values('"+obj.id+"','"+obj.name+"','"+obj.sex+"',"
        +obj.entrance_age+","+obj.entrance_year+",'"+obj.clas+"')";
    }
    else if(table=="teacher")
    {
        sql="insert into teacher(teacher_id,name,courses) values('"+obj.t_id+"','"+obj.name+"','"+obj.courses+"')";
    }
    else if(table=='choose')
    {
        sql="insert into choose(id,course_id,teacher_id,chosen_year,score) values('"+obj.id+"', '"+obj.c_id+"' ,'"+obj.t_id+"',"
        +obj.chosen_year+","+obj.score+")";
    }
    else if(table=='course')
    {
        sql="insert into course(course_id,teacher_id,credit,grade,canceled_year,course_name) values('"+obj.c_id+"', '"+obj.t_id+"' ,'"+obj.credit+"','"
        +obj.grade+"',"+obj.canceled+",'"+obj.name+"')";
    }
    // var id = '4567891230'
    // var sql =`insert into student(id,name,sex,entrance_age,entrance_year,class) values(${id},
    // 'hx','Male',20,2020,'20jilian'
    //     )`
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            console.log(result.rows);
            done();
        })
    })
}
app.post('/insert', (req, res) => {
    // var obj = req.body;//需要改
    // var table = req.body;//需要改
    // insert(obj,table)
    console.log(req.body);
    insert(req.body,req.body['table'])
})

//test insert 
// var choose = new Choose('1234567890','123456','4566',2020,99);
// var course = new Course('1234567','ms','12345','2221','2221',2020);
// insert(course,'course')
//insert(choose,'choose')


export function del(obj,table)
{
    var sql;
    
    if(table=='student')
    {
        sql="delete from student where id = '"+obj.id+"'";
    }
    else if(table=="teacher")
    {
        sql="delete from teacher where teacher_id = '"+obj.t_id+"'";
    }
    else if(table=='choose')
    {
        sql="delete from choose where id='"+obj.id+"' and course_id='"+obj.c_id+"'";
    }
    else if(table=='course')
    {
        sql="delete from course where course_id = '"+obj.c_id+"'";
    }
    // var id = '4567891230'
    // var sql =`insert into student(id,name,sex,entrance_age,entrance_year,class) values(${id},
    // 'hx','Male',20,2020,'20jilian'
    //     )`
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            done();
        })
    })
}

app.post('/delete', (req, res)=>{
    var obj = req.body;
    console.log(obj);
    del(obj,obj['table'])
})

export function update(obj,table)
{
    var sql;
    
    if(table=='student')
    {
        sql="update student set name='"+obj.name+"',sex='"+obj.sex+"',entrance_year="+obj.entrance_year+",entrance_age="+obj.entrance_age+",class='"+obj.clas+"' where id='"+obj.id+"'";
    }
    else if(table=="teacher")
    {
        sql="update teacher set name='"+obj.name+"',courses='"+obj.courses+"'"+"where teacher_id='"+obj.t_id+"'";
    }
    else if(table=='choose')
    {
        sql="update choose set score = "+obj.score+" where id='"+obj.id+"'and course_id= '"+obj.c_id+"'";
    }
    else if(table=='course')
    {
        sql="update course set teacher_id = '"+obj.t_id+"', credit='"+obj.credit+"', grade='"+obj.grade+"', canceled_year="+obj.canceled+",course_name='"+obj.name+"'"+" where course_id='"+obj.c_id+"'";
        console.log(sql);
    }
    // var id = '4567891230'
    // var sql =`insert into student(id,name,sex,entrance_age,entrance_year,class) values(${id},
    // 'hx','Male',20,2020,'20jilian'
    //     )`
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            done();
        })
    })
}

app.post('/update', (req, res) => {
    var obj = req.body;
    console.log(obj);
    update(obj,obj['table'])
})

//返回全部的结构
function getAll(table,callback)
{
    var sql;
    if(table=="student"){
        sql="select * from student";
    }
    else if(table=="teacher")
    {
        sql ="select * from teacher";
    }
    else if(table=="course")
    {
        sql="select * from course";
    }
    else if(table=="choose")
    {
        sql ="select * from choose";
    }
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){
                console.error("Error",err);
                return false;
            }
            else
            {
                callback(result);
            }
            done();
            //return result.rows;
        })
    })
}
app.post('/find', (req, res) => {
//  req.body['table']
    //console.log(req.body)
    getAll(req.body['table'],function(result){
       // console.log(result.rows);
        res.json(result.rows);
    })
})


export function findStuCourseById(id,callback)
{

    var sql ="select * from student as s, choose as c where s.id = c.id and s.id = '"+id+"'";

    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){
                console.error("Error",err);
                return false;
            }
            else
            {
                callback(result);
            }
            done();
            //return result.rows;

        })
    })
}

app.post('/findStuCourseById', (req, res) => {
    var obj = req.body;
    console.log(obj);
    findStuCourseByName(obj['id'],function(result){
        res.json(result.rows)
    })
})

export function findStuCourseByName(name,callback)
{
    var sql ="select * from student as s, choose as c where s.id = c.id and s.id = '"+name+"'";
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result);
            }
            console.log(result);
            done();
        })
    })
}

app.post('/findStuCourseByName', (req, res) => {
    var obj = req.body;
    console.log(obj);
    findStuCourseByName(obj['name'],function(result){
        res.json(result.rows)
    })


})
export function findStuCourseAll(callback)
{
    var sql ="select * from student as s, choose as c where s.id = c.id ";
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result);
            }
            console.log(result);
            done();
        })
    })
}

app.post('/findStuCourseAll', (req, res) => {
    findStuCourseAll(function(result){
        console.log(result.rows);
        res.json(result.rows);
    })
})

export function findScore(para,kind,callback)
{
    var sql;
    //console.log("aa",para,kind);
    if(kind =="id")
    {
        console.log("111");
        sql ="select score,course_id from choose where id='"+para+"'";
        console.log(sql);
    }
    else if(kind =="name")
    {
        sql ="select score,course_id from choose,student where student.name= '"+para+"'";
    }
    else
    {
        sql="select s.id,c.score,course_id from student as s, choose as c where s.id = c.id";
    }
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result);
            }
            console.log(result.rows);
            done();
        })
    })
}


app.post('/findScore', (req, res) => {
    var obj = req.body;
    // console.log(obj);
    // console.log(obj['para']);
    // console.log(obj['kind']);
    findScore(obj.para, obj.kind,function(result)
    {
        res.json(result.rows);
    })
})
export function findCourse(para,kind,callback)
{
    var sql;
    if(kind =="id")
    {
        sql ="select * from course where course_id='"+para+"'";
    }
    else if(kind =="name")
    {
        sql ="select * from course where course_name='"+para+"'";
    }
    else
    {
        sql ="select * from course";
    }
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result);
            }
            console.log(result.rows);
            done();
        })
    })
}

app.post('/findCourse', (req, res) => {
    var para=req.body['para'];
    var kind=req.body['kind'];
    findCourse(para,kind,function(result)
    {
        res.json(result.rows);
    })
})
// findCourse(1,1);
export function findChoose(para,kind,callback)
{
    var sql;
    if(kind =="id")
    {
        sql ="select * from choose where course_id='"+para+"'";
    }
    else if(kind =="name")
    {
        sql ="select * from choose where course_name='"+para+"'";
    }
    else
    {
        sql ="select * from choose";
    }
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result);
            }
            //console.log(result);
            done();
        })
    })
}


app.post('/findChoose', (req, res) => {
    var para=req.body['para'];
    var kind=req.body['kind'];
    //console.log("chose")
    findChoose(para,kind,function(result)
    {
        res.json(result.rows);
    })
})

export function findTeacher(para,kind,callback)
{
    var sql;
    if(kind =="id")
    {
        sql ="select * from teacher where teacher_id='"+para+"'";
    }
    else if(kind =="name")
    {
        sql ="select * from teacher where name='"+para+"'";
    }
    else
    {
        sql ="select * from teacher";
    }
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result);
            }
            console.log(result.rows);
            done();
        })
    })
}

app.post('/findTeacher', (req, res) => {
    var para = req.body['para'];
    var kind = req.body['kind'];
    findTeacher(para,kind,function(result)
    {
        res.json(result.rows);
    })
})

export function findTeachCourse(para,kind,callback)
{
    var sql;
    if(kind =="id")
    {
        sql ="select * from course where teacher_id='"+para+"'";
    }
    else if(kind =="name")
    {
        sql ="select * from course as c,teacher as t where t.teacher_id=c.teacher_id and t.name='"+para+"'";
    }
    else
    {
        sql ="select * from course";
    }
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result);
            }
            console.log(result);
            done();
        })
    })

}

app.post('/findTeachCourse', (req, res) => {
    let {username,password}=req.body;


})
export function findAvgScore(para,kind,callback)
{
    var sql;
    if(kind=="stu")//a student
    {
        sql ="select avg(score) from choose where choose.id='"+para+"'";
    }
    else if(kind=="all")//all student
    {
        sql = "select avg(score) from choose";
    }
    else if(kind=="class")//in the same class
    {
        sql = "select class, avg(c.score) from choose as c, student as s where c.id=s.id group by class";
    }
    else if(kind=="course")//in the same course
    {
        sql = "select course_name, avg(choose.score) from choose, course where course.course_id=choose.course_id group by course_name";
    }
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            else
            {
                callback(result.rows);
            }
            console.log(result.rows);
            done();
        })
    })
}
app.post('/findAvgScore', (req, res) => {
    var para=req.body['para'];
    var kind=req.body['kind'];
    findAvgScore(para,kind,function(result)
    {
        res.json(result);
    })

})