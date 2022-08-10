const unirest = require('unirest');

const fun = ()=>{
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/pgParen')
            .headers()
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