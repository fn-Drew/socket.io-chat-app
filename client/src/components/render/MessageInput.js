import React from 'react'

const MessageInput = (setSentText, sendMessage) => {
  return (
    <>
      <input
        placeholder='message...'
        onInput={(event) => setSentText(event.target.value)}
        className='basis-3/4 p-4 border-2 focus:ring-2 ring-black ring-inset pr-10 ml-6 border-black rounded-l-full outline-none'
      />
      <button
        onClick={sendMessage}
        className='basis-1/4 text-xl bg-black px-4 -translate-x-8 text-white rounded-full'
      >
        Send
      </button>
    </>
  )
}

export default MessageInput
