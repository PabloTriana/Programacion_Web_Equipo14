import React, { useState } from 'react'
import { Form } from "semantic-ui-react"
import { useFormik } from "formik"
import { Auth } from "../../../../api"
import { initialValues, validationSchema } from "./RegisterForm.form"
import "./RegisterForm.scss"


const authController = new Auth();
//Controlar formulario 
export function RegisterForm(props) {
    const { openLogin } = props;
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                setError("");
                await authController.register(formValue);
                openLogin();
            } catch (error) {
                setError("Error en el servidor");
            }
        }
    })
    return (
        <Form className='register-form' onSubmit={formik.handleSubmit}>
            <Form.Input name="email" placeholder="Correo Electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
            <Form.Input name="password" type="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />
            <Form.Input name="repeatPassword" type="password" placeholder="Repetir el Password" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword} />
            <Form.Checkbox name='conditionsAccepted' label="He leido y acepto los terminos y condiciones" onChange={(_, data) => formik.setFieldValue("conditionsAccepted", data.checked)} checked={formik.values.conditionsAccepted} error={formik.errors.conditionsAccepted} />
            <Form.Button type='submit' primary fliud loading={formik.isSubmitting}>Registarse</Form.Button>
            <p className='register-form_error'>{error}</p>
        </Form>
    )
}
