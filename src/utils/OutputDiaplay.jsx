import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const OutputDiaplay = ({props}) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                            <code className={className} {...props}>
                                {children}
                            </code>
                        </pre>
                    ) : (
                        <code className="bg-gray-200 rounded px-1" {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {props}
        </ReactMarkdown>
    )
}

export default OutputDiaplay
