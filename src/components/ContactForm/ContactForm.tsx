import React, { useState, useEffect } from "react";
import "./ContactForm.css";

interface StateI {
  name: string;
  email: string;
  message: string;
}
interface ErrorI {
  errorMessage: string;
  showError: boolean;
  buttonDisabled: boolean;
}

const ContactForm = () => {
  // State for managing form data
  const [state, setState] = useState<StateI>({
    name: "",
    email: "",
    message: "",
  });
  //   state for managing error and button disabling and enabling
  const [error, setError] = useState<ErrorI>({
    buttonDisabled: true,
    errorMessage: "",
    showError: false,
  });
  const { email, message, name } = state;
  const { errorMessage, showError, buttonDisabled } = error;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //   For managing the enabling and disabling of the send button
  useEffect(() => {
    if (
      name.length >= 2 &&
      email.length !== 0 &&
      regex.test(email) &&
      message.length !== 0
    ) {
      setError({
        errorMessage: "",
        showError: false,
        buttonDisabled: false,
      });
    } else {
      setError({
        ...error,
        buttonDisabled: true,
      });
    }
  }, [name, email, message, buttonDisabled]);

  //   Method to validate the data entered by the user
  const validation = (title: string) => {
    let errorMsg = "";
    let showError = false;
    if (title === "name") {
      if (name.length < 2) {
        errorMsg = "Name must be of atleast two characters";
        showError = true;
      }
    } else if (title === "email") {
      if (email.length === 0) {
        errorMsg = "Email Address cannot be empty.";
        showError = true;
      } else if (!regex.test(email)) {
        errorMsg = "Please enter a valid email address.";
        showError = true;
      }
    } else if (title === "message") {
      if (message.length === 0) {
        errorMsg = "Message cannot be empty.";
        showError = true;
      }
    }
    setError({
      ...error,
      errorMessage: errorMsg,
      showError: showError,
    });
  };

  return (
    <>
      <div className="form--main--container">
        <div className="form--container">
          <div className="form--heading--container">
            <h4 className="form--heading--one">Newsletter</h4>
            <h6 className="form--heading--two">
              Get news about articles and updates <br /> in your inbox.
            </h6>
          </div>
          <div className="form--field--container">
            <form>
              <input
                value={name}
                onChange={(e) => {
                  setState({
                    ...state,
                    name: e.target.value,
                  });
                }}
                onBlur={() => validation("name")}
                type="text"
                className="form--input"
                placeholder="NAME"
              />
              <input
                value={email}
                onChange={(e) => {
                  setState({
                    ...state,
                    email: e.target.value,
                  });
                }}
                onBlur={() => validation("email")}
                type="email"
                className="form--input"
                placeholder="EMAIL"
              />
              <input
                value={message}
                onChange={(e) => {
                  setState({
                    ...state,
                    message: e.target.value,
                  });
                }}
                onBlur={() => validation("message")}
                type="text"
                className="form--input"
                style={{
                  marginBottom: "20px",
                  position: "absolute",
                  top: "120px",
                  zIndex: "2",
                }}
                placeholder="MESSAGE"
              />
              <br />
              {showError ? (
                <strong
                  style={{ fontSize: "16px", color: "red", marginTop: "50px" }}
                >
                  {errorMessage}
                </strong>
              ) : null}
            </form>
          </div>
          <div className="button--container">
            <button
              className="form--button"
              onClick={() => {
                setTimeout(() => {
                  alert("Message Sent Succefully !");
                  setState({
                    email: "",
                    message: "",
                    name: "",
                  });
                }, 200);
              }}
              disabled={buttonDisabled}
            >
              SEND
            </button>
          </div>
        </div>
        <div className="form--block--heading--container">
          <h1 className="form--big--heading">
            GET <br />
            IN TOUCH
          </h1>
        </div>
      </div>
      <div className="footer--container">
        <p>Copyright 2022 All Right Reserved By SG</p>
      </div>
    </>
  );
};

export default ContactForm;
