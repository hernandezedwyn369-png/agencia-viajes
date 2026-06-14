require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

app.get("/",(req, res) =>{
    res.sendFile(path.join(__dirname, "index.html"));
    });

// Conexión MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
.then(() => console.log("Mongo conectado"))
.catch(err => console.log(err));

// Modelo
const Viaje = mongoose.model(
    "Viaje",
    new mongoose.Schema({
        destino: String,
        pais: String,
        precio: Number
    })
);

// Mostrar todos
app.get("/destinos", async (req, res) => {

    const datos = await Viaje.find();

    res.json(datos);

});

// Guardar
app.post("/guardar", async (req, res) => {

    const nuevo = new Viaje(req.body);

    await nuevo.save();

    res.json({
        mensaje: "Guardado"
    });

});

// Buscar
app.get("/buscar/:destino", async (req, res) => {

    const datos = await Viaje.find({
        destino: {
            $regex: req.params.destino,
            $options: "i"
        }
    });

    res.json(datos);

});

// Eliminar
app.delete("/eliminar/:id", async (req, res) => {

    await Viaje.findByIdAndDelete(req.params.id);

    res.json({
        mensaje: "Eliminado"
    });

});

// Editar
app.put("/editar/:id", async (req, res) => {

    await Viaje.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json({
        mensaje: "Actualizado"
    });

});

// Puerto para Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});