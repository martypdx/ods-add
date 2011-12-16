var colors = require('colors')
 ,	fileToTest = process.argv.length > 2 ? process.argv[2] : undefined
 
if(!fileToTest) {
    console.log('File to test must be specified!'.red)
		console.log('node test.js <fileToTest.js> [-p: pin outcome]')
    process.exit(1)
}

var fs = require('fs')
 ,  path = require('path')
 ,  buf = []
 ,  spawn = require('child_process').spawn
 ,  child = spawn('node', [ fileToTest ])
 ,	pin = process.argv.length > 3 && process.argv[3] === '-p'

child.stderr.on('data', function(data){
    buf.push(data)
    process.stderr.write(data)

})

var answers = ['1','2']
child.stdout.on('data', function(data){
    buf.push(data)
    process.stdout.write(data)
		
		var answer = answers.shift()
		if(answer) {
			writeLine(answer)
		}
})

function write(data) {
    process.stdout.write(data)
    buf.push(data)
    child.stdin.write(data) 
}
function writeLine(data) {
    write(data + '\n')
}

child.on('exit', function (code) {
  var actual = buf.join('')
	var file = path.basename(fileToTest, '.js') + '.outcome.txt'
	var fn = pin ? pinOutcome : testOutcome
	fn(file, actual)
})

function pinOutcome(file, actual) {
	fs.writeFileSync(file, actual)
	console.log('pinned'.yellow, fileToTest, 'outcome to'.yellow, file)
	console.log('saved outcome:'.yellow)
	process.stdout.write(actual)	
}

function testOutcome(file, actual) {
	var outcome = fs.readFileSync(file).toString()
	if(actual === outcome) {
		console.log('----------'.underline) 
		console.log('passed'.green)
	} else {
		console.log('\nfailed!\n'.red)
		console.log('Expected>>'.red + outcome + '<<'.red)
		console.log('Actual  >>'.red + actual + '<<'.red)
	}
	console.log('----------'.underline) 
}