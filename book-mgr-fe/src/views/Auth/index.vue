<template>
    <div class="auth">
        <!-- 背景 -->
        <div class="bg"></div>
        <!-- 表头 -->
        <div class="title-info">
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F10%2F59%2F5b487a5064630_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619506300&t=7d8f0ac500f05a412a5ee9156397e46f" alt="">
            <h2 class="title">图书管理系统 后台</h2>
        </div>
        <!-- 表单部分 -->
        <div class="form">
            <a-tabs >
                <!-- 登陆 -->
            <a-tab-pane key="1" tab="登陆">
                <div class="item">
                    <a-input size="large" placeholder="账户" v-model:value="loginForm.account">
                        <template #prefix><UserOutlined /></template>
                    </a-input>
                </div>
                <div class="item">
                    <a-input size="large" placeholder="密码" v-model:value="loginForm.password">
                        <template #prefix><LockOutlined /></template>
                    </a-input>
                </div>
                <div class="item">
                        <a href="">忘记密码</a>
                </div>
                <div class="item">
                        <a-button @click="login" size="large" type="primary">
                            登陆
                        </a-button>
                </div> 
               
            </a-tab-pane>
            <!-- 注册 -->
            <a-tab-pane key="2" tab="注册">
                <div class="item">
                    <a-input size="large" placeholder="账户" v-model:value="regForm.account">
                        <template #prefix><UserOutlined /></template>
                    </a-input>
                </div>
                <div class="item">
                    <a-input size="large" placeholder="密码" v-model:value="regForm.password">
                        <template #prefix><LockOutlined /></template>
                    </a-input>
                </div>
                <div class="item">
                    <a-input size="large" placeholder="邀请码">
                        <template #prefix><MailOutlined /></template>
                    </a-input>
                </div>
              
                <div class="item">
                        <a-button @click="register" size="large" type="primary">
                            注册
                        </a-button>
                </div> 
            </a-tab-pane>
        </a-tabs>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scpoed>
    @import './index.scss';
</style>
