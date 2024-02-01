

export default  class AuthController{
    async signUp(req,res,){
         const {username , email ,password} = req.body;
         
         res.send({username , email ,password});
    }
}