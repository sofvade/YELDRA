
'use client'
import clsx from 'classnames'

export default function ChatBubble({ from, children }: { from: 'user'|'bot', children: React.ReactNode }) {
  return (
    <div className={clsx('flex', from === 'user' ? 'justify-end' : 'justify-start')}>
      <div className={clsx('max-w-[80%] px-4 py-2 rounded-2xl my-1 text-sm',
        from==='user' ? 'bg-sky-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm')}>
        {children}
      </div>
    </div>
  )
}
