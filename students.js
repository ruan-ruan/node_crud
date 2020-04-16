var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/feiyang01',{useMongoClient:true})
var Scchema=mongoose.Schema;
var commentSchema=new Scchema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:Number,
        enum:[0,1],
        default:0
    },
    age:{
        type:Number,
        required:true
    },
    hobbies:{
        type:String
    }
});
// mongoose.model('Comment',new Scchema({

// }))
//直接导出模型构造函数
module.exports=mongoose.model('Comment',commentSchema);



