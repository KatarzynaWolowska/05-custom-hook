import { useState } from 'react'

const useForm = (initialValues, onSubmit, validationSchema) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isDirty, setIsDirty] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        setIsDirty(true)
    }

    const handleBlur = e => {
        const { name, value } = e.target
        setTouched({
            ...touched,
            [name]: true
        })

        // Wywołanie funkcji walidacji z odpowiednim polem i wartością
        if (validationSchema[name]) {
            const error = validationSchema[name](value)
            setErrors({
                ...errors,
                [name]: error
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Walidacja całego formularza
        const newErrors = {}
        for (const fieldName in validationSchema) {
            if (validationSchema[fieldName]) {
                const error = validationSchema[fieldName](values[fieldName])
                if (error) {
                    newErrors[fieldName] = error
                }
            }
        }

        setErrors(newErrors)

        // Jeżeli formularz jest poprawny, wywołaj funkcję onSubmit
        if (Object.keys(newErrors).length === 0) {
            onSubmit(values)
        }
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
