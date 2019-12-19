"use strict";
class Course{
    constructor(id,hour,date, list){
        this.id=id;
        this.hour=hour;
        this.date=date;
        this.list=list;
    }
    toString(){
        return this.id;
    }
}
class Student{
    constructor(id, name, gpa, list){
        this.id=id;
        this.name=name;
        this.gpa=gpa;
        this.list=list;
    }
    toString(){
        return this.name;
    }
}
class Database{
    constructor(){
        this.stuMap=new Map();
        this.courseMap=new Map();
    }
    searchStudent(id){
        return this.stuMap.get(id);
    }
    randomStudent(){
        out.innerHTML="";
        var arr = Array.from(this.stuMap);
        let studentId=(arr[[Math.floor(Math.random()*arr.length)]][0]);
        let student=this.searchStudent(studentId)
        report(student.id+" "+student.name+" - GPA: "+student.gpa);
    }
    stuGPA(gpa){
        out.innerHTML="";
        var counter=0;
        for (let s of this.stuMap.values()) {
            if (s.gpa>gpa) {
                counter++;
            }
        }
        report(counter);
    }
    getStudentCourses(id){
        out.innerHTML="";
        let student=this.searchStudent(id);
        for (let c of student.list) {
            report(c+" \n");
        }
    }
    getSchedule(id){
        out.innerHTML="";
        let student=this.searchStudent(id);
        for(let c of student.list){
            let course=this.courseMap.get(c);
            report(course.id+" "+course.date+" "+course.hour+" "+course.list+" \n");
        }
    }
    getStudentsOfCourse(courseId){

        out.innerHTML="";
        for(let s of this.stuMap.values()){
            for (let c of s.list) {
                 if (c.includes(courseId.toUpperCase())) {
                report(s.id+" "+s.name+" \n");
                }
            }
           
        }
    }
    getAverageGPA(){
        out.innerHTML="";
        let counter=0;
        let toplam=0.0;
        for(let s of this.stuMap.values()){
            for (let c of s.list) {
                    counter++;
                    toplam+=(parseFloat(s.gpa));
            }
        }
        let avg=toplam/counter;   
            console.log(toplam);    
            report("Average GPA: "+avg);
    }
    getAverageOfCourse(courseId){
        out.innerHTML="";
        let counter=0;
        let toplam=0.0;
        for(let s of this.stuMap.values()){
            for (let c of s.list) {
                 if (c.includes(courseId.toUpperCase())) {
                    counter++;
                    toplam+=(parseFloat(s.gpa));
                }
            }       
        }
        let avg=toplam/counter;
        console.log(toplam);
        report(avg);
    }
    getCoursesOfRoom(roomKey){
        out.innerHTML="";
        for (let c of this.courseMap.values()) {
            for (let r of c.list) {
                if (r.includes(roomKey.toUpperCase())) {
                report(c.id+" \n");
                }
            }
            
        }
    }
    getCourseCountOfRoom(roomKey){
        out.innerHTML="";
        let counter=0;
        for(let c of this.courseMap.values()) {
            for (let r of c.list) {
               if(r.includes(roomKey.toUpperCase())){
                 counter++;
            }
        
      }
     }
    report(counter);
    }
    
}
const url = "https://maeyler.github.io/JS/data/";
function readData(file) {
    console.log(url+file);
    if (file.includes("Courses")) { 
    fetch(url+file)
        .then(r => r.text(), report)
        .then(addCourses, report);
    }else if (file.includes("Students")) {
fetch(url+file)
        .then(r => r.text(), report)
        .then(addStudents, report);
    }
}
function report(msg, id, list) {
    out.innerHTML += "<br>"; msg += " ";
    out.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1  .classList.add("link");
        out.appendChild(n1); msg += id;
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        console.log(n2);
        if (n1) n1.appendChild(n2);
    }
}
function parseCourse(line) {
    let [id, hour, date, ...list] = line.split("\t");
    let course=new Course(id, hour, date, list);
    return course;
}
function addCourses(txt) {
    let a = txt.split("\n");
    for (let s of a) {
      let course =parseCourse(s);
      db.courseMap.set(course.id, course);
    }
}
function parseStudent(line) {
    let [id, name, gpa, ...list] = line.split("\t");
    let student=new Student(id, name, gpa, list);
    return student;
}
function addStudents(txt) {
    let a = txt.split("\n");
    for (let s of a) {
      let std = parseStudent(s);
      db.stuMap.set(std.id, std);
    }
}
    readData("Students.txt");
    readData("Courses.txt");
    var db = new Database();
