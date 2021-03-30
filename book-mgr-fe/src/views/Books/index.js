import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';

export default defineComponent({
    components: {
        AddOne, 
    },

    setup() {

        const columns = [
            {
                title: '书名',
                dataIndex: 'name',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
        
            {
                title: '出版日期',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate',
                },
            },
            {
                title: '分类',
                dataIndex: 'classify',
            },
           
        ];
      
        
        const show = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        // 书籍列表切页
        const getList = async () => {
            const res = await book.list({
                page: curPage.value,
                size: 10,
                keyword: keyword.value,
            });
            
            result(res)
                .success(({ data   }) => {
                    const { list: l, total: t } = data
                    list.value = l;
                    total.value = t;
                });
        };
        onMounted( async () => {
            getList();
        });
        //书籍表 切页面
        const setPage = (page) => {
            curPage.value = page;
            getList();
        };
        // 搜索功能
        const onSearch = () => {
            getList();
            // 搜索的时候 变为正在搜索
            isSearch.value = true;
        };
        // 回退
        const back = () => {
            keyword.value = '';
            getList();
            // 切状态
            isSearch.value = false;
        };
        
        return {
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            back,
            isSearch,
        }
    },
});
