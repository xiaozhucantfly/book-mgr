import { defineComponent,reactive } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import store from '@/store';

const defaultFormData = {
    account: '',
    password: '',
    character: '',
};

export default defineComponent({
    // 添加一条的开关的返回的值为props
    props: {
        show: Boolean,
    },
    setup(props, context) {
        //角色信息获取 
        const { characterInfo } = store.state;
       
        // 书籍添加表单
        const addForm = reactive(clone(defaultFormData));
        // 默认角色选择成员
        addForm.character = characterInfo[1]._id;
        const close = () =>{
            // emit用来触发自己setshow  
            context.emit('update:show', false);
        };
        
        const submit = async () => {
            // 把publishdate转为时间戳
            const form = clone(addForm)
            
            
            const res = await user.add(form.account, form.password, form.character);

            result(res)
                .success((d, { data }) =>{
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg);
                    close();
                    context.emit('getList');
                }); 
        };
        
       
        return {
            addForm,
            submit,
            props,
            close,
            characterInfo,
        };
    },
});