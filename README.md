



# 1. login

for administrator, username is admin and password is admin

for student, username is studen tand password is student

for teacher, username is teacher and password is teacher

![login](C:/Users/17526/Desktop/js_db/img/login.png)



# 2. GUI

# 2.1admin.html

## student

![admin1](C:/Users/17526/Desktop/js_db/img/admin1.png)

### get all

![image-20220503160836930](C:/Users/17526/Desktop/js_db/img/image-20220503160836930.png)

### insert

![image-20220503160907297](C:/Users/17526/Desktop/js_db/img/image-20220503160907297.png)

### search

![image-20220503160952353](C:/Users/17526/Desktop/js_db/img/image-20220503160952353.png)

### update

![image-20220503161031080](C:/Users/17526/Desktop/js_db/img/image-20220503161031080.png)

delete

## teacher

### get all

![image-20220503161155596](C:/Users/17526/Desktop/js_db/img/image-20220503161155596.png)

### search

![image-20220503161256826](C:/Users/17526/Desktop/js_db/img/image-20220503161256826.png)



## course and choose are similar to student



## score

### find a student scores based on id or name

![image-20220503161432676](C:/Users/17526/Desktop/js_db/img/image-20220503161432676.png)

### find a student average score

![image-20220503161729200](C:/Users/17526/Desktop/js_db/img/image-20220503161729200.png)

### find all students average score

![image-20220503161802067](C:/Users/17526/Desktop/js_db/img/image-20220503161802067.png)

### find avg score in the same course & class

![image-20220503161853500](C:/Users/17526/Desktop/js_db/img/image-20220503161853500.png)

![image-20220503161904830](C:/Users/17526/Desktop/js_db/img/image-20220503161904830.png)



# 2.2 teacher.html

<img src="C:/Users/17526/Desktop/js_db/img/image-20220503161941641.png" alt="image-20220503161941641" style="zoom:80%;" />

# 2.3 student.html

![image-20220503162001233](C:/Users/17526/Desktop/js_db/img/image-20220503162001233.png)

# 3.CODE

In this file, there are main sql statements 

## insert

```js
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
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            console.log(result.rows);
            done();
        })
    })
}
```

## delete

```js
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
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            done();
        })
    })
}
```

## update

```js
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
    pool.connect(function(err,client,done){
        if(err){console.error("Error connecting");}
        client.query(sql,function(err,result){
            if(err){console.error("Error",err);}
            done();
        })
    })
}

```

get all

```js
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
```

## find student and the course he/she chooses by id

```js
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
```

## find student and course he/she chooses by name

```js
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
```

## find all about students and course chosen

```js
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
```

## find score

```js
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
}
```

## find course information

```js
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
}
```

## 

## find choose information

```js
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
}
```





## find teacher information

```js
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
}
```



## find teacher and course he/she teaches

```js
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
    }}
```



## average score

```js
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
    }}
```

