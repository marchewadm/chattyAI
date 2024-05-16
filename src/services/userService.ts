import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { useToast } from '@/components/ui/toast';
import type { UserProfileData } from '@/types/user';
import type { PartialProfileAccountData, ProfilePasswordData } from '@/types/zodInferredTypes';
import type { Router } from 'vue-router';

// Set the prefix URL for the user routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/user`;

export async function getUserProfileService() {
  const userStore = useUserStore();
  const { setUserProfileData, $reset } = userStore;
  const { accessToken } = storeToRefs(userStore);

  try {
    const url = `${prefixURL}/profile`;

    const response = await axios.get<UserProfileData>(url, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setUserProfileData(response.data);
  } catch (err) {
    // If the access token is invalid, reset the user store and throw an error.
    $reset();
    throw err;
  }
}

export async function updateUserProfileService(
  partialProfileAccountData: PartialProfileAccountData
) {
  const userStore = useUserStore();
  const { $reset, updateUserProfileData } = userStore;
  const { accessToken } = storeToRefs(userStore);
  const { toast } = useToast();

  try {
    const url = `${prefixURL}/update-profile`;

    const response = await axios.patch<PartialProfileAccountData>(url, partialProfileAccountData, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    if (Object.keys(response.data).length === 0) {
      toast({
        title: 'Error',
        description: 'Your profile is up to date. No changes were made.',
        variant: 'destructive'
      });
    } else if (response.data.email) {
      toast({
        title: 'Success',
        description:
          "We've sent you a verification email. Please check your inbox. If you don't see it, check your spam folder or try updating your email later."
      });
      updateUserProfileData(response.data);
    } else if (!response.data.email && response.data.name) {
      toast({
        title: 'Success',
        description: 'Profile updated successfully.'
      });
      updateUserProfileData(response.data);
    }
  } catch (err) {
    // If the access token is invalid, reset the user store and throw an error.
    $reset();
    throw err;
  }
}

export async function updateUserPasswordService(
  profilePasswordData: ProfilePasswordData,
  router: Router
) {
  const userStore = useUserStore();
  const { $reset } = userStore;
  const { accessToken } = storeToRefs(userStore);
  const { toast } = useToast();

  try {
    const url = `${prefixURL}/update-password`;

    const response = await axios.patch<{ message: string }>(url, profilePasswordData, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    $reset();
    await router.push({ name: 'Home' });
    toast({
      title: 'Success',
      description: response.data.message
    });
  } catch (err) {
    console.log(err);
  }
}
