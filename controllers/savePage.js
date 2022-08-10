const connection = require('../connection');
const unirest = require('unirest');
const fun = async (arr)=>{

    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/checkpg')
            .type('json')
            .send(
                {
                    "id" : `${arr.id}`
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

    const ver = await getToken();
    console.log(ver);
    console.log(JSON.parse(ver));
    if (ver){
        var sql = "INSERT INTO `Internship_Task`.`Page` (`ID`, `created_time`, `last_edited_time`, `created_by`, `cover`, `icon`, `parent`, `archived`, `properties`) VALUES ('"+ arr.id +"', '"+arr.created_time+"', '"+arr.last_edited_time+"', '"+JSON.stringify(arr.created_by)+"', '"+JSON.stringify(arr.cover)+"', '"+JSON.stringify(arr.icon)+"', '"+JSON.stringify(arr.parent)+"', '"+arr.archived+"', '"+JSON.stringify(arr.properties)+"')";
        connection.execute(sql,function (err,result){
            if(err) throw err;
            console.log(result);    
        })
    };


    

}

module.exports = fun;