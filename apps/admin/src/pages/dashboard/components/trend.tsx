import { Button } from "@/components/ui/button";
import { getAssetsUrl } from "@/lib/url";
import Avatar from 'react-nice-avatar';
import NumberFlow from '@number-flow/react';
import { Flame, Heart } from "lucide-react";

function TrenCard({ username, email, image, name, volume, price }: { username: string, email: string, image: string, name: string, volume: number, price: number }) {

    return (
        <div className="flex flex-col flex-1 rounded-lg border bg-secondary">
            <div className="relative h-[200px]">
                <img className="h-full w-full rounded-t-lg" alt="nft-image" src={image} />
                <div className="absolute right-2 top-2 flex items-center space-x-1 p-1 rounded-lg bg-zinc-500 bg-opacity-50 text-white text-xs">
                    <Heart className="size-4 text-rose-500 fill-rose-500" />
                    <NumberFlow value={volume} format={{ notation: 'compact' }} locales={['en-us']} />
                </div>
            </div>
            <div className="flex flex-col flex-1 px-4 py-2 pb-4">
                <div className="flex items-center">
                    <Avatar className="size-10" shape="rounded" />
                    <div className="ml-2">
                        <p className="text-sm font-medium leading-none">{username}</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                </div>
                <div className="py-2 font-medium">{name}</div>
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-muted-foreground">最新价格</p>
                    <p className="text-lg font-bold">$<NumberFlow value={price} /></p>
                </div>
                <Button className="bg-violet-200 text-primary hover:bg-primary hover:text-primary-foreground">查看详情</Button>
            </div>
        </div>
    );
}

export function Trend() {

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TrenCard
                username="Olivia Martin"
                email="olivia.martin@elljs.com"
                name="Color Abstract"
                volume={5981445463}
                price={1999}
                image={getAssetsUrl('images/nft-1.png')} />
            <TrenCard
                username="Jackson Lee"
                email="jackson.lee@elljs.com"
                name="Fluid Abstract"
                volume={16245}
                price={2459.2}
                image={getAssetsUrl('images/nft-2.png')}
            />
            <TrenCard
                username="Tom Cook"
                email="tom.cook@elljs.com"
                name="Space Fluid"
                volume={245946223}
                price={1136}
                image={getAssetsUrl('images/nft-3.png')}
            />
            <TrenCard
                username="kathryn Murphy"
                email="kathryn.murphy@elljs.com"
                name="Fluid Abstract"
                volume={44546}
                price={5981.64}
                image={getAssetsUrl('images/nft-4.png')}
            />
        </div>
    );
}
