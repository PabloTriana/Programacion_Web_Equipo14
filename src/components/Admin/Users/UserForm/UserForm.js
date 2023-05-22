import React, { useCallback } from 'react'
import { Form, Image } from "semantic-ui-react"
import { useFormik } from "formik"
import { image } from "../../../../assets"
import { useDropzone } from "react-dropzone"
import { initialValues, validationSchema } from "./UserForm.form"
import { User } from "../../../../api"
import { useAuth } from "../../../../hooks"
import { ENV } from "../../../../utils"
import "./Userform.scss"

const UserController = new User();

export function UserForm(props) {
    const { close, onReload, user } = props;
    const { accessToken } = useAuth();



    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                if (!user) {
                    await UserController.createUser(accessToken, formValue);
                } else {
                    await UserController.updateUser(accessToken, user._id, formValue)
                }
                onReload();
                close();
            } catch (error) {
                console.error(error)
            }
        }
    })

    //hoock DropZone
    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue("avatar", URL.createObjectURL(file)) //mostrar imagen en la aplicacion
        formik.setFieldValue("fileAvatar", file) //Mandar imagen al servidor
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg,image/png",
        onDrop
    })

    const getAvatar = () => {
        if (formik.values.fileAvatar) {
            return formik.values.avatar;
        } else if (formik.values.avatar) {
            return `${ENV.BASE_PATH}/${formik.values.avatar}`
        }
        return image.noAvatar
    }

    return (
        <Form className='user-form' onSubmit={formik.handleSubmit}>
            <div className='user-form__avatar' {...getRootProps()}>
                <input{...getInputProps()} />
                <Image avatar size="small" src={getAvatar()} />
            </div>

            <Form.Group widths="equal">
                <Form.Input name="firstname" placeholder="Nombre" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname} />
                <Form.Input name="lastname" placeholder="Apellido" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname} />
            </Form.Group>

            <Form.Group widths="equal">
                <Form.Input name="email" placeholder="Correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
                <Form.Dropdown placeholder='Selecciona un rol' options={roleOptions} selection onChange={(_, data) => formik.setFieldValue("role", data.value)} value={formik.values.role} error={formik.errors.role} />
            </Form.Group>

            <Form.Input type='password' name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password} />

            <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
                {user ? "Actualizar usuario" : "Crear usuario"}
            </Form.Button>
        </Form>
    )
}

//definir roles

const roleOptions = [
    {
        key: "user",
        text: "Usuario",
        value: "user"
    },
    {
        key: "admin",
        text: "Administrador",
        value: "admin"
    },
]