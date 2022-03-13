import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'


export default function Register() {

    
    const history =useNavigate("");
    const [inp,setinp]=useState({
        name:"",
        email:"",
        mobile:"",
        occupation:"",
        text:""
    })
    const setdata=(e)=>{
        console.log(e.target.value)
        const {name,value}=e.target;
        setinp((preval)=>{
            return {
                ...preval,
                [name]:value
            }
        })
    }

    const addInpdata=async(e)=>{
        e.preventDefault();
        const {name,email,mobile,occupation,text}=inp;
        const res=await fetch("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,mobile,occupation,text
            })
        })
        const data=await res.json();
        console.log(data)

        if(res.status===422 || !data){
            alert("error ")
            console.log("error ")
        }else{
            alert("data added successfully")
            history.push("/")
            console.log("data added")
        }
    }
    return (
    <>
    <div className='container'>
    <form className='mt-2'>
    <div className='row'>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Name</label>
            <input type="text" name="name" value={inp.name} onChange={setdata} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" name="email" value={inp.email} onChange={setdata} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Mobile no</label>
            <input TYPE="number" name="mobile" value={inp.mobile} onChange={setdata} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" className="form-label">Occupation</label>
            <input type="text" name="occupation" value={inp.occupation} onChange={setdata} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Your message</label>
            <textarea type="text" name="text" value={inp.text} onChange={setdata} className="form-control" id="exampleInputPassword1" cols="30" rows="5"></textarea>
        </div>
        <button type="submit" onClick={addInpdata} className="btn btn-secondary">Submit</button>
        </div>
    </form> 
    </div>
    </>
  )
}
