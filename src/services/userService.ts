import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import type { UserProfileData } from '@/types/user';

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
