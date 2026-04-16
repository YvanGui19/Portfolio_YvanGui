module.exports = {
  apps: [
    {
      name: 'portfolio-api',
      script: 'server/index.js',
      cwd: '/var/www/portfolio',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_file: '/var/www/portfolio/server/.env',
      error_file: '/var/log/pm2/portfolio-error.log',
      out_file: '/var/log/pm2/portfolio-out.log',
      time: true
    }
  ]
};
