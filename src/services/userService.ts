import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import type { UserProfileData } from '@/types/user';

const prefixURL = `${import.meta.env.VITE_BACKEND_URL}/user`;

export async function getUserProfileService() {
  try {
    const url = `${prefixURL}/profile`;
    const userStore = useUserStore();
    const { setUserProfileData } = userStore;
    const { accessToken } = storeToRefs(userStore);

    const response = await axios.get<UserProfileData>(url, {
      headers: { Authorization: `Bearer ${accessToken.value}` }
    });

    setUserProfileData(response.data);
  } catch (err) {
    console.log(err);
  }
}
