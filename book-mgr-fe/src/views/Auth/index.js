import { defineComponent, reactive} from 'vue';
// impotent组件包
import { UserOutlined, LockOutlined, MailOutlined   } from '@ant-design/icons-vue';
import { auth } from '@/service';

export default defineComponent({
    //进行icon注册
    components: {
        UserOutlined,
        LockOutlined,
        MailOutlined
    },

    setup() {
        // const account = ref('');
        const regForm = reactive({
            account: '',
            password: '',
             
        });
        
        const register = () => {
            auth.register(regForm.account, regForm.password);
        };

        return {
            regForm,
            register,
        };
    },
});