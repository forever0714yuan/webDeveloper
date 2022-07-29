<template>
    <div class="login">
        <van-nav-bar :title="isLogin ? '登录' : '注册'" left-text="返回" left-arrow>
            <template #right>
                <van-icon name="ellipsis" size="18" />
            </template>
        </van-nav-bar>
        <div class="logo">
            <img src="@/assets/images/login-logo1.webp">
        </div>
        <van-form @submit="onSubmit" class="login-form">
            <van-cell-group inset>
                <van-field required v-model="username" name="username" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field required v-model="password" type="password" name="password" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <div class="link" v-if="isLogin" @click.prevent="handleIsLogin">立即注册</div>
                <div class="link" v-else @click.prevent="handleIsLogin">已有登录账号</div>
                <van-button round block size="small" type="primary" native-type="submit">
                    {{ isLogin ? '登录' : '注册' }}
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import md5 from 'js-md5';
import { Toast } from 'vant'
import 'vant/es/toast/style';

import { reqLogin, reqRegistr } from '../../api/index'
import { setStore } from '@/utils/storage'


// 登录注册方法
const useLogin = (router) => {

    const isLogin = ref(true);
    const username = ref('15828320182');
    const password = ref('513822');

    const onSubmit = async (values) => {
        if (isLogin.value) {
            // 登录
            const res = await reqLogin('/user/login', {
                loginName: values.username,
                passwordMd5: md5(values.password)
            })

            const { data, resultCode } = res.data
            if (resultCode === 200) {
                setStore('token', data)
                Toast.success('登录成功！');
                router.push({ path: '/' })
            } else {
                Toast.fail('登录失败！');
            }
        } else {
            // 注册
            const res = await reqRegistr('/user/register', {
                loginName: values.username,
                password: values.password
            })
            const { resultCode, message } = res.data;
            if (resultCode === 200) {
                Toast.success('注册成功！');
            } else {
                Toast.fail(message)
            }
        }
    }

    const handleIsLogin = () => {
        isLogin.value = !isLogin.value
    }

    return {
        username,
        password,
        isLogin,
        onSubmit,
        handleIsLogin,
    }
}

export default {
    setup() {
        const router = useRouter();

        return {
            Toast,
            ...useLogin(router)
        }
    }
}
</script>

<style lang="less" >
:root {
    --van-primary-color: #c82a24;
}

.logo {
    width: 120px;
    height: 120px;
    margin: 40px auto 20px;

    img {
        width: 100%;
    }


}

.login-form {
    padding: 0 20px;
}

.link {
    font-size: 14px;
    margin: 20px 0;
    color: var(--van-primary-color);
    display: inline-block;
}
</style>