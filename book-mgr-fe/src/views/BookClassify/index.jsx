import { defineComponent, ref, onMounted, } from 'vue';
import { bookClassify } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import { message, Modal } from 'ant-design-vue'
import { itemProps } from 'ant-design-vue/lib/vc-menu';

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


        const updateTitle = async ({ _id }) => {
            Modal.confirm({
                title: '请输入新的分类名称',
                content: (
                    <div>
                        <Input class="__book_classify_new_title"/>
                    </div>
                ),
                onOk: async () => {
                    const title = document.querySelector('.__book_classify_new_title').value;
                    
                    const res = await bookClassify.updateTitle(_id, title);
                    result(res)
                        .success(({ msg }) => {
                            message.success(msg);
                            
                            list.value.forEach((item) => {
                                if (item._id === _id) {
                                item.title = title;
                            }
                        });
                        });
                },
            });
        };
        
        
        return {
            title,
            list,
            columns,
            add,
            remove,
            updateTitle
        };
    },

});