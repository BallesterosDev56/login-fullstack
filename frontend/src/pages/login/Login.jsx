import { useForm } from "react-hook-form";

export const Login = ()=> {

    const {register, handleSubmit} = useForm();

    const onSubmit = (data)=> {
        
        console.log(data);
        
    }

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="card">
                <div className="body-card">
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div className="mx-5 my-5">
                            <label className="form-label" htmlFor="email">Email:</label><br />
                            <input {...register('email')} className="form-control" id="email" type="email" required/>
                        </div>
                        <div className="mx-5 my-5">
                            <label className="form-label" htmlFor="password">Password</label><br />
                            <input {...register('pswrd')} className="form-control" id="password" type="password" required/>
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