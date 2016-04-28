'use strict';

module.exports = exports = (redis) => {

redis.defineCommand('wagAdd', {
  numberOfKeys: 4,
  lua: ` 
    local group = KEYS[1]
    local name = KEYS[2]
    local incr = KEYS[3] 
    local hash = KEYS[4]

    if redis.call('SISMEMBER', group, name) == 0 then 
       local id = redis.call("INCR", incr) 

       hash = string.gsub(hash, "$id", id) 
       hash = string.gsub(hash, "$name", name) 

       table.insert(ARGV, 1, 'id') 
       table.insert(ARGV, 2, id) 

       redis.call("HMSET", hash, unpack(ARGV)) 
       redis.call("SADD", group, name) 

       return id
    end 
    return nil` 
});




redis.defineCommand('wagUpdate', {
  numberOfKeys: 3,
  lua: ` 
    local id = KEYS[1]
    local name = KEYS[2]
    local hash = KEYS[3]

    hash = string.gsub(hash, "$id", id) 
    hash = string.gsub(hash, "$name", name) 

    return redis.call("HMSET", hash, unpack(ARGV)) `
});





redis.defineCommand('wagGetAll',{ 
  numberOfKeys: 0,
  lua: ` 
    local page = ARGV[1]
    local match = ARGV[2]
    local count = ARGV[3]
    local resp = {}
    local rows = {}

    local attr = nil
    local row = {}

    rows = redis.call('SCAN', page, 'MATCH', match, 'COUNT', count) 

    for i, k in ipairs(rows[2]) do 
      row = redis.call('HGETALL', k)
      local wag = {}

		  for h, v in ipairs(row) do
        if h % 2 == 1 then 
          attr = v 
        else 
          wag[attr] = v 
        end 
      end 

      resp[i] = wag 
    end 
    return cjson.encode(resp)`
});





redis.defineCommand('wagDel',{ 
  numberOfKeys: 2,
  lua: ` 
    local name = KEYS[1]
    local fullkey = KEYS[2]
    local group = ARGV[1]
    
    redis.call("SREM", group, name) 
    return redis.call('DEL', fullkey) `
});

}
