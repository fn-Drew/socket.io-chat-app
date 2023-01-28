import React from 'react'

const ConversationBox = (totalMessages) => {
  return (
    <>
      {totalMessages.totalMessages.map((text, i) => {
        return (
          <div key={i + 1} className={`flex p-4 m-6 rounded-3xl ${text.sent ? 'text-black bg-white self-end border-2 border-black' : 'text-white bg-black self-start'} `}>
            <div className='font-bold bg-white text-black self-start rounded-r-3xl p-4 -translate-x-6 -translate-y-6'> {text.fromUser} </div>
            <div className='p-2 -translate-x-6'>{text.message}</div>
          </div>
        )
      }
      )}
    </>
  )
}

export default ConversationBox
