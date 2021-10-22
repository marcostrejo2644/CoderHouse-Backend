import server from './server';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';

const args = minimist(process.argv.slice(2));

const port = args.port || process.env.PORT || 4000;

// Yo uso isPrimary porque mi OS siempre usa lo ultimo del mercado por lo tanto tengo la ultima version de node
if (cluster.isPrimary && args.cluster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker: any) => {
    cluster.fork();
  });
} else {
  server.listen(port, () => console.log(`Server on http://localhost:${port}`));
}

// Server Ready
// server.listen(port, () => {
//   console.log(`Server on http://localhost:${port}`);
// });

server.on('error', (error: any) => console.log(error));
