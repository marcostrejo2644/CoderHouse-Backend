import server from './server';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const port = args.port || process.env.PORT || 4000;

// Server Ready
server.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});

server.on('error', (error: any) => console.log(error));
