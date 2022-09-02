import * as React from 'react';
import { loginRequest } from "../AuthConfig";
import { useMsal } from "@azure/msal-react";

export default function SignIn() {
    const { instance } = useMsal();

    function handleLogin() {
       instance.loginRedirect(loginRequest).catch(e => {
          console.error(e);
         })
        .then(payload =>{
          console.log(payload);
         });
        return (event: React.MouseEvent) => { }
    } 
     return (
       <div> 
         <a onClick={handleLogin()} ></a>
       </div>
     );
   }