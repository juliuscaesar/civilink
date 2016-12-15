exports.helloworld = function(req, res, next) {  
  res.status(200).json({
    message: "Hello world!"
  })
}

exports.helloworld2 = function(req, res, next) {  
  res.status(200).json({
    message: "Hello world! 222"
  })
}