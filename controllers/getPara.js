const unirest = require('unirest');

const fun = async (id) => {
    console.log(id)
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/getPara')
            .headers({
                'Content-Type': 'application/json'
              })
            .send(JSON.stringify({
                "id": `${id}`
              }))
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