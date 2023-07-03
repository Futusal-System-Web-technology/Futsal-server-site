const jwt = require('jsonwebtoken');
exports. generateToken = (userInfo) =>{
    const payLoad = {
        username:userInfo.username,
        role:userInfo.role
    }
    const secret ='a5d4d3be4de73d49e7099f60b69081e59e2c7e00933db5e29beb40d11166416e2b0541a44480fcba3edef82d3645e8fed82e57d4cbfa732f450d54199678958b'
    const token = jwt.sign(payLoad,secret,{
        expiresIn:'20'
    })
    return token;
}