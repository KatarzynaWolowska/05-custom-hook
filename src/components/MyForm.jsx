import useForm from '../hooks/useForm'
import * as Yup from 'yup'

function MyForm() {
    const initialValues = {
        name: '',
        email: '',
        password: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        email: Yup.string().email('Invalid email').required('Required')
    })

    const onSubmit = values => {
        console.log('Wartości formularza:', values, isDirty, errors, touched)
        alert(JSON.stringify(values, 2, null))
    }

    const { values, errors, touched, isDirty, inputHandlers, formHandlers } = useForm(
        initialValues,
        onSubmit,
        validationSchema
    )

    return (
        <form className='block__form' onSubmit={formHandlers.onSubmit} noValidate>
            <div>
                <label htmlFor='name'>Imię:</label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Full name*'
                    value={values.name}
                    onChange={inputHandlers.onChange}
                    onBlur={inputHandlers.onBlur}
                    required
                />
                {errors.name && <p className='error'>{errors.name}</p>}
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
                {errors.email && <p className='error'>{errors.email}</p>}
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
                {errors.password && <p className='error'>{errors.password}</p>}
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
