const PinScrollBottom = (messagesEndRef) => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
}

export default PinScrollBottom
