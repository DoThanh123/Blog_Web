import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 450px;
    margin: 20px auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0',
});

const Wrapper = styled(Box)`
    padding: 20px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div,
    & > button,
    & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
    margin: 2px auto;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const P = styled('p')`
    margin: 10px 0 4px 0;
`;

const Input = styled('input')`
    font: inherit;
    letter-spacing: inherit;
    color: currentColor;
    padding: 4px 0 5px;
    border: 0;
    border-bottom: 1px solid currentColor;
    box-sizing: content-box;
    background: none;
    height: 1.4375em;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    display: block;
    min-width: 0;
    width: 100%;
    outline: none;
`;

const loginInitialValues = {
    username: '',
    password: '',
};

const signupInitialValues = {
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    admin: false,
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL =
        'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        try {
            let response = await API.userLogin(login);
            // console.log(response);
            if (response.isSuccess) {
                showError('');

                sessionStorage.setItem(
                    'accessToken',
                    `Bearer ${response.data.accessToken}`
                );
                sessionStorage.setItem(
                    'refreshToken',
                    `Bearer ${response.data.refreshToken}`
                );
                setAccount({
                    name: response.data.name,
                    username: response.data.username,
                    admin: response.data.admin,
                    token: response.data.refreshToken,
                    avatar: response.data.avatar,
                });

                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate('/');
            }
        } catch (error) {
            alert('Tài khoản hoặc mật khẩu không chính xác!');
        }
    };

    const signupUser = async () => {
        if (signup.key !== null) {
            let response = await API.adminSignup(signup);
            if (response.isSuccess) {
                showError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                showError('Something went wrong! please try again later');
            }
        } else {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                showError('');
                setSignup(signupInitialValues);
                toggleAccount('login');
            } else {
                showError('Something went wrong! please try again later');
            }
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {account === 'login' ? (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={login.username}
                            onChange={(e) => onValueChange(e)}
                            name="username"
                            label="Enter Username"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="password"
                            variant="standard"
                            value={login.password}
                            onChange={(e) => onValueChange(e)}
                            name="password"
                            label="Enter Password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        {error && <Error>{error}</Error>}

                        <LoginButton
                            variant="contained"
                            onClick={() => loginUser()}>
                            Login
                        </LoginButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <SignupButton
                            onClick={() => toggleSignup()}
                            style={{ marginBottom: 50 }}>
                            Create an account
                        </SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <form onSubmit={() => signupUser()}>
                            <div
                                className="d-flex flex-column"
                                style={{ width: '100%' }}>
                                <P>Enter admin key:</P>
                                <Input
                                    onChange={(e) => onInputChange(e)}
                                    name="key"
                                    id="key"
                                    placeholder="Nhập để đăng ký tài khoản admin"
                                    type="password"
                                />
                                <P>Enter your name:</P>
                                <Input
                                    onChange={(e) => onInputChange(e)}
                                    name="name"
                                    id="name"
                                    required
                                />
                                <P>Enter your username:</P>
                                <Input
                                    onChange={(e) => onInputChange(e)}
                                    name="username"
                                    id="username"
                                    required
                                />
                                <P>Enter your email:</P>
                                <Input
                                    type="email"
                                    onChange={(e) => onInputChange(e)}
                                    name="email"
                                    id="email"
                                    placeholder="email@example.com"
                                    required
                                />
                                <P>Enter your phone number:</P>
                                <Input
                                    type="tel"
                                    onChange={(e) => onInputChange(e)}
                                    name="phone"
                                    id="phone"
                                    pattern="[0-9]{10}"
                                    placeholder="Số điện thoại(10 số)"
                                    required
                                />
                                <P>Enter your password:</P>
                                <Input
                                    type="password"
                                    onChange={(e) => onInputChange(e)}
                                    name="password"
                                    id="password"
                                    pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                                    placeholder="ít nhất 8 ký tự bao gồm chữ thường và chữ số"
                                    required
                                />
                            </div>
                            <div
                                className="d-flex flex-column mt-4"
                                style={{ width: '100%' }}>
                                <SignupButton type="submit">
                                    Signup
                                </SignupButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <LoginButton
                                    variant="contained"
                                    onClick={() => toggleSignup()}>
                                    Already have an account
                                </LoginButton>
                            </div>
                        </form>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;
