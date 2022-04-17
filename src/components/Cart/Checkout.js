import classes from "./Checkout.module.css";

import { useRef, useState } from "react";

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const [formValidity, setformValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const isNotFiveChars = (value) => value.trim().length !== 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredNameIsValid = !isEmpty(nameInputRef.current.value);
    const enteredStreetIsValid = !isEmpty(streetInputRef.current.value);
    const enteredCityIsValid = !isEmpty(cityInputRef.current.value);
    const enteredPostalCodeIsValid =
      !isEmpty(postalInputRef.current.value) &&
      isNotFiveChars(postalInputRef.current.value);

    setformValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

    if (formIsValid) {
      props.onConfirm({
        name: nameInputRef.current.value,
        street: streetInputRef.current.value,
        postal: postalInputRef.current.value,
        city: cityInputRef.current.value,
      });
    }
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.form}>
        <div
          className={`${classes.control} ${
            formValidity.name ? "" : classes.invalid
          }}`}
        >
          <label
            className={`${classes.control} ${
              formValidity.name ? "" : classes.invalid
            }}`}
            htmlFor="name"
          >
            Your Name
          </label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formValidity.name && <p>Please enter valid Name</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.street ? "" : classes.invalid
          }}`}
        >
          <label
            className={`${classes.control} ${
              formValidity.street ? "" : classes.invalid
            }}`}
            htmlFor="street"
          >
            Street
          </label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formValidity.street && <p>Please enter valid Street</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.postal ? "" : classes.invalid
          }}`}
        >
          <label
            className={`${classes.control} ${
              formValidity.postal ? "" : classes.invalid
            }}`}
            htmlFor="postal"
          >
            Postal Code
          </label>
          <input type="text" id="postal" ref={postalInputRef} />
          {!formValidity.postal && <p>Please enter valid Postal Code</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.city ? "" : classes.invalid
          }}`}
        >
          <label
            className={`${classes.control} ${
              formValidity.city ? "" : classes.invalid
            }}`}
            htmlFor="city"
          >
            City
          </label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formValidity.city && <p>Please enter valid City</p>}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;