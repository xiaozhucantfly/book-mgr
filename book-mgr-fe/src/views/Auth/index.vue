<template>
    <div class="auth">
        <!-- 表头 -->
        <div class="title-info">
            <img src="" alt="">
            <div class="title">图书管理系统 后台</div>
        </div>
        <!-- 表单部分 -->
        <div class="form">
            <a-tabs >
            <a-tab-pane key="1" tab="登陆">
                <div class="item">
                    <a-input placeholder="账户"/>
                </div>
                <div class="item">
                        <a-input placeholder="密码"/>
                </div>
                <div class="item">
                        <a href="">忘记密码</a>
                </div>
                <div class="item">
                        <a-button type="primary">
                            登陆
                        </a-button>
                </div> 
               
            </a-tab-pane>
            <a-tab-pane key="2" tab="注册">
                assign
            </a-tab-pane>
        </a-tabs>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scpoed>
    @import './index.scss';
</style>
