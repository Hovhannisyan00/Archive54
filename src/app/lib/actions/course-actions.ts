"use server"

import { createWriteStream } from "fs"
import { InputCourse, InputModule, addCourse, addModule, getAllCourses, updateCourseById } from "../api"
import { redirect } from "next/navigation"

export const handleAdd = async (prew: unknown, data: FormData) => {
   const allData = getAllCourses()
   const photos = data.get("cover") as File
   const usname = data.get("name") as string
   const tf = allData.find(elem => elem.name == usname)





   if (!data.get("name")) {
      return {
         message: "Please enter the course name",
         name: data.get("name") as string,
         price: (data.get('price') as string),
         duration: (data.get('duration') as string),
         cover:data.get('cover') as File


      }
   } else if (!tf) {
      return { message: "This course name already exists",
         name: data.get("name") as string,
         price: (data.get('price') as string),
         duration: (data.get('duration') as string),
         cover:data.get('cover') as File

       }
   } else if (!data.get("price")) {
      return { message: "Please enter the course price",
         name: data.get("name") as string,
         price: (data.get('price') as string),
         duration: (data.get('duration') as string),
         cover:data.get('cover') as File

       }
   } else if (!data.get("duration")) {
      return { message: "Please enter the course duration",
         name: data.get("name") as string,
         price: (data.get('price') as string),
         duration: (data.get('duration') as string),
         cover:data.get('cover') as File


       }
   } else if (!photos.size) {
      return { message: "Please select a course cover photo", 
         name: data.get("name") as string,
         price: (data.get('price') as string),
         duration: (data.get('duration') as string),
         cover:data.get('cover') as File
      }

   }else {
      const photo = data.get('cover') as File
      if (photo) {
         let extension = photo.type.split("/").at(-1)
         const filename = Date.now() + "." + extension
         
         const stream = createWriteStream("public/images/" + filename)
         
         const bufferedImage = await photo.arrayBuffer()
         
         stream.write(Buffer.from(bufferedImage))
         
         
         const course: InputCourse = {
            name: data.get('name') as string,
            price: +(data.get('price') as string),
            duration: +(data.get('duration') as string),
            cover: 'images/' + filename
         }
         
         addCourse(course)
         redirect("/courses")
      }
   }
}

export const handleUpdate = async (id: number, data: FormData) => {
   // console.log("FOOOOOOOOORM!!!", data)
   // console.log("iid!!!", id)

   const course: Partial<InputCourse> = {
      name: data.get("name") as string,
      price: +(data.get("price") as string),
      duration: +(data.get('duration') as string)
   }

   const photo = data.get('cover') as File
   if (photo.size > 0) {
      let extension = photo.type.split("/").at(-1)
      const filename = Date.now() + "." + extension

      const stream = createWriteStream("public/images/" + filename)

      const bufferedImage = await photo.arrayBuffer()
      course.cover = 'images/' + filename
      stream.write(Buffer.from(bufferedImage))

   }

   updateCourseById(id, course)
   redirect("/courses")
}

export const handleAddModule = (data: FormData) => {
   let module: InputModule = {
      titel: data.get("titel") as string,
      duration: +(data.get("duration") as string),
      courseId: +(data.get("courseId") as string)
   }

   let result = addModule(module)
   console.log(result)
   redirect("/courses")
}