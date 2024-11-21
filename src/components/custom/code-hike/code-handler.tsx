"use client"

import {
    AnnotationHandler,
    InnerLine,
    InnerPre,
    getPreRef,
} from "codehike/code"
import { ListRestart } from "lucide-react"
import React, { useLayoutEffect, useRef } from "react"

const codeHandler: AnnotationHandler = {
    name: "code",
    onlyIfAnnotated: true,
    PreWithRef: (props) => {
        const ref = getPreRef(props)
        useScrollToFocus(ref)
        return <InnerPre merge={props} />
    },
    Block: ({ children }) => {
        return (
            <div className="flex flex-col">
                <div className="flex space-x-2 pl-8">
                    <span>函数 - 创建用户</span>
                    <div className="flex space-x-1 cursor-pointer [&>a]:no-underline [&>a]:text-slate-500">
                        <a className="flex items-center space-x-1">
                            <ListRestart className="size-5" />
                            <span>重新生成</span>
                        </a>
                    </div>
                </div>
                {children}
            </div>
        );
    },
    Line: (props) => (
        <InnerLine
            merge={props}
            className="opacity-50 data-[focus]:opacity-100 px-2"
        />
    ),
    AnnotatedLine: ({ annotation, ...props }) => (
        <InnerLine merge={props} data-focus={true} className="bg-zinc-700/30" />
    ),
}

function useScrollToFocus(ref: React.RefObject<HTMLPreElement>) {
    const firstRender = useRef(true)
    useLayoutEffect(() => {
        if (ref.current) {
            // find all descendants whith data-focus="true"
            const focusedElements = ref.current.querySelectorAll(
                "[data-focus=true]",
            ) as NodeListOf<HTMLElement>

            // find top and bottom of the focused elements
            const containerRect = ref.current.getBoundingClientRect()
            let top = Number.POSITIVE_INFINITY
            let bottom = Number.NEGATIVE_INFINITY
            focusedElements.forEach((el) => {
                const rect = el.getBoundingClientRect()
                top = Math.min(top, rect.top - containerRect.top)
                bottom = Math.max(bottom, rect.bottom - containerRect.top)
            })

            // scroll to the focused elements if any part of them is not visible
            if (bottom > containerRect.height || top < 0) {
                ref.current.scrollTo({
                    top: ref.current.scrollTop + top - 10,
                    behavior: firstRender.current ? "instant" : "smooth",
                })
            }
            firstRender.current = false
        }
    })
}

export {
    codeHandler
}
