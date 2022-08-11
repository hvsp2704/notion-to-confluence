require('dotenv').config();
var unirest = require('unirest');

const fun = (title,content)=>{
  console.log(title);
  console.log(content);
  var url = `${process.env.BASEURL}`+'/rest/api/content'
  var req = unirest('POST', url)
    .headers({
      'Accept': 'application/json',
      'Authorization': `Basic ${process.env.PASSWORD}`
    })
    .type('json')
    .send({
        "space" : {"key" : `${process.env.SPACE}`},
        "type" : "page",
        "title" : title,
        "body" : {
            "storage":{
                "value": content,
                "representation" : "storage"
            }
        }
    })
    .end(function (res) { 
      if (res.error) throw new Error(res.error); 
    });
}

module.exports = fun;