const unirest = require('unirest');

const fun = async (id)=>{
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/getConPages')
            .type('json')
            .send({
                "id":`${id}`
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
        var p_id = l[0].ID;
        var alpha = (JSON.parse(l[0].properties))
        console.log(alpha);

        if("Date" in alpha){
          var d_id = alpha.Date.id;

          function getTkn() {
              var url = `https://api.notion.com/v1/pages/${(p_id)}/properties/${(d_id)}`
              console.log(url)
              return new Promise((resolve, reject) => {

                unirest
                  .get(url)
                  .headers({
                      Accept: 'application/json',
                      'Notion-Version': '2022-06-28',
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
          var prop = await getTkn()
          if (prop.date == null){
              return "table"
          }else{
              return "calendar"}
          }
          else{
            return "list"
          }



        



}
module.exports = fun;
