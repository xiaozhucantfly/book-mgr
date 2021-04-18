<template>
    <div class="auth">
        <!-- 背景 -->
        <div class="bg"></div>
        <!-- 表头 -->
        <div class="title-info">
            <img src="./logo.png" alt="">
            <h2 class="title">图书管理系统</h2>
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
                        <a href="javascript:;" @click="forgetPassword" >忘记密码</a>
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
                    <a-input size="large" placeholder="邀请码" v-model:value="regForm.inviteCode">
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

<script src="./index.jsx"></script>

<style lang="scss" scpoed>
    @import './index.scss';
</style>
