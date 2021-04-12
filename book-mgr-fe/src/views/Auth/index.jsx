import { defineComponent, reactive} from 'vue';
// impotent组件包
import { UserOutlined, LockOutlined, MailOutlined   } from '@ant-design/icons-vue';
import { auth, resetPassword } from '@/service';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';
import { message, Modal, Input } from 'ant-design-vue';
import store from '@/store';
import { useRouter } from 'vue-router';
import { setToken } from '@/helpers/token';

export default defineComponent({
    //进行icon注册
    components: {
        UserOutlined,
        LockOutlined,
        MailOutlined
    },

    setup() {

        const router = useRouter();

        // 注册用表单数据
        // const account = ref('');
        const regForm = reactive({
            account: '',
            password: '',
            inviteCode: '',
        });
        // 忘记密码逻辑
        const forgetPassword = () => {
            Modal.confirm({
                title: `输入账号申请，管理员审核`,
                content: (
                    <div>
                        <Input class="__forget_password_account"/>
                    </div>
                ),
                onOk: async () => {
                    const el = document.querySelector('.__forget_password_account');
                    
                    let account = el.value;
                    
                    console.log(account);
                    const res = await resetPassword.add(account);
                    result(res)
                        .success(({ msg }) => {
                            message.success(msg);
                        });
                },
            });
        };

        // 注册逻辑
        const register = async () => {
            // 注册提示
            if (regForm.account === '') {
                message.info('请输入账户');
                return;
            };
            if (regForm.password === '') {
                message.info('请输入密码');
                return;
            };
            if (regForm.inviteCode === '') {
                message.info('请输入邀请码');
                return;
            };

            const res = await auth.register(
                regForm.account, 
                regForm.password,
                regForm.inviteCode);
            result(res)
                .success((data) =>{
                    message.success(data.msg);
                });
                
        };
        // 登陆用表单数据
        const loginForm = reactive({
            account: '',
            password: '',
        });
        // 登陆逻辑
        const login = async () => {
            // 登陆提示
            if (loginForm.account === '') {
                message.info('请输入账户');
                return;
            };
            if (loginForm.password === '') {
                message.info('请输入密码');
                return;
            };
            
            const res = await auth.login(loginForm.account, loginForm.password);
            result(res)
                .success(({msg, data: { user, token} }) =>{
                    message.success(msg);

                    store.commit('setUserInfo', user);
                                           
                    store.commit('setUserCharacter', getCharacterInfoById(user.character));
                    setToken(token);
                    
                    router.replace('/books');
                });
               
        };

        return {
           
            // 注册相关的数据
            regForm,
            register,
            // 登陆相关的数据
            loginForm,
            login,

            forgetPassword,
        };
    },
});