import React, { useState ,useEffect} from 'react'

import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Details() {
    const [getUserdata,setUserdata]=useState([])
    console.log(getUserdata)

    const {id}=useParams("")
    console.log(id)

    const history = useNavigate();

    const getData = async () => {

        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("got the data");
        }
    }

    useEffect(() => {
        getData();
    }, [])

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
            history("/")
        }
    }

  return (
    <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome Roshni</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <Link to={`/edit/${getUserdata._id}`} ><button className="btn btn-primary mx-2"><CreateIcon /></button></Link>
                        <button className="btn btn-danger" onClick={()=>deleteUser(getUserdata._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            
                            <h3 className="mt-3">Name: <span >{getUserdata.name}</span></h3>
                            
                            <p className="mt-3"><MailOutlineIcon />Email: <span>{getUserdata.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occuption: <span>{getUserdata.occuation}</span></p>
                        </div>
                        <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-5"><PhoneAndroidIcon />mobile: <span>+91 {getUserdata.mobile}</span></p>
                            <p className="mt-3">Message: <span>{getUserdata.text}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
  )
}
