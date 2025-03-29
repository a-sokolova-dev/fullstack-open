const Notification = ({ message, type }) => {
    if (message === null) return null
  
    const style = {
      color: type === 'error' ? 'red' : 'green',
      background: '#eee',
      fontSize: 20,
      border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    }
  
    return <div style={style}>{message}</div>
}
  
export default Notification
  