const fs = require('fs');
const path = require('path');

// Cargar archivo JSON
const data = JSON.parse(fs.readFileSync('trailerflix.json', 'utf8'));

// Iniciar el archivo SQL
let sql = 'USE trailerflix;\n';

// Funciones auxiliares para manejar categorías, géneros y actores como tablas separadas
const generosSet = new Set();
const categoriasSet = new Set();
const actoresSet = new Set();

// **1. Inserción en la tabla Contenidos**
sql += 'INSERT INTO Contenidos (id, titulo, categoria, resumen, temporadas, poster) VALUES\n';
data.forEach((item, index) => {
    const temporadas = item.temporadas === 'N/A' ? 'NULL' : item.temporadas;
    const poster = item.poster ? `'${item.poster}'` : 'NULL';
    sql += `(${item.id}, '${item.titulo.replace(/'/g, "''")}', '${item.categoria.replace(/'/g, "''")}', '${item.resumen.replace(/'/g, "''")}', ${temporadas}, ${poster})`;
    sql += index < data.length - 1 ? ',\n' : ';\n';

    categoriasSet.add(item.categoria);
    const generos = item.genero.split(',').map(g => g.trim());
    generos.forEach(genero => generosSet.add(genero));

    const actores = item.reparto.split(',').map(a => a.trim());
    actores.forEach(actor => actoresSet.add(actor));
});

// **2. Inserción en la tabla Categorias**
sql += '\n\nINSERT INTO Categorias (nombre) VALUES\n';
categoriasSet.forEach((categoria, index) => {
    sql += `('${categoria.replace(/'/g, "''")}')`;
    sql += index < categoriasSet.size - 1 ? ',\n' : ';\n';
});

// **3. Inserción en la tabla Generos**
sql += '\n\nINSERT INTO Generos (nombre) VALUES\n';
Array.from(generosSet).forEach((genero, index) => {
    sql += `('${genero.replace(/'/g, "''")}')`;
    sql += index < generosSet.size - 1 ? ',\n' : ';\n';
});

// **4. Inserción en la tabla Actores**
sql += '\n\nINSERT INTO Actores (nombre) VALUES\n';
Array.from(actoresSet).forEach((actor, index) => {
    sql += `('${actor.replace(/'/g, "''")}')`;
    sql += index < actoresSet.size - 1 ? ',\n' : ';\n';
});

// **5. Inserción en la tabla intermedia Contenido_Genero**
sql += '\n\nINSERT INTO Contenido_Genero (contenido_id, genero_id) VALUES\n';
data.forEach(item => {
    const generos = item.genero.split(',').map(g => g.trim());
    generos.forEach(genero => {
        sql += `(${item.id}, (SELECT id FROM Generos WHERE nombre = '${genero.replace(/'/g, "''")}')),\n`;
    });
});
sql = sql.slice(0, -2) + ';\n';

// **6. Inserción en la tabla intermedia Contenido_Actor**
sql += '\n\nINSERT INTO Contenido_Actor (contenido_id, actor_id) VALUES\n';
data.forEach(item => {
    const actores = item.reparto.split(',').map(a => a.trim());
    actores.forEach(actor => {
        sql += `(${item.id}, (SELECT id FROM Actores WHERE nombre = '${actor.replace(/'/g, "''")}')),\n`;
    });
});
sql = sql.slice(0, -2) + ';\n';

// **7. Guardar el archivo SQL**
fs.writeFileSync(path.join(__dirname, 'migrate_data.sql'), sql);
console.log('Archivo migrate_data.sql generado exitosamente.');

// Debugging para verificar que los géneros se encuentran correctamente
const generoEncontrado = "AlgunGenero";
console.log(`Género encontrado: ${generoEncontrado ? generoEncontrado : 'No encontrado'}`);
