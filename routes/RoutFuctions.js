const jwt       = require('jsonwebtoken')

exports.verifyToken = function(req, res, next) {
    console.log('verifyToken caller = ' + req.body.caller)
    //console.log('VerifyToken -> req.body.token = ' + req.body.token)
    if(req.body.token !== undefined) {
  
      let token = req.body.token 
      jwt.verify(token, process.env.SECRET_KEY, err => {
        if(err) {
          console.log('fail -> token not verified: ' + err)
          res.sendStatus(403);
        } else {
          console.log({success: 'token verified'});
          next(); // Next middleware
        }
      });    
      
    } else {
      console.log('fail -> token == undefined ')
      res.sendStatus(403);
    }
}
