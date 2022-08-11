const unirest = require('unirest');

const fun = async (id)=>{
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get(`https://api.notion.com/v1/blocks/${id}/children`)
            .headers({
                Accept: 'application/json',
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NOTION_KEY}`
              })
            .end(function (response) {
              if (response.error) {
                return reject(response.error)
              }
              return resolve(response.body);
            });
            })
          }
        var l = await getToken();
        return(l);
}

module.exports = fun;