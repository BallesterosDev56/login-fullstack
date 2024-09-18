import {useForm} from 'react-hook-form'


export const Register = ()=> {
    const {register, handleSubmit} = useForm();

    const fetchRegister = async(object)=> {
        let response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers : { 
                    'Content-Type' : 'application/json'
            },
            body: object
        });
        let data = await response.json();
        return data;
    }

    const onSubmit = (data)=> {
        
        if (data.Rpswrd == data.pswrd) {
            let objetData = {
                userName: data.username,
                userPassword: data.pswrd,
            }
            
            fetchRegister(objetData).then((data)=> {
                console.log(data);
                
            })
        }
    }

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="card">
                <div className="body-card">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div className="mx-5 my-5">
                            <label className="form-label" htmlFor="username">Username:</label><br />
                            <input {...register('username')} className="form-control" id="username" type="text" required/>
                        </div>
                        <div className="mx-5 my-5">
                            <label className="form-label" htmlFor="password">Password</label><br />
                            <input {...register('pswrd')} className="form-control" id="password" type="password" required/>
                        </div>
                        <div className="mx-5 my-5">
                            <label className="form-label" htmlFor="Rpassword">Repeat password</label><br />
                            <input {...register('Rpswrd')} className="form-control" id="Rpassword" type="password" required/>
                        </div>
                    <div className="d-flex justify-content-center mb-2">
                        <button type='submit' className='btn btn-primary'>submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

    )
}