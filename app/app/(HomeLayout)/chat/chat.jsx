'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useChat } from 'ai/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Chat({ user }) {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat'
    })

    return (
        <div className='w-full h-full p-5 flex flex-col gap-5'>
            <div className='flex-1 w-full mx-auto px-5 max-w-3xl  overflow-auto space-y-7'>
                {messages.map((m, index) => (
                    m.role === 'user' ? <div className="flex gap-4" key={index}>
                        <Avatar className="border border-input">
                            <AvatarImage src={user.image} />
                            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <p className="text-foreground/70 text-base">{m.content}</p>
                    </div>
                        : <div className="flex gap-4" key={index}>
                            <img src="/svg/logo.svg" className="h-10" />
                            <div className="w-full p-4 backdrop-blur-2xl rounded-lg border border-primary/70 space-y-2 text-foreground/70 overflow-auto">
                                <Markdown
                                    children={m.content}
                                    components={{
                                        code(props) {
                                            const { children, className, node, ...rest } = props
                                            const match = /language-(\w+)/.exec(className || '')
                                            return match ? (
                                                <SyntaxHighlighter
                                                    {...rest}
                                                    className="my-2"
                                                    PreTag="div"
                                                    children={String(children).replace(/\n$/, '')}
                                                    language={match[1]}
                                                    style={atomDark}
                                                />
                                            ) : (
                                                <code {...rest} className={className}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                />
                            </div>
                        </div>
                ))}
            </div>
            <div className='w-full mx-auto px-5 max-w-3xl'>
                <form className="flex gap-2" onSubmit={handleSubmit}>
                    <Input value={input} onChange={handleInputChange} className="bg-transparent backdrop-blur-md" placeholder="Ask anything " />
                    <Button type="submit">Send</Button>
                </form>
            </div>
        </div>
    )
}

/*
    <div>

    
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
*/