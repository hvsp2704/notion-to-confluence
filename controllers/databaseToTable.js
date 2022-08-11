const table = require('table-builder');
const unirest = require('unirest');
const pgTitle = require('./pgTitle');
const mkCon = require('./makeContent');
const getPara = require('./getPara');
const makePage = require('./makePage');
const fun = async (arr,x)=>{
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/getConPages')
            .type('json')
            .send({
                "id":`${arr.ID}`
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
        var n = l.length;
        if (x){
            var headers = { "name" : "Event", "date": "Date", "content": "Description" };
        }else{
            var headers = { "name" : "Event", "content": "Description" };
        }
        var data = [];
        for (var i = 0; i<n; i++){

            var p_id = l[i].ID;
            var alpha = (JSON.parse(l[i].properties))
            var d_id = alpha.Date.id;
    
            function getTkn() {
                return new Promise((resolve, reject) => {
                  unirest
                    .get(`https://api.notion.com/v1/pages/${p_id}/properties/${d_id}`)
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
            var prop = await getTkn()
            var paralist = await getPara(p_id);
            var content = await mkCon(paralist);

            if (x){
                var dic = {
                    "date" : prop.date.start,
                    "name" : await pgTitle(p_id),
                    "content" : content
                }
            }else{
                var dic = {
                    "date" : prop.date,
                    "name" : await pgTitle(p_id),
                    "content" : content
                }
            }
            data.push(dic);
        }

        var newContent = (new table({'class': 'some-table'}))
                            .setHeaders(headers) 
                            .setData(data) 
                            .render()
        
        const something = await makePage(arr.title,newContent);
        return 0;
}
module.exports = fun;