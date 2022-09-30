import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Registry.module.css";
import user from "../../redux/user/userOperation";

const { registrationNewUser } = user;

function Registry() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const reset = () => {
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name) {
      dispatch(registrationNewUser({ name, email, password, reset }));
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "name":
        return setName(value);

      case "email":
        return setEmail(value);

      case "password":
        return setPassword(value);

      default:
        return;
    }
  };

  return (
    <div className={s.formContainer}>
      <div className={s.textContainer}>
        <h1 className={s.title}>Hello!</h1>
        <p className={s.text}>
          I am glad that you are reviewing my test assignment. In order to go to
          the main pages, you need to register, then confirm your email, and
          only then browse the site. The website is adapted to all types of
          devices, from mobile to desktop. I wish you a nice day and a pleasant
          viewing!
        </p>
      </div>
      {/* <h1>Anywhere in your app!</h1> */}
      <Formik
        validate={(values) => {
          const errors = {};
          if (!values?.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
      >
        {({
          errors,
          touched,
          handleBlur,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={s.form}>
            <label className={s.label}>
              <span className={s.spanLabel}>Name</span>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={name}
                className={s.textField__input}
                placeholder="you name"
              />
            </label>
            <label className={s.label}>
              <span className={s.spanLabel}>Email</span>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={email}
                className={s.textField__input}
                placeholder="your@mail.com"
              />
            </label>

            {errors.email && touched.email && errors.email}
            <label className={s.label}>
              <span className={s.spanLabel}>Password</span>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={password}
                className={s.textField__input}
                placeholder="you password"
              />
            </label>

            {errors.password && touched.password && errors.password}
            <button
              type="submit"
              disabled={isSubmitting}
              className={s.buttonReg}
            >
              Registration
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
export default Registry;
