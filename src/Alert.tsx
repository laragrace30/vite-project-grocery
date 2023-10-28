

const Alert = ({ type, msg }) => {
  return (
    <div className={`Toastify alert-${type}`}>
      {msg}
    </div>
  );
}

export default Alert;
