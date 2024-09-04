import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { getUserProfileService } from '@/services/userService';
import { getApiProvidersService } from '@/services/apiProviderService';
import { getChatRoomsService } from '@/services/chatRoomService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => import('@/views/ChatView.vue'),
      beforeEnter: async () => {
        await getUserProfileService(router);
        await getChatRoomsService(router);
        await getApiProvidersService(router);
      }
    }
  ]
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const { accessToken } = storeToRefs(userStore);

  // If the user is not authenticated and they try to access a route that is not the Home route, redirect them to the Home route.
  if (!accessToken.value && to.name !== 'Home') {
    return { name: 'Home' };
  }

  // If the user is authenticated and they try to access the Home route, redirect them to the Chat route.
  if (accessToken.value && to.name === 'Home') {
    return { name: 'Chat' };
  }
});

export default router;
