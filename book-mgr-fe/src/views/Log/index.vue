<template>
    <div>
        <a-card>
            <h2>操作日志</h2>
            <a-divider />
            <div>
                <a-table bodered :columns="columns" :data-source="list" >

                </a-table>
            </div>
            <flex-end style="margin-top: 24px">
                <a-pagination />
            </flex-end>
        </a-card>
    </div>
</template>

<script src="./index.js"></script>