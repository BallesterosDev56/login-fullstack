import { useEffect, useState } from "react";
import { MapView } from "../../components/mapView/MapView"
import { useForm } from "react-hook-form"

export const Home = ()=> {
    const {register, handleSubmit, reset} = useForm();
    const [locations, setlocations] = useState([]);
    const [object, setObject] = useState(null);

    const onSubmit = (data)=> {                
        let objectLocations = JSON.parse(data.locations);   
        setlocations((prev)=>[...prev, ...objectLocations.ubicaciones]);
        setObject(data.locations);

        reset();
    }


    return(
        <section className="mb-5">
            <h1 className="fs-1 text-center mb-5 mt-3">Low Cost</h1>
            <div className="d-flex justify-content-center vw-100">
                <div className="col-8 rounded border py-3 d-flex justify-content-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="form mx-5 col-2 d-flex flex-column justify-content-center">
                        <div className="div">
                            <label className="label my-3 fs-5 fw-bold" htmlFor="textarea">Enter the Json: </label>
                            <textarea {...register('locations')} className="form-control my-2" id="textarea"></textarea>
                        </div>
                        <div className="div d-flex justify-content-center mt-3">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                    <MapView locations={locations} object={object}></MapView>
                </div>
            </div>
        </section>
    )
}