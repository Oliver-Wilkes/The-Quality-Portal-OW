'use strict';

exports = module.exports = function(app, mongoose) {
  var TestSchema = new mongoose.Schema({
      TestField: { type: String, default: 'false' },
  });

  TestSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Test', TestSchema);
};
