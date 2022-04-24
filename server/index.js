const express = require('express');
const {RtcTokenBuilder,RtcRole} =  require('agora-access-token');
const PORT = 5000;
const APP_ID = "97102b91a0bc4d589e34aba1e8f495ad";
const APP_CERTIFICATE = "7ec95af2cc94431fa5bb1388af787ecf";

const app = express();

const nocache =  (req,resp,next)=>{
    resp.header('Cache-Control','private,no-cache,no-store,must-revalidate');
    resp.header('Expires','-1');
    resp.header('Pragma','no-cache');
    next();
}

const generateAccessToken = (req,resp)=>{
        resp.header("Access-Control-Allow-Origin","*");
        const channelName = req.query.channelName;
        if(!channelName){
            return resp.status(500).json({'error': 'channel is required'});
        }


        let uid =  req.query.uid;

        if(!uid || uid=='')
        {
            uid = 0;
        }

        let role = RtcRole.SUBSCRIBER;

        if(req.query.role === 'publisher'){
            role = RtcRole.PUBLISHER;
        }

        let expireTime = req.query.expireTime;

        if(!expireTime ||  expireTime == '')
        {
            expireTime = 7200;
        }
        else
        {
            expireTime = parseInt(expireTime,10);
        }

        const currentTime = Math.floor(Date.now()/1000);
        const privilegdeExpireTime = currentTime + expireTime;


        const token = RtcTokenBuilder.buildTokenWithUid(APP_ID,APP_CERTIFICATE,channelName,uid,role,privilegdeExpireTime);

        return resp.json({'token':token});
}


app.get('/access_token',nocache,generateAccessToken);

app.listen(PORT,()=>{
    console.log(`Listenning on port: ${PORT}`);
});