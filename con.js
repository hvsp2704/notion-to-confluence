const Confluence = require('confluence-api');
require('dotenv').config();
// const config = {
//     username: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     baseUrl:  process.env.BASEURL,
// };
// const con = new Confluence(config);

// con.getSpace("Internship Task",async (err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         const result = await data;
//         console.log(result);
//     }
// });


var unirest = require('unirest');
var req = unirest('GET', 'https://hvsp.atlassian.net/wiki/rest/api/content')
  .headers({
    'Accept': 'application/json',
    'Authorization': `Basic ${process.env.PASSWORD}`
  })
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    const arr = JSON.parse(res.raw_body)
    const something = arr.results.map((item)=>{
        console.log(item);
    });
  });
