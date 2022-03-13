import React, { useState,useEffect } from 'react'
import { Link,} from 'react-router-dom'



import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Home() {
    const [getUserdata,setUserdata]=useState([]);
    console.log(getUserdata)


    const getData=async(e)=>{
        
        
        const res=await fetch("/getdata",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            
        })
        const data=await res.json();
        console.log(data)

        if(res.status===422 || !data){
            alert("error ")
            console.log("error ")
        }else{
            setUserdata(data)
            // alert("got the data successfully")
            console.log("got the data")
        }
    } 
    useEffect(()=>{
        getData();
    },[])

    const deleteUser=async(id)=> {
        const res2=await fetch(`/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
        }
        )
        const deleteData=await res2.json();
        console.log(deleteData)

        if (res2.status===422 || !deleteData){
            console.log("error")
        }else{
            // alert("User deleted Successfully")
            console.log("user deleted successfully")
            getData();
        }
    }

  return (
    <>
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2'>
                    <button className='btn btn-secondary mb-3'>
                        <Link to="/register" style={{color:"white"}}>Add Data</Link>
                    </button>
                </div>
                <table class="table">
                        <thead>
                        <tr className='table-secondary'>
                            <th scope="col">Sr.no</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Occupation</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                            {
                                getUserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.mobile}</td>
                                                <td>{element.occupation}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <Link to={`view/${element._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></Link>
                                                    <Link to={`edit/${element._id}`}><button className='btn btn-secondary'><CreateIcon /></button></Link>
                                                    <button className='btn btn-danger' onClick={()=>deleteUser(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                {/* <table class="table mt-5">
                <thead>
                    <tr className='table-secondary'>
                    <th scope="col">Sr.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Occupation</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>{getUserdata[0].name}</td>
                    <td>{getUserdata[0].email}</td>
                    <td>{getUserdata[0].mobile}</td>
                    <td>{getUserdata[0].occupation}</td>
                    <td className='d-flex justify-content-between'>
                        <button className='btn btn-success'><RemoveRedEyeIcon /></button>
                        <button className='btn btn-secondary'><CreateIcon /></button>
                        <button className='btn btn-danger'><DeleteOutlineIcon /></button>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Marks</td>
                    <td>@mdos</td>
                    <td>2121222121</td>
                    <td>xyqz</td>
                    <td className='d-flex justify-content-between'>
                        <button className='btn btn-success'><RemoveRedEyeIcon /></button>
                        <button className='btn btn-secondary'><CreateIcon /></button>
                        <button className='btn btn-danger'><DeleteOutlineIcon /></button>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Mawrks</td>
                    <td>@mwdos</td>
                    <td>21222121</td>
                    <td>xwyqz</td>
                    <td className='d-flex justify-content-between'>
                        <button className='btn btn-success'><RemoveRedEyeIcon /></button>
                        <button className='btn btn-secondary'><CreateIcon /></button>
                        <button className='btn btn-danger'><DeleteOutlineIcon /></button>
                    </td>
                    </tr>
                </tbody>
                </table> */}
            </div>
        </div>
    </>
  )
}
