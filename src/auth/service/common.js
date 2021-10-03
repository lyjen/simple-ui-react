import { getUserData } from "../../utils/utils";

import { useCallback, useMemo, useState } from "react";
import request from "umi-request";

import { Config } from "../../app/global";
import { toast } from 'react-toastify';

export function userProfile(data, token){
    
   const headers = {
    token: token,
    userid: data.id,
    }
    
    request(
    `${Config.API}/user/profile`,
    { method: "GET", headers: headers },
    true
    )
    .then(response => {
        if (!response) return;
        console.log("Response: ", response);
        const data =  response.data;
        console.log("User Profile: ", data);
        return data;
      })
      .catch(() => {
          console.log("Something went wrong!");
      });
    

}
