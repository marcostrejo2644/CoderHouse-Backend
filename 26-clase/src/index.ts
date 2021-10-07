import server from './server';

const port = process.env.PORT || 4000;

// Server Ready
server.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});

server.on('error', (error: any) => console.log(error));
