/**
 * students.js
 * 数据操作文件模块，
 *  职责：
 *  操作文件中的数据，只是处理数据，不关心业务
 */
var fs=require('fs');
var dbPath='./db.json';
/**
 * 获取所有学生列表
 * callback中的参数， 
 *  第一个参数是err ,
 *      成功的时候是null，
 *      错误的时候是错误对象
 *  第二个是我们需要的  结果
 *      成功 是 数组
 *      错误是 undefined
 * return []
 */
exports.find=function( callback ){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
           return  callback(err)
        }
        callback(null,JSON.parse(data).students)
        // JSON.parse(data).students
    })
}

/**根据id获取学生对象
 * @param{ Number } id    学生id
 * @param{function} callback 回调函数
 * 
 * 编辑的时候  根据id查找出来某个对象
 */
exports.findById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
           return  callback(err)
        }
        var students=JSON.parse(data).students
        var stu=students.find(item => {
            return item.id === parseInt(id) ;
        })
        callback(null,stu)
        // JSON.parse(data).students
    })
}

/**
 * 添加保存学生
 */

exports.save=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
           return  callback(err)
        }

        var students=JSON.parse(data).students;
        //处理id唯一  不重复
        student.id=students[students.length-1].id+1;
        // student.id=8
        // 把用户传递的对象保存到数组中
        students.push(student);
        // 把对象数据转换字符串
        var fileData=JSON.stringify({
            students:students
        })
        // 把字符串保存到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                // 错误就是把错误对象传递给回调
                return callback(err)
            }
            //成功就是没有错，所以错误对象是null
            callback(null)
        })
    })
}
// save({name:"dada",age:18},function(){})
/**
* 更新学生列表
*/
exports.updateById=function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)

        }
        var students=JSON.parse(data).students;
        students.id=parseInt(students.id)
        var stu=students.find(item => {
            return item.id === parseInt(student.id) ;
        })
        for(var key in student){
            stu[key]=student[key]
        }
        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                // 错误就是把错误对象传递给回调
                return callback(err)
            }
            //成功就是没有错，所以错误对象是null
            callback(null)
        })
    })
}
/**
 * 删除学生
 */
exports.deleteById=function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students=JSON.parse(data).students;
        // findIndex 根据元素的条件专门来查找下标的
        var deleteId=students.findIndex(function(item ) {
            return item.id === parseInt(id);
        })
        //将数据  根据下标删除一个
        students.splice(deleteId , 1 );
        var fileData=JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}