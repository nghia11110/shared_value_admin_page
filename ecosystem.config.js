module.exports = {
  apps: [
    {
      name: 'shared_value_maintain_page',
      script: './bin/www',

      node_args: ['--inspect=0.0.0.0:9229'],
      watch: true,
      ignore_watch: ['public/**/*', 'views/**/*.ejs'],
    },
  ],
};
