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
import { COOKIE_KEY, ClientToServerEventsKeys } from '@/constants';
import { useSocketStore } from '@/stores';

export function useAuthActions() {
  const { toastError, toastSuccess } = useToast()
  const { setUser, clearUser } = useAuthStore()
  const { navigate } = useHandleRouter()
  const { socket } = useSocketStore()

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
      if (socket) {
        socket.connect();
        socket.emit(ClientToServerEventsKeys.authenticate, { access_token: res.access_token })
      }
    } catch (error: any) {
      toastError(error.message)
    }
  }

  const logout = async () => {
    try {
      clearUser()
      Cookies.remove(COOKIE_KEY.ACCESS_TOKEN)
      toastSuccess("Logout successfully")
      navigate(siteConfig.paths.login())

      if (socket && socket.connected) {
        socket.disconnect();
      }
    } catch (error: any) {
      toastError(error.message)
    }
  }


  return {
    signUp,
    login,
    logout
  }
}
