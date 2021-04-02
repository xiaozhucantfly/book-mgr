import { defineComponent, ref, onMounted, } from 'vue';
import { user } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';


const columns = [
    
        {
            title: '账号',
            dataIndex: 'account',
        },
        {
            title: '创建日期',
            slots: {
                customRender: 'createdAt',
            },
        },
    
];

export default defineComponent({
    setup() {
        
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        
        const getUser = async () => {
            const res = await user.list(curPage.value, 10);

            result(res)
                .success(({ data: {list: refList, total: refTotal} }) => {
                    list.value = refList;
                    total.value = refTotal;
                })
        };

        onMounted(() => {
            getUser();
        });

        return {
            list,
            total,
            curPage,
            columns,
            formatTimestamp,
            
        };
    },
});