/*--- Require ---*/
var http = require('http'); //webserver module
var url = require('url');   //local url
var fs = require('fs');     //file manager
var path = require('path'); //local path of the program
/*---/ Require ---*/

/*--- Constant for all kinds of endings ---*/
const mimetypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpg'
};
/*---/ Constant for all kinds of endings ---*/

/*--- Server Address ---*/
var portname = '127.0.0.1';
var port = '1337';
/*---/ Server Address ---*/

http.createServer((req, res) => {
    var myuri = url.parse(req.url).pathname;        //gets the  name + ending of the requested url (example: /index.html (name = /index; ending = .html))
    var pattern = /\/[R,r][E,e][A,a][D,d][M,m][E,e].[M,m][D,d]/;
    var pattern2 = /\/[P,p][A,a][C,c][K,k][A,a][G,g][E,e].[J,j][S,s][O,o][N,n]/;

    if (myuri.match(myuri.match(pattern)) || myuri.match(myuri.match(pattern2))) {
        /*--- Error page (file not found) ---*/
        res.writeHead(404, {
            "Content-Type": 'text/plain'
        });
        res.write('404 File not found');
        res.end();
        /*---/ Error page (file not found) ---*/
    } else {
        var filename = path.join(process.cwd(), unescape(myuri));   /*  Generates the full path of the requested url out of the program path and the previous name + ending 
     *                                                              (process.cwd() = program path; unescape(myuri) = name + ending) */
        console.log('File you are looking for is:' + filename);
        var loadFile;

        try {
            loadFile = fs.lstatSync(filename);  //try to load the requested file
        } catch (error) {
            /*--- Error page (file not found) ---*/
            res.writeHead(404, {
                "Content-Type": 'text/plain'
            });
            res.write('404 File not found');
            res.end();
            /*---/ Error page (file not found) ---*/
            return;
        }

        if (loadFile.isFile()) {
            var mimeType = mimetypes[path.extname(filename).split('.').reverse()[0]];   /*  gets the ending (example: '.css') and split it at '.' to get 2 strings (example: [ '', 'css' ]) --> 
         *                                                                              then delete the first index (0) of the split-array (example: css) --> 
         *                                                                              then search in the mimetypes for the ending (example: 'css' = 'text/css') */
            res.writeHead(200, {
                "Content-Type": mimeType
            });
            var filestream = fs.createReadStream(filename);
            filestream.pipe(res);       //opens the requested page
            /*--- If it is a directory (folder) then open the main page (index.html) ---*/
        } else if (loadFile.isDirectory()) {
            res.writeHead(302, {
                'Location': 'index.html'
            });
            res.end();
            /*---/ If it is a directory (folder) then open the main page (index.html) ---*/
        } else {
            res.writeHead(500, {
                "Content-Type": 'text/plain'
            });
            res.write('500 Internal Error');    //Other error
            res.end();
        }
    }
    }).listen(port, portname, () => {
        console.log(`Server is running on server http://${portname}:${port}`);
});