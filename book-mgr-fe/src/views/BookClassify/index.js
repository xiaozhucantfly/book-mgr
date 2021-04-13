import { defineComponent, ref, onMounted, } from 'vue';
import { bookClassify } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import { message } from 'ant-design-vue'

const columns = [
    {
        title: '分类',
        dataIndex: 'title',
    },
    {
        title: '操作',
        slots: {
            customRender: 'actions',
        },
    },
];

export default defineComponent({
    setup() {
        const title = ref('');
        const curPage = ref(1);
        const list = ref([]);
        const total = ref(0);

        const getList = async () => {
            const res = await bookClassify.list(title.value);

            result(res).success(({ data }) => {
                list.value = data;
            });
        };

        onMounted(() => {
            getList();
        });

        

        const add = async () => {
            const res = await bookClassify.add(title.value);
            result(res)
                .success(() => {
                    
                    getList();
                    title.value = '';
                });
            
        };

        const remove = async ({ _id }) => {
            const res = await bookClassify.remove(_id);
            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getList();
                });
        };
        return {
            title,
            list,
            columns,
            add,
            remove,
        };
    },

});