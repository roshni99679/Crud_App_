import React, { useState ,useEffect} from 'react'
import { useParams,useNavigate} from 'react-router-dom'



export default function Edit() {

    

    const history = useNavigate("");
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

    const { id } = useParams("");
    console.log(id);



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
            setinp(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getData();
    }, []);

    const updateuser = async(e)=>{
        e.preventDefault();

        const {name,email,mobile,occupation,text} = inp;

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,email,mobile,occupation,text
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            alert("data updated ")
            history("/")
           
        }

    }
    return (

    <>
    <h3 className='mt-3 mb-5'>Edit page</h3>
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
        <button type="submit" onClick={updateuser} className="btn btn-secondary">Submit</button>
        </div>
    </form> 
    </div>
    </>
  )
}
