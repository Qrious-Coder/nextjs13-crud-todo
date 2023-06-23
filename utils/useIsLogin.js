import { useState, useEffect } from  'react';
import { useSession} from "next-auth/react";

export const useIsLogin = () => {
  const { status, loading } = useSession();
  const [ isLogin, setIsLogin ] = useState(null)

  useEffect(() => {
    if(!loading && status ==='authenticated'){
      setIsLogin(true)
    }
    else if(!loading && status ==='unauthenticated'){
      setIsLogin(false)
    }
  }, [status, loading]);

  return isLogin;
}