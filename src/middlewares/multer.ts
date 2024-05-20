import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try{
            if(!existsSync('./uploads')){
                mkdirSync("./uploads");
            }
            cb(null, "./uploads")
        }catch(e){
            console.log(e)
        }
    },
    filename: (req, file, cb) => {
       try{
           cb(null, Date.now() + "_" + file.originalname)
       }catch(e){
        console.log(e);
       }
    }
})

export default storage;