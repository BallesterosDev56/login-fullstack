import { caminoMenosCostoso } from "../utils/pce.js"
export async function calculateRoute(req, res) {
    try{
        let graphJSON = req.body
        let [ruta, costos] = caminoMenosCostoso(graphJSON)
        res.json({ruta: ruta, costo: costos})
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
}