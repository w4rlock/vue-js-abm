'use strict';

let Wags = module.exports
  , Redis = require('ioredis')
;

const redis = new Redis();

//custom commands redis
require('./wags.redis.lua')(redis)


const K = {
    entity: 'wag:$id:$name'
  , next_id: 'next:id:wag'
  , members: 'wags'
}


Wags.save = (w) => {
  return new Promise((res, rej) => {
    redis.wagAdd(K.members, w.name, K.next_id, K.entity, unpack(w), (err, id) => {
      if (err) throw new Error(err);
      res(id);
    });
  });
}


Wags.update = (w) => {
  return new Promise((res, rej) => {
    redis.wagUpdate(w.id, w.name, K.entity, unpack(w), (err, id) => {
      if (err) throw new Error(err);
      res(id);
    });
  });
}


Wags.getAll = () => {
  let match = 'wag:*:*';
  let count = 500;
  let page = 0;

  return new Promise((res, rej) => {
    redis.wagGetAll(page, match, count, (err, data) => {
      if (err) throw new Error(err);

      res(data);
    });
  
  });
}



Wags.remove = (id) => {
  return new Promise((res, rej) => {
    Wags.getFullKey(id).then(dat => {

      let fullkey = dat[1][0];
      let name = fullkey.replace(/\w+:\w+:/, '');

      return redis.wagDel(name, fullkey, K.members, (err, data) => {
        if (err) throw err;
        res(data);
      });

    });

  });
}



Wags.getFullKey = (id) => {
  let key = K.entity
             .replace('$name', '*')
             .replace('$id', id);

  return new Promise((res, rej) => {
    redis.scan(0, 'MATCH', key, (err, data) => {
      if (err) throw err;
      res(data);
    
    });
  });
}


//return array keys and values
function unpack(obj) {
  let res = [];
  for (var k in obj){
    res.push(k);
    res.push(obj[k]);
  }

  return res;
}
