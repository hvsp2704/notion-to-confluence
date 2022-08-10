const unirest = require('unirest');
require('dotenv').config();

const fun = async ()=>{
  function getToken() {
    return new Promise((resolve, reject) => {
      unirest
        .post('https://api.notion.com/v1/search')
        .type('json')
        .headers({
            Accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NOTION_KEY}`
          })
        .send(
            {
                filter: {
                    value:'page', 
                    property: 'object'
                },
                page_size: 100
            }
        )
        .end(function (response) {
          if (response.error) {
            return reject(response.error)
          }
          return resolve(response.body);
        });
        })
      }
    var l = await getToken();
    return(l.results);
}

module.exports = fun;