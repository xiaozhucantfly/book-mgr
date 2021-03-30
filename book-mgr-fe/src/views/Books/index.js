import { defineComponent } from 'vue';
import AddOne from './AddOne/index.vue';

export default defineComponent({
    components: {
        AddOne, 
    },

    setup() {

        const columns = [
            {

            }
        ];
        const dataSource = [];
        return {
            columns,
            dataSource,
        }
    },
});
