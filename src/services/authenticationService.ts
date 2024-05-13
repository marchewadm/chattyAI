import axios from 'axios';
import { useToast } from '@/components/ui/toast';
import type { RegisterData, LoginData } from '@/types/zodInferredTypes';
import type { Router } from 'vue-router';

const { toast } = useToast();

// Set the prefix URL for the authentication routes, just to make the code look cleaner
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/authentication`;

export async function createUser(userData: RegisterData) {
  try {
    const url = `${prefixURL}/register`;

    const response = await axios.post(url, userData);

    if (response?.status === 200) {
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

export async function loginUser(userData: LoginData, router: Router) {
  try {
    const url = `${prefixURL}/token`;

    // Create a new FormData object due to the way the backend expects that data (OAuth2PasswordRequestForm in FastAPI)
    const formData = new FormData();
    formData.append('username', userData.email);
    formData.append('password', userData.password);

    const response = await axios.post(url, formData);

    if (response?.status === 200) {
      router.push({ name: 'Chat' });
    }
  } catch (err) {
    console.log(err);
    toast({
      title: 'Error',
      description: 'Your email or password is incorrect. Please try again.',
      variant: 'destructive'
    });
  }
}
