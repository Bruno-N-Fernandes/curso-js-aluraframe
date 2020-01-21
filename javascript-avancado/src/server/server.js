import { createServer } from 'http';
import app from './config/express';

const server = createServer(app);

server.listen(3000, function() {
    console.log('Servidor escutando na porta: ' + this.address().port);
});

