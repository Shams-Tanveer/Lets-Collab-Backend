import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks
} from "../Actions/settings"
import { Grid } from "@mui/material";
import Video from "./Video";
import Controls from "./Controls";

export default function VideoCall({setInCall,code,dbToken,cName}) {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  const [token, settoken] = useState("");


  async function getTokenFromAgora() {
    fetch("http://localhost:5000/access_token?channelName="+cName, {
    })
        .then(res => res.json())
        .then((result) => {
            settoken(result.token);
            init(cName, result.token);
            saveToken(result.token,cName);
        })
}

async function saveToken(tokenId, name) {
    const tokenInfo = { tokenId, name };
    fetch("/videoChat/saveToken", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(tokenInfo),
        credentials: "include"
    }).then(() => {
    });
}

  let init = async (name,token) => {
     client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        setUsers((prevUsers) => {
          return [...prevUsers, user];
        });
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "audio") {
        if (user.audioTrack) user.audioTrack.stop();
      }
      if (mediaType === "video") {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      }
    });

    client.on("user-left", (user) => {
      setUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid);
      });
    });

    try {
      await client.join(config.appId, name, token, null);
    } catch (error) {
      console.log("error");
    }

    if (tracks) await client.publish([tracks[0], tracks[1]]);
    setStart(true);
  };

  useEffect(() => {
    if(code === "1")
    {
      if (ready && tracks) {
        try {
          init(cName,dbToken)
        } catch (error) {
          console.log(error);
        }
      }
    }else{
    if (ready && tracks) {
      try {
        getTokenFromAgora();
      } catch (error) {
        console.log(error);
      }
    }
  }
  }, [ client, ready, tracks]);

  return (
    <Grid container direction="column" style={{ height: "100%" ,width:"100%"}}>
      <Grid item>
      {start && tracks && <Video tracks={tracks} users={users} />}
      </Grid>
      <Grid item style={{width:"270px"}}>
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      </Grid>
    </Grid>
  );
}
