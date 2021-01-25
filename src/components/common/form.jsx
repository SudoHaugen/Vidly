/**@format */

import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Option_input from "./option_input";

class Form extends Component {
  /**
   * State keeps track for current input from user and generated error messages from Joi
   */
  state = {
    data: {},
    errors: {},
  };

  /**
   * Validate all input fields according to Joi Schema.
   * Returns detailed error object if validation fails
   */
  validate = () => {
    const options = { abortEarly: false }; //Set options for Joi validation
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  /**
   * @param name name of attribute being validated
   * @param value value of attribute being validated
   * Creates a new sub schema in order to validate a single form property
   * By using the name of the property being validated we can find its validation logic in the main schema
   */
  validateProperty = ({ name, value }) => {
    const property = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(property, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(); //Returns error object or null

    /**
     * Set error state and call server if no errors are found
     */
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSearchInput = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };

  renderButton(label, path) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSearchBar(name, label, focus = false, type = "text", options = [""]) {
    const { data } = this.state;

    return (
      <Input
        type={type}
        name={name}
        placeholder={name}
        defaultValue={data[name]}
        label={label}
        onChange={this.handleSearchInput}
        error={null}
        autoFocus={focus}
        options={options}
      />
    );
  }

  renderOptionInput(name, label, options, currentValue = "") {
    return (
      <Option_input
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        currentValue={currentValue}
      />
    );
  }
  renderInput(name, label, focus = false, type = "text", options = [""]) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        defaultValue={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        autoFocus={focus}
        options={options}
      />
    );
  }
}

export default Form;
