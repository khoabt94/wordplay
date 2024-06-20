import {
  signup as signupApi,
} from '@/services'
import { useToast } from './use-toast';
import { useHandleRouter } from './use-handle-router';
import { useAuthStore } from '@/stores/use-auth';
import { Api } from '@/interfaces';

export function useAuthActions() {
  const { toastError, toastSuccess } = useToast()
  const { setUser } = useAuthStore()


  const signUp = async (payload: Api.AuthApi.SignUpPayload) => {
    try {
      const res = await signupApi(payload)
      setUser(res.user)
      toastSuccess("Signup successfully. Will be login soon!")
    } catch (error: any) {
      toastError(error.message)
    }
  }


  return {
    signUp
  }
}
