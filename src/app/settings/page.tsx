"use client"
import { redirect } from "next/navigation";
import { verifyAuth } from "../lib/auth";
import { handlUpdate } from "../lib/actions";
import { useActionState } from "react";

export default  function pages() {
    

    const [state, handlUpdateAction] = useActionState(handlUpdate, {message:""})
    // console.log(state ,7777777)


    return (
        <main className="p-4 px-6 mx-6">
        <h1 className="is-size-3">Settings</h1>
        <div className="columns">
          <div className="column is-two-fifths p-4">
            <form className="box" action={handlUpdateAction}>
                {state?.message && <p style={{color:'red'}}>{state.message}</p>}
  
  
                <div className="field my-4">
                  <input 
                    type="text" 
                    className="input is-dark"
                    placeholder="please enter your old login"
                    name="oldlogin"
                    />
                </div>
                <div className="field my-4">
                  <input 
                    type="password" 
                    className="input is-dark"
                    placeholder="please enter your password"
                    name="password"
                    />
                </div>  
                <div className="field my-4">
                  <input 
                    type="text" 
                    className="input is-dark"
                    placeholder="please enter your new login"
                    name="newlogin"
                    />
                </div>
                <button className="button is-success">submit</button>
            </form>
          </div>
        </div>
      </main>
    );
  
}   