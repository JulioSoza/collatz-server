const http = require('http');
const url = require('url');

// Función para calcular la secuencia de Collatz
function calcularCollatz(numero) {
    const secuencia = [numero];
    while (numero !== 1) {
        if (numero % 2 === 0) {
            numero = numero / 2;
        } else {
            numero = 3 * numero + 1;
        }
        secuencia.push(numero);
    }
    return secuencia;
}

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === '/collatz' && req.method === 'GET') {
        const numero = parseInt(parsedUrl.query.numero, 10);

        // Validar que el número sea un entero positivo
        if (isNaN(numero) || numero <= 0 || !Number.isInteger(numero)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'El número debe ser un entero positivo.' }));
            return;
        }

        // Calcular la secuencia de Collatz
        const secuencia = calcularCollatz(numero);

        // Devolver la secuencia en formato JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ secuencia }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ruta no encontrada.' }));
    }
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});