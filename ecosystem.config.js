
module.exports = {
  apps: [
    {
      name: 'listy4u',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p 3012',
      cwd: '/clients/listy4u',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};

