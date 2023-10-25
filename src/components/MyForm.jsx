import useForm from '../hooks/useForm'

function MyForm() {
    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const validationSchema = {
        name: value => (value ? '' : 'Pole jest wymagane'),
        email: value => (/\S+@\S+\.\S+/.test(value) ? '' : 'Niepoprawny adres email'),
        password: value => (value.length >= 8 ? '' : 'Hasło musi mieć co najmniej 8 znaków')
    }

    const onSubmit = values => {
        console.log('Wartości formularza:', values, isDirty, errors)
        alert(JSON.stringify({ values }))
    }

    const { values, errors, touched, isDirty, inputHandlers, formHandlers } = useForm(
        initialValues,
        onSubmit,
        validationSchema
    )

    return (
        <form className='block__form' onSubmit={formHandlers.onSubmit}>
            <div>
                <label htmlFor='name'>Imię:</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Name*'
                    value={values.name}
                    onChange={inputHandlers.onChange}
                    onBlur={inputHandlers.onBlur}
                    required
                />
                {touched.name && errors.name && <p className='error'>{errors.name}</p>}
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email*'
                    value={values.email}
                    onChange={inputHandlers.onChange}
                    onBlur={inputHandlers.onBlur}
                    required
                />
                {touched.email && errors.email && <p className='error'>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor='password'>Hasło:</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password*'
                    value={values.password}
                    onChange={inputHandlers.onChange}
                    onBlur={inputHandlers.onBlur}
                    required
                />
                {touched.password && errors.password && <p className='error'>{errors.password}</p>}
            </div>
            <button type='submit' disabled={!isDirty}>
                CLAIM YOUR FREE TRIAL
            </button>
            <p>
                By clicking the button, you are agreeing to our <a href='#'>Terms and Services</a>
            </p>
        </form>
    )
}

export default MyForm
