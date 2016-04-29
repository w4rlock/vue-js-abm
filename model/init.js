'use strict'

let model = require('../model/wags');
 

let data = [{"header_id":"12345432","type":"medio","id":"6","profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/707040057576845312\/qAyzVFTi_normal.jpg","name":"Marcelo Polino","query":"","profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/1613292079\/1458884160","screen_name":"MarceloPolino","header_text":"Ssssss polinn"},{"header_id":"554123123","type":"botinera","id":"1","profile_image_url":"http:\/\/www2.pictures.zimbio.com\/gi\/Wanda%20Nara%20FC%20Internazionale%20Milano%20v%20Udinese%20WSx5WOCLpgkl.jpg","name":"WandaIcardi","query":"","profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/138843574\/1460500767","screen_name":"Wanda Nara","header_text":"header testtt wandica"},{"header_id":"645243123","type":"botinera","id":"5","profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/684462988644999168\/6bKwRdbX_normal.jpg","name":"Evange_Anderson","query":"","profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/278461430\/1437433384","screen_name":"Evange Anderson","header_text":"testtt header evanfe anderson"},{"header_id":"542334","type":"botinera","id":"4","profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/722081039741501444\/f4-w0dA1_normal.jpg","name":"TamaraAlvesOK","query":"","profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/4519981971\/1460992486","screen_name":"TAMARA ALVES","header_text":"dfdfssdfsdfdsf"},{"header_id":"9898888","type":"botinera","id":"2","profile_image_url":"http:\/\/pbs.twimg.com\/profile_images\/701143632380821504\/gxO8HOgV_normal.jpg","name":"ivinadal","query":"","profile_banner_url":"https:\/\/pbs.twimg.com\/profile_banners\/189602998\/1456000644","screen_name":"Ivana Nadal","header_text":"234345345"}];

for (var w of data){
  model.save(w).then((id) => {
     console.log(id);
  })
  .catch((err) => {
     console.error(err);
  });

}


setTimeout(() => {
  model.getAll().then((res) => {
    console.log(res);

  }).catch((err) => {
    console.error(err);
  });
}, 300);
