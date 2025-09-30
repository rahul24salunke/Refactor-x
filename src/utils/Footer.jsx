import { Code2, Zap } from 'lucide-react'
import React from 'react'

const Footer = ({code}) => {
    return (
        <div className="mt-12 text-center space-y-2">
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Lines: {code?.split('\n')?.length}
                </span>
                <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Characters: {code?.length}
                </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Built with React, Monaco Editor, and modern web technologies
            </p>
        </div>
    )
}

export default Footer
