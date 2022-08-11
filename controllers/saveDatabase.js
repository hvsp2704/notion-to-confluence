const connection = require('../connection');
const unirest = require('unirest');

const fun = async (arr)=>{

    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/checkdb')
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
    
    var ver = await getToken();
    var title = arr.title[0].plain_text;
    if (!(ver)){
        var sql = "INSERT INTO `Internship_Task`.`Databases` (`ID`, `cover`, `icon`, `created_time`, `created_by`, `last_edited_by`, `last_edited_time`, `title`, `description`, `is_inline`, `properties`, `parent`, `url`, `archived`)"+` VALUES ('${arr.id}', '${arr.cover}', '${arr.icon}', '${arr.created_time}', '${JSON.stringify(arr.created_by)}', '${JSON.stringify(arr.last_edited_by)}', '${arr.last_edited_time}', '${title}', '${arr.description}', '${arr.is_inline}', '${(JSON.stringify(arr.properties))}', '${JSON.stringify(arr.parent)}', '${arr.url}', '${arr.archived}')`;
        connection.execute(sql,function (err,result){
            if(err) throw err;
            console.log(result);    
        })
    };

}

module.exports = fun;