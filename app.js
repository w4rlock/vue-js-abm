'use strict'

let express = require('express')
	, routes = require('./routes/index')
	, users = require('./routes/user')
	, wags = require('./routes/wags')
	, app = express();

require('./conf/express')(app);

//app.use('/', routes);
app.use('/users', users);
app.use('/wags', wags);

require('./middlwares/error')(app)
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
