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
        margin-top: 20px;
    }
`;

const EditUser = () => {
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const username = useParams();

    useEffect(() => {
        const user = async () => {
            let res = await API.getUser(username.username);
            if (res.isSuccess) {
                setInfo(res.data);
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
            <form className="p-2" onSubmit={(e) => update(e)}>
                <Wrapper>
                    <h1>Change info</h1>

                    <p>Enter your name:</p>
                    <input
                        onChange={(e) => onInputChange(e)}
                        name="name"
                        id="name"
                        value={info.name}
                    />

                    <p>Enter your email:</p>
                    <input
                        type="email"
                        onChange={(e) => onInputChange(e)}
                        name="email"
                        id="email"
                        value={info.email}
                    />

                    <p>Enter your phone number:</p>
                    <input
                        type="tel"
                        required
                        onChange={(e) => onInputChange(e)}
                        name="phone"
                        id="phone"
                        value={info.phone}
                        pattern="[0-9]{10}"
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
