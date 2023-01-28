import React from 'react'
import PropTypes from 'prop-types'

const UsernameInput = ({ setUsername, updateUsername }) => {
  return (
    <>
      <input
        placeholder='change username...'
        onInput={(event) => setUsername(event.target.value)}
        className='basis-3/4 p-4 border-2 focus:ring-2 ring-black ring-inset bg-black text-white border-white pr-10 ml-6 rounded-l-full outline-none'
      />
      <button
        onClick={updateUsername}
        className='basis-1/4 text-xl bg-white -translate-x-8 rounded-full'
      >
        Update
      </button>
    </>
  )
}

UsernameInput.propTypes = {
  setUsername: PropTypes.func,
  updateUsername: PropTypes.func
}

export default UsernameInput
