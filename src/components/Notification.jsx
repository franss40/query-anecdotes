// eslint-disable-next-line react/prop-types
const Notification = ({ value }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!value) {
    return null
  }

  return (
    <div style={style}>
      {value}
    </div>
  )
}

export default Notification
