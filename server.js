const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const config = {

    user: 'abdyt',

    password: '12345678',

    server: 'Abdy',

    database: 'FerreteriaDB',

    port: 1433,

    options: {
        trustServerCertificate: true
    }
};


// CONEXIÓN SQL SERVER

sql.connect(config)
.then(() => {

    console.log('Conectado a SQL Server');

})
.catch(err => console.log(err));



// OBTENER PRODUCTOS

app.get('/productos', async (req, res) => {

    try{

        const result = await sql.query`
            SELECT * FROM Producto
        `;

        res.json(result.recordset);

    }catch(error){

        console.log(error);

        res.status(500).send(error);
    }
});



// AGREGAR PRODUCTO

app.post('/productos', async (req, res) => {

    try{

        const {
            nombre,
            precio,
            stock,
            idCategoria
        } = req.body;

        await sql.query`
            INSERT INTO Producto(
                nombre,
                precio,
                stock,
                idCategoria
            )

            VALUES(
                ${nombre},
                ${precio},
                ${stock},
                ${idCategoria}
            )
        `;

        res.send('Producto agregado');

    }catch(error){

        console.log(error);

        res.status(500).send(error);
    }
});




// ACTUALIZAR PRODUCTO

app.put('/productos/:id', async (req, res) => {

    try{

        const id = req.params.id;

        const {
            nombre,
            precio,
            stock
        } = req.body;

        await sql.query`

            UPDATE Producto

            SET
                nombre = ${nombre},
                precio = ${precio},
                stock = ${stock}

            WHERE idProducto = ${id}

        `;

        res.send('Producto actualizado');

    }catch(error){

        console.log(error);

        res.status(500).send(error);
    }
});




// ELIMINAR PRODUCTO

app.delete('/productos/:id', async (req, res) => {

    try{

        const id = req.params.id;

        await sql.query`

            DELETE FROM Producto

            WHERE idProducto = ${id}

        `;

        res.send('Producto eliminado');

    }catch(error){

        console.log(error);

        res.status(500).send(error);
    }
});




// SERVIDOR

app.listen(3000, () => {

    console.log('Servidor en puerto 3000');

});