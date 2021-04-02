<template>
    <div>
        <a-card>
            <h2>用户管理</h2>
            <a-divider></a-divider>
            <a-button>添加用户</a-button>
            <a-divider></a-divider>
            <div>
                <a-table bordered :pagination="false" :columns="columns" :data-source="list">
                    <template #createdAt="{record}">
                        {{ formatTimestamp(record.meta.createdAt) }}  
                    </template>
                </a-table>
            </div>
            <flex-end style="margin-top: 24px" >
                <a-pagination></a-pagination>
            </flex-end>
        </a-card>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
    @import './index.scss';
</style>