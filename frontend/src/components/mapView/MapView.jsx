import { useMap, Marker, Popup, MapContainer } from "react-leaflet";
import L from 'leaflet'
import mapImage from '../../assets/Colombia_Mapa_Oficial.svg.png'
import 'leaflet/dist/leaflet.css'
import { useEffect } from "react";

//componente que maneja la imagen superpuesta
const ImageOverlay = ()=> {
    const map = useMap();

    useEffect(()=> {
        //definimos los limites de la imagen
        const bounds = [[0, 0], [100, 100]];

        //agregamos la imagen superpuesta en el mapa
        L.imageOverlay(mapImage, bounds).addTo(map);

        //ajustamos el mapa a los limites de la imagen
        map.fitBounds(bounds);

    }, [map])

    return null;

}

export const MapView = ()=> {
    const position = [50, 50];
    const zoom = 1;
    const style = { height: "68vh", width: "37%" }

    return(
        <MapContainer
            center={position}
            zoom={zoom}
            style={style}
            crs={L.CRS.Simple}
        >

        <ImageOverlay></ImageOverlay>
        <Marker position={[50, 100]}>
      <Popup>
        A
      </Popup>
    </Marker>

        </MapContainer>
    )
}