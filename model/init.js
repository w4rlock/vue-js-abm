'use strict'

let model = require('../model/wags');
 

let data = [
{
  id: 1,
  profile_banner_url: 'https://pbs.twimg.com/profile_banners/138843574/1460500767',
  profile_image_url: 'http://www2.pictures.zimbio.com/gi/Wanda%20Nara%20FC%20Internazionale%20Milano%20v%20Udinese%20WSx5WOCLpgkl.jpg',
  name: 'WandaIcardi',
  screen_name: 'Wanda Nara',
  query: "",
  type: 'botinera'
},

{
  id: 2,
  profile_banner_url: 'https://pbs.twimg.com/profile_banners/189602998/1456000644',
  profile_image_url: 'http://pbs.twimg.com/profile_images/701143632380821504/gxO8HOgV_normal.jpg',
  name: 'ivinadal',
  screen_name: 'Ivana Nadal',
  query: "",
  type: 'botinera'
},

{
  id: 3,
  profile_banner_url: 'https://pbs.twimg.com/profile_banners/247016455/1446468667',
  profile_image_url: 'http://pbs.twimg.com/profile_images/562592034398433280/pil40twI_normal.jpeg',
  name: 'SOL RIVAS',
  screen_name: 'SolangeRivas',
  query: "",
  type: 'botinera'
},

{
  id: 4,
  profile_banner_url: 'https://pbs.twimg.com/profile_banners/4519981971/1460992486',
  profile_image_url: 'http://pbs.twimg.com/profile_images/722081039741501444/f4-w0dA1_normal.jpg',
  name: 'TamaraAlvesOK',
  screen_name: 'TAMARA ALVES',
  query: "",
  type: 'botinera'
},

{
  id: 5,
  profile_banner_url: 'https://pbs.twimg.com/profile_banners/278461430/1437433384',
  profile_image_url: 'http://pbs.twimg.com/profile_images/684462988644999168/6bKwRdbX_normal.jpg',
  name: 'Evange_Anderson',
  screen_name: 'Evange Anderson',
  query: "",
  type: 'botinera'
},

{
  id: 6,
  profile_banner_url: 'https://pbs.twimg.com/profile_banners/1613292079/1458884160',
  profile_image_url: 'http://pbs.twimg.com/profile_images/707040057576845312/qAyzVFTi_normal.jpg',
  name: 'Marcelo Polino',
  screen_name: 'MarceloPolino',
  query: "",
  type: 'medio'
}]

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
