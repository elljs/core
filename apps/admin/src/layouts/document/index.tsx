import { MDXProvider } from '@mdx-js/react';
import { ClassAttributes, HTMLAttributes, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import "./index.css";

/** @type {MDXComponents} */
const components = {
    em(properties: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
        return <i {...properties} />
    }
}

function observeAnchor() {
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            const { id } = entry.target;
            const tocLinkEl = document.querySelector(`.toc a[href='#${id}']`);
            if (!tocLinkEl) return;
            if (entry.isIntersecting) {
                document.querySelectorAll(".toc a").forEach((e) => e.classList.remove("active"));
                tocLinkEl.classList.add("active");
            }
        }
    }, {
        threshold: 1,
        rootMargin: "0px 0px -66%"
    });
    const elToObserve = document.querySelectorAll("article :is(h1,h2,h3)")
    elToObserve.forEach(el => observer.observe(el))
    return observer;
}

export default function DocumentLayout() {
    const documentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            observeAnchor();
        }, 300);
    }, [documentRef.current]);

    return (
        <article ref={documentRef} id="document" className='prose p-4 min-w-full'>
            <div className='p-8 bg-card shadow rounded-lg overflow-y-auto'>
                <MDXProvider components={components}>
                    <Outlet />
                </MDXProvider>
            </div>
        </article>
    );
}