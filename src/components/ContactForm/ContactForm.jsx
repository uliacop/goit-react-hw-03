import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
const phoneRegExp = /^\d{3}-\d{2}-\d{2}$/;
const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!It`s needs 3 symbols")
    .max(50, "Too Long!It`s needs max 50 symbols")
    .required("Required"),

  number: Yup.string()
    .matches(
      phoneRegExp,
      "Phone number is not valid.Enter number in format XXX-XX-XX"
    )
    .required("Phone number is required"),
});
export default function ContactForm({ onAdd }) {
  const handleSubmit = (values, actions) => {
    onAdd({
      id: nanoid(),
      name: values.name,
      number: values.number,
    });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={userSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <Field className={css.field} type="text" name="name" />
        <ErrorMessage name="name" component="span" />
        <Field className={css.field} type="tel" name="number" />
        <ErrorMessage name="number" component="span" />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
