/**@format */

const Input = ({ name, label, value, onChange, autofocus, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        name={name}
        autoFocus={autofocus}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
