'use strict';

var routeService = require('../service/routes');

exports = module.exports = function(app, passport) {

require('./test')(app);

//other routes not found nor begin with /api is handled by Angular
app.all(/^(?!\/api).*$/, routeService.useVue);

};