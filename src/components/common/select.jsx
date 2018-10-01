import React from "react";
const Select = ({
  name,
  options,
  optionPath,
  optionLabel,
  error,
  label,
  ...rest
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select className="form-control" id={name} name={name} {...rest}>
        <option value="" />
        {options.map(option => (
          <option key={option[optionPath]} value={option[optionPath]}>
            {option[optionLabel]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = { optionPath: "_id", optionLabel: "name" };

export default Select;
