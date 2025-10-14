
module.exports = {
  apps: [
    {
      name: 'tarzbygazala',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3010',
      cwd: '/clients/tarzbygazala',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};

