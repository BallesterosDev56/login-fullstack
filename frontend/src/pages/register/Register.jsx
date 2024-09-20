import {useForm} from 'react-hook-form'
import {useAuth} from '../../logic/AuthProvider'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';


export const Register = ()=> {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const {userState, login} = useAuth();

    const onSubmit = (data)=> {
        
        if (data.Rpswrd == data.pswrd) {
            let objetData = {
                userName: data.username,
                userPassword: data.pswrd,
            }
            
            fetchRegister(objetData).then((data)=> {
                if (data.success) {
                    login();
                } else {
                    console.log(response);
                    alert(response.error);
                }
                
            })
        }
    }

    const fetchRegister = async(object)=> {
        let response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers : { 
                    'Content-Type' : 'application/json'
            },
            body: JSON.stringify(object)
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
                    <h2 className="fs-2 text-center mt-4">REGISTER</h2>
                        <div className="mx-5 my-3">
                            <label className="form-label" htmlFor="username">Username:</label><br />
                            <input {...register('username')} className="form-control" id="username" type="text" required/>
                        </div>
                        <div className="mx-5 my-3">
                            <label className="form-label" htmlFor="password">Password</label><br />
                            <input {...register('pswrd')} className="form-control" id="password" type="password" required/>
                        </div>
                        <div className="mx-5 my-3">
                            <label className="form-label" htmlFor="Rpassword">Repeat password</label><br />
                            <input {...register('Rpswrd')} className="form-control" id="Rpassword" type="password" required/>
                        </div>
                    <div className="d-flex flex-column justify-content-center mb-2 px-5">
                        <button type='submit' className='btn btn-primary'>submit</button>
                        <Link className='link-primary text-center my-2' to={'/login'}>Login</Link>
                    </div>
                    </form>
                </div>
            </div>
        </div>

    )
}