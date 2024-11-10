import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function AuthingProvider() {

    const sdk = useMemo(() => {
        return new Authing({
            domain: 'https://ell.authing.cn',
            appId: '67304830a513b022f8aca838',
            redirectUri: 'https://ell-qgb.pages.dev',
            redirectToOriginalUri: true,
        });
    }, []);

    const [loginState, setLoginState] = useState<LoginState | null>();

    // 以跳转方式打开 Authing 托管的登录页

    const login = () => {
        sdk.loginWithRedirect();
    };

    // 获取用户的登录状态

    const getLoginState = useCallback(async () => {
        try {
            const state = await sdk.getLoginState();
            setLoginState(state);
        } catch (error) {
            console.log(error);
        }
    }, [sdk]);

    useEffect(() => {
        // 判断当前 URL 是否为 Authing 登录回调 URL
        if (sdk.isRedirectCallback()) {
            /**
             * 以跳转方式打开 Authing 托管的登录页，认证成功后需要配合 
             * handleRedirectCallback 方法，在回调端点处理 Authing 发送的
             * 授权码或 token，获取用户登录态
             */
            sdk.handleRedirectCallback().then((res) => setLoginState(res));
        } else {
            getLoginState();
        }
    }, [getLoginState, sdk]);

    return (
        <div className='flex items-center space-x-3 py-3 px-4 hover:shadow-lg cursor-pointer' onClick={login}>
            <img className='size-8 rounded-lg' alt='authing' src="https://files.authing.co/authing-console/default-userpool-logo.ico" />
            <div className='flex flex-col'>
                <span>Authing</span>
                <span className='text-xs text-muted-foreground'>全场景身份云</span>
            </div>
        </div>
    );
}