const Confluence = require('confluence-api');
require('dotenv').config();
var unirest = require('unirest');

var req = unirest('GET', 'https://hvsp.atlassian.net/wiki/rest/api/content?type=page&expand=body')
  .headers({
    'Accept': 'application/json',
    'Authorization': `Basic ${process.env.PASSWORD}`
  })
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    const arr = JSON.parse(res.raw_body);
    const l = arr.results;
    const n = l.length;

    for(var i = 0;i<n;i++){
        console.log(l[i]);
    }

  });