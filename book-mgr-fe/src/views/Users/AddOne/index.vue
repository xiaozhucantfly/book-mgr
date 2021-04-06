<template>
    <div>
        <a-modal
            title="添加用户"
            :visible="props.show"
            @ok="submit"
            @cancel="close"
            >
            <!-- 弹框正文 -->
            <a-form :label-col="{ span: 6 }" >
    
                <a-form-item label="账户">
                    <a-input v-model:value="addForm.account" />
                </a-form-item>
                <a-form-item label="密码">
                    <a-input v-model:value="addForm.password" />
                </a-form-item>
                <a-form-item label="角色">
                    <a-select
                        v-model:value="addForm.character"
                    >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                        <a-select-option value="disabled" disabled>Disabled</a-select-option>
                        <a-select-option value="Yiminghe">yiminghe</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script src="./index.js"></script>
