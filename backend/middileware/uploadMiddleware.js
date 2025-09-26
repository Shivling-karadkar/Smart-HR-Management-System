const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }
});


const fileFilter=(req,file,cb)=>{
    const ext=path.extname(file.originalname).toLowerCase();
    if(['.pdf','.doc','.docx'].includes(ext)) cb(null,true);
    else cb(new Error('only pdf/doc files are allowed'),false);

};

const upload=multer({storage,fileFilter});

module.exports=upload;