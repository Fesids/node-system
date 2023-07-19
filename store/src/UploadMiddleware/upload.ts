import util from 'util';
import multer from 'multer';


const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({

    destination: (req, file, cb) =>{
        cb(null, __dirname+"/upload");
    },
    filename: (req, file, cb) =>{
        console.log(file.originalname);
        cb(null, file.originalname)
    }
});

export const uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize}
})

