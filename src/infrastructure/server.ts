import * as dotenv from 'dotenv';
import * as http from 'http';
import { PostgresConnection } from './database/PostgresConnection';
import routes from './http';

dotenv.config();

const server = http.createServer(async (req, res) => {
    await routes.handle(req, res);
});

const port = process.env.BACKEND_PORT || 4000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Encerrar conexões ao receber o sinal de encerramento (como Ctrl+C no terminal)
process.on('SIGINT', async () => {
    console.log('Encerrando a aplicação...');
    await PostgresConnection.getInstance().end(); // Fecha o pool de conexões
    process.exit(0); // Encerra o processo da aplicação
});