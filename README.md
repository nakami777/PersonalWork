# PersonalWork
<br>$mkdir tools
<br>$cd tools/
<br>$ll
<br>$mkdir image_download
<br>$cd image_download/
<br>$npm init
<br>$ll
<br>$npm i request fs csv --save
<br>$code .
<br>$mkdir app
<br>$touch app/index.js
<br>$node app/index.js 
<br>$mkdir images
<br>$node app/index.js 
<br>
<br>const root = require('app-root-path')
<br>const request = require('request');
<br>const fs = require('fs');
<br>const csv = require('csv');
<br>
<br>function GetImages(url, name) {
<br>    request(
<br>        {method: 'GET', url: url, encoding: null},
<br>        function (error, response, body){
<br>            if(!error && response.statusCode === 200){
<br>                fs.writeFileSync(root.path + '/images/' + name + '.png', body, 'binary');
<br>            }
<br>        }
<br>    );
<br>}
<br>
<br>fs.createReadStream(root.path + '/data/data.csv')
<br>  .pipe(csv.parse({columns: true}, function(err, data) {
<br>      for (const item of data) {
<br>          GetImages(item.url, item.name)
<br>          
<br>      }
<br>  }));
