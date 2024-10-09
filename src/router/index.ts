import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { createRouter, createWebHistory } from 'vue-router';
import { getUserProfileService } from '@/services/userService';
import { getApiProvidersService } from '@/services/apiProviderService';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/AuthenticationView.vue')
    },
    {
      path: '/chat',
      name: 'ChatCreate',
      component: () => import('@/views/ChatCreate.vue'),
      beforeEnter: async () => {
        await getUserProfileService(router);
        await getApiProvidersService(router);
      }
    }
  ]
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const { isUserAuthenticated } = storeToRefs(userStore);

  if (!isUserAuthenticated.value && to.name !== 'Home') {
    return { name: 'Home' };
  } else if (isUserAuthenticated.value && to.name === 'Home') {
    return { name: 'ChatCreate' };
  }
});

export default router;
