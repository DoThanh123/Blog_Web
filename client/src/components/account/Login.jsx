import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 400px;
    margin: 30px auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0',
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
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
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
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
        let response = await API.userLogin(login);
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
            });

            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    };

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
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
                                <p>Enter your name:</p>
                                <input
                                    onChange={(e) => onInputChange(e)}
                                    name="name"
                                    id="name"
                                />
                                <p>Enter your username:</p>
                                <input
                                    onChange={(e) => onInputChange(e)}
                                    name="username"
                                    id="username"
                                />
                                <p>Enter your email:</p>
                                <input
                                    type="email"
                                    onChange={(e) => onInputChange(e)}
                                    name="email"
                                    id="email"
                                    placeholder="email@example.com"
                                />
                                <p>Enter your phone number:</p>
                                <input
                                    type="tel"
                                    required
                                    onChange={(e) => onInputChange(e)}
                                    name="phone"
                                    id="phone"
                                    pattern="[0-9]{10}"
                                    placeholder="Số điện thoại(10 số)"
                                />
                                <p>Enter your password:</p>
                                <input
                                    type="password"
                                    onChange={(e) => onInputChange(e)}
                                    name="password"
                                    id="password"
                                    pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                                    placeholder="ít nhất 8 ký tự bao gồm chữ thường và chữ số"
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