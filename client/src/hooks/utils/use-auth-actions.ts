import {
  signup as signupApi,
  login as loginApi,
} from '@/services'
import { useToast } from './use-toast';
import { useAuthStore } from '@/stores/use-auth';
import { Api } from '@/interfaces';
import { useHandleRouter } from './use-handle-router';
import { siteConfig } from '@/configs/site';
import Cookies from 'js-cookie';
import { COOKIE_KEY } from '@/constants';

export function useAuthActions() {
  const { toastError, toastSuccess } = useToast()
  const { setUser } = useAuthStore()
  const { navigate } = useHandleRouter()

  const signUp = async (payload: Api.AuthApi.SignUpPayload) => {
    try {
      const res = await signupApi(payload)
      setUser(res.user)
      Cookies.set(COOKIE_KEY.ACCESS_TOKEN, res.access_token)
      toastSuccess("Signup successfully. Will be login soon!")
      navigate(siteConfig.paths.home())
    } catch (error: any) {
      toastError(error.message)
    }
  }

  const login = async (payload: Api.AuthApi.LoginPayload) => {
    try {
      const res = await loginApi(payload)
      setUser(res.user)
      Cookies.set(COOKIE_KEY.ACCESS_TOKEN, res.access_token)
      toastSuccess("Login successfully")
      navigate(siteConfig.paths.home())
    } catch (error: any) {
      toastError(error.message)
    }
  }


  return {
    signUp,
    login
  }
}
