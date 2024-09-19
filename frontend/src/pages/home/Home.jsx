import { MapView } from "../../components/mapView/MapView"

export const Home = ()=> {
    return(
        <section className="">
            <h1 className="fs-1 text-center my-5">Low Cost</h1>
            <div className="d-flex justify-content-center vw-100">
                <div className="container rounded border p-3 d-flex justify-content-center">
                    <MapView></MapView>
                </div>
            </div>
        </section>
    )
}