var colors = require('colors')
 ,  prompt = require('./console-prompt') 

prompt(['First number:  ', 'Second number: '], function(addends) {
	var sum = addends[0] + addends[1]
	console.log('%s = %s'.green, addends.join(' + '), sum)
})
