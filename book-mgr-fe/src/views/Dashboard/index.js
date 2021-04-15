import { defineComponent, ref, onMounted, } from 'vue';
import { result, formatTimestamp } from '@/helpers/utils';
import Book from '@/views/Books/index.vue'
import Log from '@/views/Log/index.vue'
import { dashboard } from '@/service';


export default defineComponent({
    components: {
        Book,
        Log,
    },

    setup() {
        const loading = ref(true);
        const baseInfo = ref({
            total: {
                book: 0,
                user: 0,
                log: 0,
            },
        });

        const getBaseInfo = async () => {
            loading.value = true;
            const res = await dashboard.baseInfo();
            loading.value = false;

            result(res)
                .success(({ data }) => {
                    baseInfo.value = data;
                   
                });
        };
        console.log(baseInfo.value)
        onMounted(() => {
            getBaseInfo();
        });

        return {
            baseInfo,
            loading,
            
        }
    },
});