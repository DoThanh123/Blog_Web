import { useState, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../../service/api';

const Component = styled(Box)`
    width: 600px;
    margin: auto;
    padding-top: 56px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    border-radius: 4px;
`;

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div,
    & > button,
    & > p {
        margin-top: 15px;
        margin-bottom: 5px;
    }
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

const EditUser = () => {
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const username = useParams();

    useEffect(() => {
        const user = async () => {
            let res = await API.getUser(username.username);
            if (res.isSuccess) {
                setInfo(res.data[0]);
            }
        };
        user();
        // eslint-disable-next-line
    }, []);

    const onInputChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };
    const update = async (e) => {
        e.preventDefault();
        await API.editUser(info);
        navigate(`/user/${info.username}`);
    };

    return (
        <Component>
            <form className="p-2 mt-4" onSubmit={(e) => update(e)}>
                <Wrapper>
                    <h1>Change info</h1>

                    <p>Enter your name:</p>
                    <Input
                        onChange={(e) => onInputChange(e)}
                        name="name"
                        id="name"
                        value={info.name}
                    />

                    <p>Enter your email:</p>
                    <Input
                        type="email"
                        onChange={(e) => onInputChange(e)}
                        name="email"
                        id="email"
                        value={info.email}
                        placeholder="Example: email@gmail.com"
                    />

                    <p>Enter your phone number:</p>
                    <Input
                        type="tel"
                        required
                        onChange={(e) => onInputChange(e)}
                        name="phone"
                        id="phone"
                        value={info.phone}
                        pattern="[0-9]{10}"
                        placeholder="Số điện thoại 10 số"
                    />
                </Wrapper>
                <div className="d-flex justify-content-end me-4">
                    <button
                        className="btn btn-warning"
                        onClick={() => navigate(`/user/${info.username}`)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Change
                    </button>
                </div>
            </form>
        </Component>
    );
};

export default EditUser;
