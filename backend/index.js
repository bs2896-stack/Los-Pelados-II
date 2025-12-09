import fs from "fs"
import { subscribeGETEvent, subscribePOSTEvent, realTimeEvent, startServer } from "soquetic";
let sabores = fs.readFileSync ("data/sabores.JSON", "utf-8")
sabores = JSON.parse (sabores)


let productos = fs.readFileSync ("data/productos.JSON", "utf-8")
productos = JSON.parse (productos)


let pedidos= fs.readFileSync("data/pedidos.JSON", "utf-8")
pedidos= JSON.parse (pedidos)


function leersabores (){
sabores
return sabores
}
function leerproductos () {
productos
return productos
}
function escribirpedidos (producto, sabores, nombre) {
    let pedido = {cliente: nombre, producto: producto, sabores: sabores};
    let pedidosJSON = fs.readFileSync ("data/pedidos.json", "utf-8");
    let pedidos = JSON.parse (pedidosJSON)
    pedidos.push (pedido)
    fs.writeFileSync ("data/pedidos.json", JSON.stringify (pedidos,null,2));


}


subscribeGETEvent ("sabores", leersabores)
subscribeGETEvent ("productos", leerproductos)
subscribePOSTEvent ("pedido", (producto, sabores, nombre) => escribirpedidos(producto, sabores, nombre))


startServer (3000, true)