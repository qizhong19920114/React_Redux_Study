var fs = require('fs')

var inputFile = './users.json'
var outputFile = './out.json'

var readable = fs.createReadStream(inputFile)
var writeable = fs.createWriteStream(outputFile)

//tie the read and write together by using the pipe
readable.pipe(writeable)