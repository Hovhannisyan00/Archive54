"use server"

import { OptionalUser } from "./types"
import { nanoid } from "nanoid"
import bcrypt from 'bcrypt'
import { addUser, getAllUsername, getUserById, getUserByLogin, updateUserById } from "./api"
import { redirect } from "next/navigation"
import { createAuthSession, destroySession, verifyAuth } from "./auth"


export const handleSignup = async (prev: unknown, data: FormData) => {

    if (!data.get('name') || !data.get('surname')) {
        return {
            message: "Please fill all the fields"
        }
    }

    const found = getUserByLogin(data.get('login') as string)
    if (found) {
        return {
            message: "Login is busy!"
        }
    }

    const user: OptionalUser = {
        id: nanoid(),
        name: data.get('name') as string,
        surname: data.get('surname') as string,
        login: data.get('login') as string,
    }

    user.password = await bcrypt.hash(data.get('password') as string, 10)
    console.log(addUser(user))
    redirect("/login")

}
let count = 0


export const handleLogin = async (prev: unknown, data: FormData) => {
    if (!data.get('login') || !data.get('password')) {
        return {
            message: "please fill all the fields",

        }
    }

    let login = data.get('login') as string
    let password = data.get('password') as string

    let user = getUserByLogin(login)
    if (!user) {
        return {
            message: "the login is incorrect!",
        }
    }
    let match = await bcrypt.compare(password, user.password)
    if (!match) {
        count++
        if (count == 3) {
            // console.log("account locked", 888888888888888)

            return {
                message: "account locked",
                dataTime: new Date().getMinutes()
            }
        } else {
            return {
                message: "password is wrong!!",

            }
        }

    } else {


        count = 0
        await createAuthSession(user.id)
        redirect("/profile")
    }

}

export const handleLogout = async () => {
    await destroySession()
    redirect("/login")
}




export const handlUpdate = async (prev: unknown, data: FormData) => {
    const result = await verifyAuth()
    if (!result.user?.id) {
        redirect("/login")
    }
    
    
    
    const usernames = getAllUsername()
    
    
    const userOldLogin = data.get("oldlogin") as string
    const userNewLogin = data.get("newlogin") as string
    const userPassword = data.get("password") as string
    
    const usus = getUserById(result.user.id)
    const mutch = await bcrypt.compare(userPassword, usus.password as string) 
    
    if (!userOldLogin) {
        return {
            message: "Please enter your old login"
        }
    }
    if (!userNewLogin) {
        return {
            message: "Please enter your new login"
        }
        
    }
    if (!userPassword) {
        return {
            message: "Please enter your password"
        }
    }else if(!mutch){
        return {
            message: "The password is incorrect!"
        }   
    }
    
    const user = getUserByLogin(userOldLogin)
    if (!user) {
        return {
            message: "The old login is incorrect!"
        }
    }
    
    let match = await bcrypt.compare(userPassword, user.password)
    
    if (!match) {
        return {
            message: "The password is incorrect!"
        }
    }
    const obj = {
        login: userNewLogin,
        id: user.id
    }
    
    
    
    const tf = usernames.find(elem => elem.login == userNewLogin)
    if (tf) {
        return {
            message: "The new login is busy!"
        }
    } else {
        
        updateUserById(obj)
        
        redirect("/login")
    }
}

