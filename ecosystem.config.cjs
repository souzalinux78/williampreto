module.exports = {
  apps: [
    {
      name: 'williampreto-api',
      script: 'src/server.js',
      cwd: './server',
      env_production: {
        NODE_ENV: 'production',
        PORT: 4110
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};
