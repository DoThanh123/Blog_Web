import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { styled } from '@mui/material';
import 'bootstrap';

import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Nav = styled('nav')`
    z-index: 1000;
    width: 100%;
    height: 56px;
`;

const Image = styled('img')`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 4px;
`;

const Header = () => {
    const avatarUrl = 'https://static.thenounproject.com/png/12017-200.png';
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const deleteToken = async () => {
        await API.userLogout(account.token);
    };

    const handleLogout = (e) => {
        //eslint-disable-next-line no-restricted-globals
        if (confirm('Logout?') === true) {
            deleteToken();
            navigate('/account');
        } else {
            e.preventDefault();
        }
    };

    return (
        <Nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed">
            <div className="container-fluid" style={{ height: '40px' }}>
                <div
                    style={{ height: '40px' }}
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                HOME
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                ABOUT
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                CONTACT
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <div
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <Image src={account.avatar || avatarUrl} />
                                {account.name}
                            </div>
                            <ul
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                                style={{ left: '-80px' }}>
                                {account.admin && (
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/admin">
                                            Administrator
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to={`/user/${account.username}`}>
                                        User Info
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button
                                        onClick={(e) => handleLogout(e)}
                                        className="dropdown-item">
                                        LOGOUT
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </Nav>
    );
};

export default Header;
