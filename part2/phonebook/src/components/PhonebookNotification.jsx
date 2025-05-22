const Success = ({message}) => {
  const notificationStyle = {
    color: "green",
    background: "#FFFFF0",
    fontSize: "25px",
    borderStyle: "solid",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "20px"
  }
  if (message) return <div style={notificationStyle}>{message}</div>
}

const Failure = ({message}) => {
  const errorStyle = {
    color: "red",
    background: "#FFFFF0",
    fontSize: "25px",
    borderStyle: "solid",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "20px"
  }
  if (message) return <div style={errorStyle}>{message}</div>
}

export default {
  Success,
  Failure
}
