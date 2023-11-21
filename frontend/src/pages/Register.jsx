import React from "react";

export default function Register(){
    
    const registerUser = (e) => {
        e.preventDefault();
        
    }

    return (
        <div>
            <form onSubmit={registerUser}>
                <label>Name:</label>
                <input type='text' placeholder='name'/>
                <label>Email:</label>
                <input type='email' placeholder='email' />
                <label>Password:</label>
                <input type='password' placeholder='password' />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}