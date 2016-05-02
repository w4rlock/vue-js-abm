'use strict'

let express = require('express')
	, routes = require('./routes/index')
	, app = express();

require('./conf/express')(app);

//app.use('/', routes);
app.use('/api/users', require('./routes/user'));
app.use('/api/wags', require('./routes/wags'));

require('./middlwares/error')(app)
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
