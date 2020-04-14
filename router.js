/**
 * router.js路由模块
 * 职责：
 *  处理路由
 *  根据不同的请求方法+请求路径设置具体的请求处理函数
 *  模块职责要单一，不要乱写
 *  划分模块的摸底就是为了增强项目代码可读性
 *  提高开发效率
 */

var fs=require('fs');
var Students =require('./students.js')
//express 提供了一种更加方便的方式
// 专门用来包装路由的
var express =require('express');
//1. 创建一个路由容器   理由express 的Router模块
var router=express.Router();
// 2.把路由都挂载到router路由容器中

    router.get('/students',function(req,res){
        // res.send('hello word')
        // readFile 的第二个参数 是可选的utf8 就是转换为我们能认识的字符

        Students.find(function(err,students){
            if(err){
                return res.status(500).send('server error')
            }
            res.render('index.html',{
                fruits:[
                    '香蕉',
                    '橘子',
                    '苹果'
                ],
                students:students
            })
        })
    })
    router.get('/students/new',function(req,res){
      res.render('new.html') 
    })

    router.post('/students/new',function(req,res){
        //1.获取表单数据
        console.log(req.body)
        //2.处理
        // 将数据保存到db.json文件中 用于持久化
        //3.发送响应

        // 先读取文件，转换成对象
        // 然后往对象中push数据
        // 然后把对象转换为字符串
        // 然后把字符串在写入文件
        // Students.save(req.body,function(err){
        //     if(err){
        //         return res.status(500).send('报错了')
        //     }
        //     res.redirect('/students')
        // })
        Students.save(req.body,function(err){
            if(err){
                return res.status(500).send('报错了')
            }
            res.redirect('/students')
        })
        console.log(req.body)
    })
/**
 * 渲染编辑界面
 */
router.get('/students/edit',function(req,res){
    /**
     * 1.在客户端的列表页面找那个处理链接的问题(需要有id参数)
     * 2.获取要编辑的学生的id
     * 3.渲染编辑页面
     * 4.根据id把学生的信息查出来
     *  渲染页面 使用模板引擎渲染
     */
    // res.render('edit.html',{
    //     student:
    // })
    Students.findById(parseInt(req.query.id )  ,function(err,student){
        if(err){
            return  res.status(500).send('报错了')
        }
        console.log(student)
        res.render('edit.html',{
            students:student
        })
    })
})
/**
 * 处理编辑页面
 */
router.post('/students/edit',function(req,res){
    /**
     * 1.获取表单数据
     *  req.body
     * 
     * 2.更新
     *  Students.updateById()
     * 3.发送响应
     */
    console.log(req.body)
    Students.updateById(req.body,function(err){
        if(err){
            return  res.status(500).send('报错了')
        }
        res.redirect('/students')
    })
})

/**
 * 批量处理删除
*/
router.get('/students/delete',function(req,res){
    /**
     * 1.获取要删除的id
     * 2.根据id执行删除操作
     * 3.根据操作结果发送响应数据
     */
    console.log(req.query.id)
    var ids=req.query.id
    Students.deleteById(ids,function(err){
        if(err){
            return  res.status(500).send('报错了')
        }
        res.redirect('/students')
    })
})
// 3.把router导出
module.exports=router



// module.exports=function(app){
//     app.get('/students',function(req,res){
//         // res.send('hello word')
//         // readFile 的第二个参数 是可选的utf8 就是转换为我们能认识的字符
//         fs.readFile('./db.json','utf8',function(err,data){
//             if(err){
//                 return res.status(500).send('server error')
//             }
//             console.log(typeof data);
//             // 从文件里 读取的是字符串  所以在 JSON.parse(data)后是一个对象
//             var students=JSON.parse(data).students
//             res.render('index.html',{
//                 fruits:[
//                     '苹果',
//                     '香蕉',
//                     '橘子'
//                 ],
//                 students:students
//             })
//         })

//     })
//     app.get('/students/new',function(req,res){

//     })
// }

