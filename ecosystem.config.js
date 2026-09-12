module.exports = {
  apps: [
    {
      name: 'motor-disparador-engine',
      script: './.claude/agent-trigger-engine.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        LOG_LEVEL: 'info'
      },
      error_file: './.claude/logs/engine-error.log',
      out_file: './.claude/logs/engine-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      watch: false,
      max_memory_restart: '500M',
      restart_delay: 5000
    },
    {
      name: 'webhook-dispatcher',
      script: './.claude/webhook-dispatcher.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        LOG_LEVEL: 'info'
      },
      error_file: './.claude/logs/webhook-error.log',
      out_file: './.claude/logs/webhook-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      watch: false,
      max_memory_restart: '500M',
      restart_delay: 5000
    }
  ]
};
