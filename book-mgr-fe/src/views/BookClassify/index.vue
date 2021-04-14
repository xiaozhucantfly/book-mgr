<template>
    <div>
        <a-card title="书籍分类管理">
            <div>
                <a-input v-model:value="title" placeholder="请输入书籍分类" style="width: 200px"/>
                &nbsp;
                <a-button type="primary" @click="add">添加</a-button>
            </div>
            <a-divider />
            <div>
                <a-table :pagination="false" bordered :columns="columns" :data-source="list">
                        <template #actions="{ record }" >
                            
                            <a-button size="small" @click="updateTitle(record)"  >修改</a-button>
                            &nbsp;
                            <a-button size="small" @click="remove(record)" type="danger" >删除</a-button>
                        </template>
                </a-table>

            </div>
            <!-- <flex-end style="margin-top: 24px">
                <a-pagination  v-model:current="curPage" :pageSize="20" :total="total" @change="setPage">

                </a-pagination>
            </flex-end> -->
        </a-card>
        
    </div>
</template>

<script src="./index.jsx"></script>