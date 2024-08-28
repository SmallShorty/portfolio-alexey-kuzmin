module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          "script-src": ["self", "http", "https"],
          "frame-src": ["self", "http", "https"],
          "frame-ancestors": ["self", "http", "https", "http://localhost:*"],
        },
        frameguard: {
          action: 'sameorigin'
        }
      },
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'strapi::cors'
];