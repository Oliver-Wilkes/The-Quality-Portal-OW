'use strict';
var service = {
  useVue: function(req, res, next){
    res.sendFile(require('path').join(__dirname, '../the-quality-portal-client/dist/index.html'));
  }}

  module.exports = service;