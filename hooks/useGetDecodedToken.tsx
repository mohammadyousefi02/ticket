import React, { useEffect } from 'react'
import useUserToken from './useUserToken'
import jwtDecode from "jwt-decode"
import { IdecodedToken } from '../interfaces/decodedTokenInterface'

function useGetDecodedToken() {
    const [token] = useUserToken()
    let userInfo:IdecodedToken = {_id:""}
      if(token){
        userInfo = jwtDecode(token)
      }
  return userInfo
}

export default useGetDecodedToken