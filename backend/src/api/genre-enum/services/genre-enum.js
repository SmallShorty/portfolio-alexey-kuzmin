'use strict';

/**
 * genre-enum service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::genre-enum.genre-enum');
