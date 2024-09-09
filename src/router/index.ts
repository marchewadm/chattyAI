import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { getUserProfileService } from '@/services/userService';
import { getApiProvidersService } from '@/services/apiProviderService';
import { getChatRoomsService } from '@/services/chatRoomService';
import { getChatHistoryService } from '@/services/chatHistoryService';

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
      name: 'NewChat',
      component: () => import('@/views/NewChatView.vue'),
      beforeEnter: async () => {
        await getUserProfileService(router);
        await getChatRoomsService(router);
        await getApiProvidersService(router);
      }
    },
    {
      path: '/chat/:room_uuid',
      name: 'ActiveChat',
      component: () => import('@/views/ActiveChatView.vue'),
      beforeEnter: async (to) => {
        const roomUUID = to.params.room_uuid as string;

        await getUserProfileService(router);
        await getApiProvidersService(router);
        await getChatRoomsService(router);
        await getChatHistoryService(roomUUID, router);
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

  // If the user is authenticated and they try to access the Home route, redirect them to the NewChat route.
  if (accessToken.value && to.name === 'Home') {
    return { name: 'NewChat' };
  }
});

export default router;
