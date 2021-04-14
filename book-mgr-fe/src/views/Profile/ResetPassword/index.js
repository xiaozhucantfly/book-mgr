import { defineComponent, onMounted, reactive, ref } from 'vue';
import { profile } from '@/service'
import { result, formatTimestamp } from '@/helpers/utils';
import { message } from 'ant-design-vue';

export default defineComponent({
    setup() {
        const form = reactive({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        });

        

        const resetPassword = async () => {
            
            const {
                confirmNewPassword,
                newPassword,
                oldPassword,
            } = form;

            if (confirmNewPassword !== newPassword) {
                message.error('两次输入的密码不同');
                return;
            };
            
            const res = await profile.resetPassword(
                newPassword,
                oldPassword,

            );

            result(res)
            .success(({ msg }) => {
                message.success(msg);

                form.oldPassword = '';
                form.newPassword = '';
                form.confirmNewPassword = '';
            })
        };

        return {
           form,
           resetPassword,
        }
    },
});