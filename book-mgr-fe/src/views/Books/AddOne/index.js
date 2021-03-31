import { defineComponent,reactive } from 'vue';
import { book } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const defaultFormData = {
    name: '',
    price: 0,
    author: '',
    publishDate: 0,
    classify: '',
    count: '',
};

export default defineComponent({
    // 添加一条的开关的返回的值为props
    props: {
        show: Boolean,
    },
    setup(props, context) {
       
        // 书籍添加表单
        const addForm = reactive(clone(defaultFormData));

        const submit = async () => {
            // 把publishdate转为时间戳
            const form = clone(addForm)
            form.publishDate = addForm.publishDate.valueOf()
            
            const res = await book.add(form);

            result(res)
                .success((d, { data }) =>{
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg);
                }); 
        };
        
        const close = () =>{
            // emit用来触发自己setshow  
            context.emit('update:show', false);
        };
        
        return {
            addForm,
            submit,
            props,
            close,
        };
    },
});