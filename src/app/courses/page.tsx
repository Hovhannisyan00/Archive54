import { getAllCourses } from "../lib/api"
import { CourseList } from "../lib/components/course-list"

export default function Page(){
    const list = getAllCourses()
    // console.log(list)
    return <>
        <h1 className="is-size-2">Courses</h1>
        <br />
        <br />
        <CourseList courses={list}/>
    </>
}