module.exports = function(prompts, cb){
  
  var addends = [];
  (function input() {
    var inputPrompt = prompts.shift()
    if(!inputPrompt) {
      process.stdin.pause()
      return cb(addends)
    }
    
    getNumber(inputPrompt, function(number){
      addends.push(number)
      input()  
    })
       
  })()
}

function getNumber(str, fn){
  getValue(str, function parseNumber(val){
    val = Number(val);
    if (isNaN(val)) return getValue(str + '(must be a number) ', parseNumber);
    fn(val);
  });
};

function getValue(str, cb){
  process.stdout.write(str);
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', function(val){
    cb(val.trim());
  }).resume()
};