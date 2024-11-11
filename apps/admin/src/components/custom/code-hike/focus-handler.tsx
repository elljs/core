"use client"

import {
    AnnotationHandler,
    InnerPre,
    getPreRef,
    InnerLine,
} from "codehike/code"
import React, { useLayoutEffect, useRef } from "react"

const focusHandler: AnnotationHandler = {
    name: "focus",
    onlyIfAnnotated: true,
    PreWithRef: (props) => {
        const ref = getPreRef(props)
        useScrollToFocus(ref)
        return <InnerPre merge={props} />
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
    focusHandler
}