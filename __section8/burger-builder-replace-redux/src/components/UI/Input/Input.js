import React from 'react';
import classes from './Input.module.css';



const Input = (props) => {
  let inputElement = null;
  const imputClasses = [classes.InputElement];

  if (props.invalid && props.shuldValidate && props.touched) {
    imputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={imputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={imputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (
        <select
          className={imputClasses.join(' ')}
          value={props.value}
          onChange={props.changed} >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))

          }
        </select>
      );
      break;
    default:
      inputElement = <input
        className={imputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label} </label>
      {inputElement}
    </div>
  )
}

export default Input
