export class Student
{
    constructor(id, name,sex,entrance_age,entrance_year,clas)
    {
        this.id = id;//char10
        this.name = name;//varchar
        this.sex = sex;//Male Female
        this.entrance_age = entrance_age;//smallint
        this.entrance_year = entrance_year;//smallint
        this.clas = clas;//varchar
    }

}

export class Teacher
{
    constructor(t_id,name,courses)
    {
        this.t_id = t_id;//archar
        this.name = name;//varchar
        this.courses = courses;//varchar
    }
}

export class User
{
    constructor(username,password,status)
    {
        this.username = username;
        this.password = password;
        this.status = status;
    }
}

export class Choose
{
    constructor(id,c_id,t_id,c_year,score) {
        this.id = id;//char10
        this.c_id = c_id;//char7
        this.t_id = t_id;//char5
        this.c_year = c_year;//smallint
        this.score = score;     //smallint   
    }
}

export class Course
{
    constructor(c_id,name,t_id,credit,grade,canceled) {
        this.c_id = c_id;//cahr7
        this.name = name;//char;
        this.t_id = t_id;//char5
        this.credit = credit;//char4
        this.grade = grade;//char4
        this.canceled = canceled ;//smallint
    }
}

export class StuCourse
{
    constructor(id,name,sex,entrance_age,entrance_year,clas,t_id,credit,grade,canceled) {
        this.id = id;//char
        this.name = name;//char
        this.sex = sex ;//
        this.entrance_age = entrance_age;//
        this.entrance_year = entrance_year;//;
        this.clas = clas;//
        this.t_id = t_id;//
        this.credit = credit;//
        this.grade
    }
}