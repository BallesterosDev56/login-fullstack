import { useForm } from "react-hook-form";
import {useAuth} from '../../logic/AuthProvider';
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";

export const Login = ()=> {

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const {userState, login} = useAuth();

    const onSubmit = (data)=> {
        
        let objectData = {
            userName: data.username,
            userPassword: data.pswrd,
        }
        fetchLogin(objectData).then((response)=> {
            if (response.success) {
                login();
            } else {
                console.log(response);
                alert(response.error);
            }
            
        })
    }
    const fetchLogin = async(object)=> {
        let response = await fetch('http://localhost:3000/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(object),
        });
        let data = await response.json();

        return data;
    }

    useEffect(()=>{
        if (userState) {
            navigate('/home');
        }

    }, [userState])

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="card">
                <div className="body-card">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <h2 className="fs-2 text-center mt-4">LOGIN</h2>
                        <div className="mx-5 my-5">
                            <label className="form-label" htmlFor="username">Username:</label><br />
                            <input {...register('username')} className="form-control" id="username" type="text" required/>
                        </div>
                        <div className="mx-5 my-5">
                            <label className="form-label" htmlFor="password">Password</label><br />
                            <input {...register('pswrd')} className="form-control" id="password" type="password" required/>
                        </div>
                    <div className="d-flex flex-column justify-content-center mb-2 px-5">
                        <button type='submit' className='btn btn-primary'>submit</button>
                        <Link className="link-primary text-center my-2" to={'/register'}>Register</Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}