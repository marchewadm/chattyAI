import axios from 'axios';
import { useToast } from '@/components/ui/toast';
import { useUserStore } from '@/stores/userStore';
import type { RegisterData, LoginData } from '@/types/zodInferredTypes';
import type { Router } from 'vue-router';

// Set the prefix URL for the authentication routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/authentication`;
const { toast } = useToast();

export async function createUserService(registerData: RegisterData) {
  try {
    const url = `${prefixURL}/register`;

    const response = await axios.post(url, registerData);

    if (response?.status === 200) {
      // If the response is OK, notify the user that they have successfully registered and now they need to verify their email to get full access.
      // The backend will send a verification email or if the email is already taken, the user with that email will be notified that someone tried to register with their email.
      toast({
        title: 'Success',
        description: response.data.message
      });
    }
  } catch (err) {
    toast({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      variant: 'destructive'
    });
  }
}

export async function loginUserService(loginData: LoginData, router: Router) {
  try {
    const url = `${prefixURL}/token`;

    // Create a new FormData object due to the way the backend expects that data (OAuth2PasswordRequestForm in FastAPI).
    const formData = new FormData();
    formData.append('username', loginData.email);
    formData.append('password', loginData.password);

    // Call the API to get the access token.
    const response = await axios.post<{ access_token: string }>(url, formData);

    if (response?.status === 200) {
      // If the response is OK, set the received token in the user store.
      const { setAccessToken } = useUserStore();
      setAccessToken(response.data.access_token);

      // Redirect the user to the chat view.
      await router.push({ name: 'Chat' });

      // Notify the user that they have successfully logged in.
      toast({
        title: 'Success',
        description: 'You have successfully logged in.'
      });
    }
  } catch (err) {
    toast({
      title: 'Error',
      description: 'Your email or password is incorrect. Please try again.',
      variant: 'destructive'
    });
  }
}
