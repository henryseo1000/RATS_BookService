"use client";

import React, { useEffect, useState } from "react";
import st from "./Comments.module.scss"

interface CommentsProps {
    theme : string
}

export default function Comments ({theme} : CommentsProps) {

    useEffect(() => {
        const utterancesIframe = document.querySelector<HTMLIFrameElement>(
            "iframe.utterances-frame"
        );

        if (!utterancesIframe) return;

        utterancesIframe.contentWindow?.postMessage(
        {
            type: "set-theme",
            theme
        },
            "https://utteranc.es",
        );
    }, [])

    return (
        <div 
            className={st.comments}
            ref={(elem) => {
                if (!elem) {
                    return;
                }

                if (document.querySelectorAll('.utterances').length !== 0) {
                    return;
                }
                else {
                    const scriptElem = document.createElement('script');
                    scriptElem.src = 'https://utteranc.es/client.js';
                    scriptElem.async = true;
                    scriptElem.setAttribute('repo', 'henryseo1000/rats-book-service');
                    scriptElem.setAttribute("issue-term", "pathname");
                    scriptElem.setAttribute('theme', theme);
                    scriptElem.setAttribute('label', 'blog-comment');
                    scriptElem.crossOrigin = 'anonymous';
                    elem.appendChild(scriptElem);
                }
            }}
        >
        </div>
    )
}