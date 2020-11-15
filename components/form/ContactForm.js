import { useState, Fragment } from "react";

// NEXT LINK
import Link from "next/link";

// ACTIONS
import { emailContactForm } from "../../actions/form";

function ContactForm({ authorEmail }) {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Send Message",
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Sending..." });
    emailContactForm({ authorEmail, name, email, message }).then((data) => {
      if (data.error) setValues({ ...values, error: data.error });
      else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "Sent",
          success: data.success,
        });
      }
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Thank you for contacting us.</div>
    );

  const showErrorMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const contactForm = () => (
    <form onSubmit={clickSubmit} className="pb-5">
      <div className="form-group">
        <label htmlFor="message" className="lead">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows="10"
          type="text"
          className="form-control"
          value={message}
          onChange={handleChange("message")}
          required={true}
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="name" className="lead">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          value={name}
          required={true}
          id="name"
          onChange={handleChange("name")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="lead">
          Email from
        </label>
        <input
          type="email"
          className="form-control"
          value={email}
          required={true}
          id="email"
          onChange={handleChange("email")}
        />
      </div>

      <div>
        <button className="btn btn-primary">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Fragment>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </Fragment>
  );
}

export default ContactForm;
