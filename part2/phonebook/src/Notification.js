const Notification = ({message}) => {
  if (message.text) {
    return (
      <div className={message.type}>
        {message.text}
      </div>
    );
  } else {
    return null;
  }
}

export default Notification;
