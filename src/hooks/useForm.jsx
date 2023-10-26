import { useState } from 'react'
import * as Yup from 'yup'

const useForm = (initialValues, onSubmit, validationSchema) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isDirty, setDirty] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
        setDirty(true)
    }

    const handleBlur = e => {
        const { name, value } = e.target
        setTouched({ ...touched, [name]: true })

        Yup.reach(validationSchema, name)
            .validate(value)
            .then(() => {
                setErrors({ ...errors, [name]: '' })
            })
            .catch(error => {
                setErrors({ ...errors, [name]: error.message })
            })
    }

    const handleSubmit = e => {
        e.preventDefault()

        validationSchema
            .validate(values, { abortEarly: false })
            .then(() => {
                onSubmit(values)
                setErrors({})
                setDirty(false)
            })
            .catch(validationErrors => {
                const newErrors = {}
                validationErrors.inner.forEach(error => {
                    newErrors[error.path] = error.message
                })
                setErrors(newErrors)
            })
    }

    return {
        values,
        errors,
        touched,
        isDirty,
        inputHandlers: {
            onChange: handleChange,
            onBlur: handleBlur
        },
        formHandlers: {
            onSubmit: handleSubmit
        }
    }
}

export default useForm
