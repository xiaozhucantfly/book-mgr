<template>
    <div>
        <a-spin :spinning="loading">
            <a-card>
                <h2>操作日志</h2>
                <a-divider />
                <div>
                    <a-table bodered :columns="columns" :data-source="list" :pagination="false">
                        <template #createdAt="{ record }">
                            {{ formatTimestamp(record.meta.createdAt) }}
                        </template>
                        
                        <!-- 删除操作 -->
                        <template #actions="{ record }">
                            <a href="javascript:;" @click="remove(record)">删除</a>
                        </template>
                    </a-table>
                </div>
                <flex-end style="margin-top: 24px">
                    <a-pagination v-model:current="curPage" :pageSize="20" :total="total" @change="setPage"/>
                </flex-end>
            </a-card>
        </a-spin>
    </div>
</template>

<script src="./index.js"></script>