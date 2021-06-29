
import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const componentBody = (
    <div style={style}>
      {notification.message}
    </div>
  );

  return notification.message ? componentBody : null;
};

const mapStateToProps = (state) => {
  return { notification: state.notification };
};

export default connect(mapStateToProps)(Notification);
