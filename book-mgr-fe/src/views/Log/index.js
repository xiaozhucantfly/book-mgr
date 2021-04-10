import { defineComponent, onMounted, ref } from 'vue';
import { log } from '@/service';
// import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const columns = [
    {
        title: '用户名',
        dataIndex: 'user.account',
    },
    {
        title: '访问地址',
        dataIndex: 'request.url',
    },
    // {
    //     title: '库存',
    //     slots: {
    //         customRender: 'count',
    //     },
    // },
];

export default defineComponent({
    setup() {

        const curPage = ref(1);
        const total = ref(0);
        const list = ref([]);
        const getList = async () =>{
            const res = log.list(curPage.value, 20);

            result(res)
                .success(({ data: { list: l,total: t} }) => {
                    list.value = l;
                    total.value = t;
                });
        };
        onMounted(() => {
            getList();
        });


        return {
            curPage,
            total,
            list,
            columns,
        }
    },
});