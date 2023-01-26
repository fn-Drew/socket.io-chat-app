import React from 'react'

const ConversationBox = (yourTexts) => {
  return (
    <>
      {yourTexts.yourTexts.map((text, i) => {
        return (
          <div key={i + 1} className={`flex ${text.sent ? 'text-black bg-white p-4 m-4 self-end border-2 border-black rounded-3xl' : 'text-white  bg-black p-4 m-4 self-start rounded-3xl'} `}>
            <div className='font-bold bg-white text-black self-start rounded-r-3xl p-4 -translate-x-6 -translate-y-6'> {text.fromUser} </div>
            <div className='p-4 -translate-x-6'>{text.message}</div>
          </div>
        )
      }
      )}
    </>
  )
}

export default ConversationBox
