var program = require('commander')
module.exports = function(prompts, cb){
  
  var addends = [];
  (function input() {
    var inputPrompt = prompts.shift()
    if(!inputPrompt) {
      process.stdin.pause()
      return cb(addends)
    }
    
    program.prompt(inputPrompt, Number, function(number){
      addends.push(number)
      input()  
    })
       
  })()
}