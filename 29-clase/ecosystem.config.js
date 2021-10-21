module.exports = {
  apps: [
    {
      name: 'app1',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=4001',
    },
    {
      name: 'app2',
      script: './dist/src/index.js',
      watch: true,
      autorestart: true,
      args: '--port=4002 --cluster=true',
    },
  ],
};
