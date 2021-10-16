import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRecaptcha } from 'react-hook-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  loginAction,
  selectLoading,
  selectRegisterSuccess,
} from '../loginSlice';
import {
  BoxLogin,
  Mybox,
  MyButtonAuthLogin,
  MyComponent,
  MyLabel,
  MyTextField,
  NtfTitle,
} from '../stylesForAuth';
import { messages } from '../messages';
import { useTranslation } from 'react-i18next';

interface IFormInputs {
  name: string;
  email: string;
  password: any;
  confirmPassword: any;
}

const containerId = 'test-recaptcha';
const sitekey = '6LcSG9EaAAAAABvbpHkdugGmjEWeYPp6NoPPDEvt';
const schema = yup
  .object({
    name: yup.string().required('Invalid name'),
    email: yup.string().email('Invalid Email').required('Invalid Email'),
    password: yup
      .string()
      .required('Invalid password')
      .matches(
        /(?=.*?[0-9])/,
        'Password should contain at least one digit(0-9)',
      )
      .min(8, 'Password length should be between 8 to 255 characters.')
      .max(255, 'Password length should be between 8 to 255 characters.')
      .matches(
        /(?=.*?[A-Z])/,
        'Password should contain at least one uppercase letter(A-Z).',
      )
      .matches(
        /(?=.*?[#?!@$%^&*-])/,
        'Password should contain at least one special character ( @, #, %, &, !, $, etc….).',
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], "Password's not match")
      .required('Required!'),
  })
  .required();

export const InputRegister = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [captchaResponse, setCaptchaResponse] = useState(null);
  const successCallback = response => {
    setCaptchaResponse(response);
  };
  const expiredCallback = () => setCaptchaResponse(null);

  useRecaptcha({
    containerId,
    successCallback,
    expiredCallback,
    size: 'normal',
    sitekey,
  });
  const form = useForm<IFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const hasNameError = errors.name;
  const hasEmailError = errors.email;
  const hasPasswordError = errors.password;
  const hasConfirmPasswordError = errors.confirmPassword;

  const [state, setState] = useState({
    showPassword: false,
    showConfirmpassword: false,
  });

  const handleClickShowPassword = () => {
    setState(state => ({ ...state, showPassword: !state.showPassword }));
  };
  const handleClickShowConfirmpassword = () => {
    setState(state => ({
      ...state,
      showConfirmpassword: !state.showConfirmpassword,
    }));
  };

  const onSubmit = (data: any) => {
    const newData = { ...data, recaptcha_response: captchaResponse };
    dispatch(loginAction.register(newData));
  };

  const ntfSuccess = useSelector(selectRegisterSuccess);
  return (
    <MyComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Mybox h="388px">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <>
                <MyLabel>{t(messages.name())}</MyLabel>
                <MyTextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter name"
                  error={Boolean(hasNameError)}
                  helperText={hasNameError?.message}
                  autoFocus={false}
                />
              </>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <>
                <MyLabel>Email</MyLabel>
                <MyTextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter email"
                  error={Boolean(hasEmailError)}
                  helperText={hasEmailError?.message}
                  autoFocus={false}
                />
              </>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field }) => (
              <>
                <MyLabel>{t(messages.password())}</MyLabel>
                <MyTextField
                  {...field}
                  className="mySetup"
                  id="outlined-adornment-password"
                  type={state.showPassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  placeholder="Enter password"
                  error={Boolean(hasPasswordError)}
                  helperText={hasPasswordError?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoFocus={false}
                />
              </>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <>
                <MyLabel>{t(messages.cfp())}</MyLabel>
                <MyTextField
                  {...field}
                  className="mySetup"
                  id="outlined-adornment-password_2"
                  type={state.showConfirmpassword ? 'text' : 'password'}
                  variant="outlined"
                  fullWidth
                  placeholder="Confirm password"
                  error={Boolean(hasConfirmPasswordError)}
                  helperText={hasConfirmPasswordError?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={handleClickShowConfirmpassword}
                        >
                          {state.showConfirmpassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoFocus={false}
                />
              </>
            )}
          />
        </Mybox>
        <NtfTitle sz="14px" fw={400}>
          {t(messages.ntf1())}
          <br />
          {t(messages.ntf2())} <span>{t(messages.ntf3())}</span>,{' '}
          {t(messages.ntf4())}
        </NtfTitle>

        <div id={containerId} className="g-recaptcha" />

        <BoxLogin>
          <MyButtonAuthLogin
            disabled={!captchaResponse}
            type="submit"
            w="174px"
            wmb="170px"
            hmb="42px"
          >
            {loading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              `${t(messages.btnCreate())}`
            )}
          </MyButtonAuthLogin>
        </BoxLogin>
      </form>
    </MyComponent>
  );
};
