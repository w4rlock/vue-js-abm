'use strict'

let express = require('express')
  , model = require('../model/wags')
	, router = express.Router();

router.get('/', list);
router.post('/', post);
router.put('/', update);
router.delete('/:id', remove);


function remove(req, res) {
  if (!req.params.id){
    res.status(500).json({ err: 'PARAM_ID_REQUIRED' }); 
  }

	model.remove(req.params.id).then((k) => {
    res.json({ id: k });
  }).catch((err) => {
    res.status(500).json({ err: err});
  });
  
}

function update(req, res) {
  if (!validate(req.body) || !req.body.id){
    res.status(500).json({ err: 'ALL_FIELDS_REQUIRED' }); 
  }

	model.update(req.body).then((id) => {
    res.json({ id: id });
  }).catch((err) => {
    res.status(500).json({ err: err});
  });
}


function post(req, res) {
  if (!validate(req.body)){
    res.status(500).json({ err: 'ALL_FIELDS_REQUIRED' }); 
  }

	model.save(req.body).then((id) => {
    res.json({ id: id });
  }).catch((err) => {
    res.status(500).json({ err: err});
  });
}


function list(req, res){
  model.getAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).json({ err: err});
  });
}


function validate(obj) {
  return (obj.name && obj.name != '') &&
         (obj.screen_name && obj.screen_name != '') &&
         (obj.type && obj.type != '') &&
         (obj.profile_image_url && obj.profile_image_url != '') 
}

module.exports = router;
