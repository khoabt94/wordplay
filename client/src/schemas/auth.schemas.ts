import validator from 'validator'
import * as yup from 'yup'


export const LoginFormSchema = yup.object().shape({
    email: yup.string()
        .required('Please provide your email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
    password: yup.string()
        .required('Please provide a password')
        .min(6, 'A password should have at least 6 characters'),
});

export const SignupFormSchema = yup.object().shape({
    name: yup.string()
        .required('Please tell us your name')
        .max(20, 'A name should have maxiumum of 20 characters'),
    email: yup.string()
        .required('Please provide your email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
    password: yup.string()
        .required('Please provide a password')
        .min(6, 'A password should have at least 6 characters'),
    password_confirm: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords not match'),
});

export const ForgotPasswordFormSchema = yup.object().shape({
    email: yup.string()
        .required('Please provide your email')
        .test('valid_email', (val: string | undefined) => !!val && validator.isEmail(val)),
});

export const ResetPasswordFormSchema = yup.object().shape({
    password: yup.string()
        .required('Please provide a password')
        .min(6, 'A password should have at least 6 characters'),
    password_confirm: yup.string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords not match'),
});

export const ChangeNameFormSchema = yup.object().shape({
    name: yup.string()
        .required('Please tell us your name')
        .max(20, 'A name should have maxiumum of 20 characters'),
});