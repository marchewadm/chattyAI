import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { useToast } from '@/components/ui/toast';
import { handleAxiosError } from '@/utils/utils';
import type { UserProfileData } from '@/types/user';
import type { PartialProfileAccountData, ProfilePasswordData } from '@/types/zodInferredTypes';
import type { Router } from 'vue-router';

// Set the prefix URL for the user routes, just to make the code look cleaner.
const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/user`;

const { toast } = useToast();

export async function getUserProfileService(router: Router) {
  const userStore = useUserStore();
  const { setUserProfileData } = userStore;
  const { accessToken } = storeToRefs(userStore);

  try {
    const url = `${prefixURL}/profile`;

    const response = await axios.get<UserProfileData>(url, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setUserProfileData(response.data);
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateUserProfileService(
  partialProfileAccountData: PartialProfileAccountData,
  router: Router
) {
  const userStore = useUserStore();
  const { updateUserProfileData } = userStore;
  const { accessToken } = storeToRefs(userStore);

  try {
    const url = `${prefixURL}/update-profile`;

    const response = await axios.patch<{ message: string; name?: string }>(
      url,
      partialProfileAccountData,
      {
        headers: { Authorization: `Bearer ${accessToken.value}` }
      }
    );

    toast({
      title: 'Success',
      description: response.data.message
    });

    if (response.data.name) updateUserProfileData(response.data);
  } catch (err) {
    handleAxiosError(err, router);
  }
}

export async function updateUserPasswordService(
  profilePasswordData: ProfilePasswordData,
  router: Router
) {
  const userStore = useUserStore();
  const { $reset } = userStore;
  const { accessToken } = storeToRefs(userStore);

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
    handleAxiosError(err, router);
  }
}
