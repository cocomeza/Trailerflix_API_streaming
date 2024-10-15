const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./src/conexion/database');
const Contenido = require('./src/models/Contenido');
const Genero = require('./src/models/Genero');
const Contenido_Genero = require('./src/models/Contenido_Genero');

// Defini las relaciones muchos a muchos entre Contenido y Genero
Contenido.belongsToMany(Genero, { through: Contenido_Genero, foreignKey: 'ContenidoId' });
Genero.belongsToMany(Contenido, { through: Contenido_Genero, foreignKey: 'GeneroId' });

// Middleware para parsear JSON
app.use(express.json());


// Obtener todo el contenido
app.get('/contenidos', async (req, res) => {
    try {
        const contenidos = await Contenido.findAll();
        res.json(contenidos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener contenidos');
    }
});


// Obtener contenido por ID
app.get('/contenido/:contenidoID', async (req, res) => {
    try {
        const { contenidoID } = req.params;
        const contenido = await Contenido.findByPk(contenidoID);

        if (!contenido) {
            return res.status(404).json({ error: "Contenido no encontrado." });
        }
        res.status(200).json(contenido);
    } catch (error) {
        res.status(500).json({
            error: 'Error en el servidor',
            description: error.message
        });
    }
});

// Obtener contenido por nombre

app.get('/contenido/nombre/:nombreContenido', async (req, res) => {
    try {
        const { nombreContenido } = req.params;
        const contenido = await Contenido.findOne({ where: { titulo: nombreContenido } });

        if (!contenido) {
            return res.status(404).json({ error: "Contenido no encontrado." });
        }
        res.status(200).json(contenido);
    } catch (error) {
        res.status(500).json({
            error: 'Error en el servidor',
            description: error.message
        });
    }
});

// Endpoint para obtener contenido por genero

app.get('/contenido/genero/:genero', async (req, res) => {
    try {
        const genero = req.params.genero;
        console.log(`Buscando contenido para el género: ${genero}`);
        
        // Obtener el ID del género
        const generoEncontrado = await Genero.findOne({ where: { nombre: genero } });
        console.log(`Género encontrado: ${generoEncontrado ? generoEncontrado.nombre : 'No encontrado'}`);
        
        if (!generoEncontrado) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }

        // Obtener los contenidos asociados a ese género
        const contenidos = await Contenido.findAll({
            include: {
                model: Genero,
                where: { id: generoEncontrado.id }, // Usa el ID directamente
                through: { attributes: [] } // Evito incluir la tabla intermedia si no es necesario
            }
        });
        console.log(`Contenidos encontrados: ${JSON.stringify(contenidos)}`);
        return res.json(contenidos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener contenidos' });
    }
});


// Crear nuevo contenido

app.post('/contenido', async (req, res) => {
    try {
        const { titulo, categoria, resumen, temporadas, poster } = req.body;
        
        if (!titulo || !categoria) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: título o categoría' });
        }

        const nuevoContenido = await Contenido.create({
            titulo,
            categoria,
            resumen,
            temporadas,
            poster
        });

        res.status(201).json(nuevoContenido);
    } catch (error) {
        console.error("Error al crear contenido:", error);
        res.status(500).json({
            error: 'Error al crear contenido',
            description: error.message
        });
    }
});

//Actualizar contenido por ID 

app.put('/contenido/:contenidoID', async (req, res) => {
    try {
        const { contenidoID } = req.params;
        const { titulo, categoria, resumen, temporadas, poster, Generos } = req.body;

        // Verificar si los campos están completos
        const missingFields = [];
        if (!titulo) missingFields.push('titulo');
        if (!categoria) missingFields.push('categoria');
        if (!resumen) missingFields.push('resumen');
        if (!temporadas) missingFields.push('temporadas');
        if (!poster) missingFields.push('poster');

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Faltan datos en la solicitud',
                missingFields
            });
        }

        // Buscar el contenido a actualizar

        const contenido = await Contenido.findByPk(contenidoID);

        if (!contenido) {
            return res.status(404).json({ error: "Contenido no encontrado." });
        }

        // Actualizar el contenido

        await contenido.update({ titulo, categoria, resumen, temporadas, poster });

        // Si hay géneros, actualizo la relación muchos a muchos

        if (Generos && Generos.length) {
            const generosAsociados = await Genero.findAll({
                where: { nombre: Generos }
            });
            await contenido.setGeneros(generosAsociados);
        }

        res.status(200).json({
            message: "Contenido actualizado con éxito",
            contenido
        });

    } catch (error) {
        res.status(500).json({
            error: 'Error al actualizar el contenido',
            description: error.message
        });
    }
});

// Eliminar contenido por ID

app.delete('/contenido/:contenidoID', async (req, res) => {
    try {
        const { contenidoID } = req.params;
        const contenido = await Contenido.findByPk(contenidoID);

        if (!contenido) {
            return res.status(404).json({ error: "Contenido no encontrado." });
        }

        await contenido.destroy();
        res.status(200).json({ message: "Contenido eliminado con éxito." });
    } catch (error) {
        res.status(500).json({
            error: 'Error al eliminar el contenido',
            description: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

