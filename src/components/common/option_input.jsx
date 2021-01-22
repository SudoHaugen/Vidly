/**@format */

const Option_input = ({ name, label, options, onChange, currentValue }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        className="form-control"
        onChange={onChange}
      >
        {options.map((item) => {
          if (item.name === currentValue)
            return (
              <option value={item.name} selected key={item.name}>
                {item.name}
              </option>
            );
          else
            return (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            );
        })}
      </select>
    </div>
  );
};

export default Option_input;
