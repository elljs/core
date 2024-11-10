import { Page } from '@/components/custom/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Authing } from '@authing/browser';
import type { LoginState } from '@authing/browser/dist/types/global';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function AuthAuthing() {

    const sdk = useMemo(() => {
        return new Authing({
            domain: 'https://ell.authing.cn',
            appId: '67304830a513b022f8aca838',
            redirectUri: 'https://console.authing.cn/console/get-started/67304830a513b022f8aca838',
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
        <Page header="第三方登录">
            <Card className="mx-auto mt-20 max-w-sm">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <img className='size-10 rounded-md' alt='authing' src="https://files.authing.co/authing-console/default-userpool-logo.ico" />
                        <span>Authing</span>
                    </CardTitle>
                    <CardDescription>
                        点击跳转到第三方登录页面
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button type="submit" className="w-full" onClick={login}>
                        登录
                    </Button>
                </CardContent>
            </Card>
        </Page>
    );
}