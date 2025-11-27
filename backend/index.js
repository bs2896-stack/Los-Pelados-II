import {
    subscribeGETEvent, 
    subscribePOSTEvent, 
    startServer
} from "soquetic";

import fs from "fs";

// Función para enviar sabores (evento GET)
function enviarSabores() {
    const sabores = JSON.parse(fs.readFileSync("data/sabores.json", "utf-8"));
    return sabores;
}

// Función para enviar productos (evento GET)
function enviarProductos() {
    const productos = JSON.parse(fs.readFileSync("data/productos.json", "utf-8"));
    return productos;
}

// Función para recibir y guardar pedidos (evento POST)
function enviarPedido(data) {
    try {
        let pedidos = JSON.parse(fs.readFileSync("data/pedidos.json", "utf-8"));
        
        if (!Array.isArray(pedidos)) pedidos = [];
        
        pedidos.push(data);
        let pedidosJSON = JSON.stringify(pedidos, null, 2);
        fs.writeFileSync("data/pedidos.json", pedidosJSON);
        
        return { ok: true };
    } catch (error) {
        console.error("Error al guardar pedido:", error);
        return { ok: false };
    }
}

// Suscribirse a los eventos
subscribeGETEvent("sabores", enviarSabores);
subscribeGETEvent("productos", enviarProductos);
subscribePOSTEvent("pedido", enviarPedido);

// Iniciar el servidor
startServer();