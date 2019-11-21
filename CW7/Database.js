"use strict";
class Student {
  constructor(id, name, gpa) {
    this.id = id
    this.name = name
    this.gpa = gpa
    this.courses = []
  }
  addCourses(...course) {
    for (let c of course) this.courses.push(c)
    return this
  }
  toString() {
    return this.name +": "+this.gpa;
  }
}

