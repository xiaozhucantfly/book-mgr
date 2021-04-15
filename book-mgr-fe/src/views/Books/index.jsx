import { defineComponent, ref, onMounted, } from 'vue';
import { book, bookClassify} from '@/service';
// 操作路由的方法router  不是route
import { useRouter } from 'vue-router';
import { message, Modal, Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import { getClassifyTitleById } from '@/helpers/book-classify'
// 模板引入
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';

// 模板注册
export default defineComponent({
    components: {
        AddOne, 
        Update,

    },

    props: {
        simple: Boolean,
    },

    setup(props) {
        const router = new useRouter();
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
                title: '库存',
                slots: {
                    customRender: 'count',
                },
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
                slots: {
                    customRender: 'classify',
                },
            },
        ];
        
        if (!props.simple) {
            columns.push({
                
                    title: '操作',
                    slots: {
                        customRender: 'actions',
                    },
                
            });
        }
        
        const show = ref(false);
        const showUpdateModal = ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const keyword = ref('');
        const isSearch = ref(false);
        const curEditBook = ref({});
        // const bookClassifyList = ref([]);
        // const classifyLoading = ref(true);

        // const getBookClassify = async () => {
        //     classifyLoading.value = true;
        //     const res = await bookClassify.list();
        //     classifyLoading.value = false;

        //     result(res)
        //         .success(({ data }) => {
        //             bookClassifyList.value = data;
        //         });
        // };

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
            // await getBookClassify();
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
            // 字符串非空的时候变true
            // 字符串为空的时候变false
            isSearch.value = Boolean(keyword.value);
        };
        // 回退到全部列表
        const backAll = () => {
            keyword.value = '';
            getList();
            // 切状态
            isSearch.value = false;
        };
        // 删除一条
        const remove = async ({ text: record }) => {
            const { _id } = record;

            const res = await book.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    // const idx = list.value.findIndex((item) => {
                    //     return item._id === _id;
                    // });
                    // list.value.splice(idx, 1);

                    getList();
                });
        };
        // 出入库操作
        const updateCount =  (type, record) => {
            let word = '增加';
            if (type === 'OUT_COUNT') {
                 word = '减少';
            }
            Modal.confirm({
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <Input class="__book_input_count"/>
                    </div>
                ),
                onOk: async () => {
                    const el = document.querySelector('.__book_input_count');
                    let num = el.value;
                    const res = await book.updateCount ({
                        id: record._id,
                        num,
                        type,
                    });
                    result(res)
                        .success((data) => {
                            
                            if (type === 'IN_COUNT') {
                                // 入库
                                 num = Math.abs(num);
                            } else {
                                // 出库
                                 num = -Math.abs(num);
                            }
                            const one = list.value.find((item) => {
                                return item._id === record._id;
                            });

                            if (one) {
                                one.count = one.count + num;

                                message.success(`成功${word} ${Math.abs(num)} 本书`);
                            }

                        });
                },
            });
        }; 
        // 显示更新弹框
        const update = ({ record }) => {
            showUpdateModal.value = true;
            curEditBook.value = record;
        };
        // 更新列表某行数据
        const updateCurBook = (newData) => {
            
            Object.assign(curEditBook.value, newData);
        };
        // 进入书籍详情页
        const toDetail = ({ record }) => {
            router.push(`/books/${record._id}`);

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
            backAll,
            isSearch,
            remove,
            updateCount,
            showUpdateModal,
            update,
            curEditBook,
            updateCurBook,
            toDetail,
            getList,
            getClassifyTitleById,
            simple: props.simple,
            // classifyLoading,
            // bookClassifyList
        }
    },
});
