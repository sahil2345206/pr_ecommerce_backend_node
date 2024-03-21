
// const Promise = require('promise');
// const multer = require('multer');
// const baseFolder = process.cwd();
// const fs = require('fs');
// let uploadPath = baseFolder + '/uploads';
// let fileType = {
//     'text/xlsx': '.xlsx',
//     'text/csv': '.csv'
// }

// module.exports = function () {
//     async function uploadFolder(req, res, uploadfolder) {
//         return new Promise(
//             function (resolve, reject) {
//                 let filePath = req.file.path;
//                 let uploadFolderPath = uploadPath + '/' + uploadfolder;

//                 if (!fs.existsSync(uploadFolderPath)) {
//                     fs.mkdirSync(uploadFolderPath);
//                 }

//                 if (fileType[req.file.mimetype] !== undefined) {

//                     const fileName = req.file.filename;
//                     const target = uploadFolderPath + '/' + fileName;

//                     const srcFile = fs.createReadStream(filePath);
//                     const createfile = fs.createWriteStream(target);
//                     unlinkFile(filePath);
//                     srcFile.pipe(createfile);
//                     srcFile.on('end', () => {
//                         resolve({
//                             status: 200,
//                             response: "file uploaded successfuly",
//                             name: fileName,
//                         })
//                     })
//                     srcFile.on('error', (err) => {
//                         reject({
//                             status: 400,
//                             response: "something went wrong",
//                         })
//                     })
//                 } else {
//                     reject({
//                         status: 500,
//                         response: "Server internal error",
//                     })
//                 }
//             }
//         )
//     }



//     //// unlinking file
//     async function unlinkFile(url) {
//         return new Promise(function (resolve, reject) {
//             fs.unlink(url, (err) => {
//                 if (err) {
//                     reject({
//                         status: 400,
//                         response: "file not deleted",
//                     })
//                 } else {
//                     resolve({
//                         status: 200,
//                         response: "file deleted",
//                     })
//                 }
//             })
//         })
//     }
//     return {
//         uploadFolder: uploadFolder,
//         unlinkFile: unlinkFile
//     }
// }