const fun = (arr)=>{
    var content = ""
    const n = arr.length;
    for(var i = 0 ; i<n;i++ ){
        content = content + "<p>" + arr[i].content + "</p>" ;
    }
    return content;
}

module.exports = fun;