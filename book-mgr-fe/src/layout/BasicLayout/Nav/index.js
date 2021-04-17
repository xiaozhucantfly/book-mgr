import { ref, defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import menu from '@/config/menu';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    // 菜单栏展开的项
    const openKeys = ref([]);
    const selectedKeys = ref([]);

    onMounted(() => {
      selectedKeys.value = [route.path];
      // 菜单栏自动展开
      menu.forEach((item) => {
        (item.children || []).forEach((child) => {
          if (child.url === route.path) {
            openKeys.value.push(item.title);
          }
        });
      });
    });

    const to = (url) => {
      router.push(url);
    };

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
    };
  }
});