const connection = require('../connection');

const fun = async (arr)=>{
    var ID = arr.parent[arr.parent.type];
    const sql = "INSERT INTO `Internship_Task`.`para` (`id`, `parentType`, `parentID`, `content`) VALUES ('"+arr.id+"', '"+arr.parent.type+"', '"+ID+"', '"+arr.paragraph.rich_text[0].text.content+"');"
    connection.execute(sql,function (err,result){
        if(err) throw err;   
    })

    return null
}

module.exports = fun;