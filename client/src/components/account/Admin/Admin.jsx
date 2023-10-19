import { styled, Box } from '@mui/material';
import { Delete, Info } from '@mui/icons-material';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { API } from '../../../service/api';
import Pagination from '../../Pagination';

const Banner = styled(Box)`
    background-image: url(https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg?w=1380&t=st=1696991906~exp=1696992506~hmac=2881f3d7d2af8a1359ced5e24871681621315f83d4b219ac44e69a3bd16b517b);
    width: 90%;
    height: 30vh;
    background-size: cover;
    object-fit: cover;
    margin: 0 auto;
`;

const Name = styled('h2')`
    text-align: center;
`;

const Table = styled('table')`
    width: 80%;
    margin: 4px auto;
`;

const InfoIcon = styled(Info)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
    cursor: pointer;
`;

const Pag = styled('div')`
    display: flex;
    justify-content: center;
    align-item: center;
    margin-top: 4px;
`;

const Admin = () => {
    const [accounts, setAccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line
    const [accPerPage, setAccPerPage] = useState(5);
    const [reset, setReset] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const getUserInfo = async () => {
            let res = await API.getAllUser({});
            if (res.isSuccess) {
                setAccounts(res.data);
            }
        };

        getUserInfo();
    }, [reset]);

    const indexOfLastAcc = currentPage + accPerPage;
    const currentAccs = accounts.slice(currentPage, indexOfLastAcc);

    //change page
    const paginate = (e) =>
        setCurrentPage((e.selected * accPerPage) % accounts.length);

    const onDeleteUser = async (id) => {
        if (window.confirm('Bạn chắc chắn muốn xóa tài khoản này chứ?')) {
            await API.deleteUser(id);
            setReset(!reset);
            navigate('/admin');
        } else {
            navigate('/admin');
        }
    };

    return (
        <div>
            <Banner />
            <div>
                <Name>Account List</Name>
                <div className="table-responsive">
                    <Table className="table table-light table-bordered table-striped">
                        <thead className="table-secondary">
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Password</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Tool</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAccs.map((account, index) => (
                                <tr key={account._id}>
                                    <th scope="row">
                                        {index + currentPage + 1}
                                    </th>
                                    <td>{account.username}</td>
                                    <td>{account.name}</td>
                                    <td>{account.password}</td>
                                    <td>{account.createdAt}</td>
                                    <td>
                                        <Link to={`/user/${account.username}`}>
                                            <InfoIcon color="primary" />
                                        </Link>
                                        {!account.admin && (
                                            <DeleteIcon
                                                onClick={() =>
                                                    onDeleteUser(account._id)
                                                }
                                                color="error"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pag>
                        <Pagination
                            total={accounts.length}
                            perPage={accPerPage}
                            paginate={paginate}
                        />
                    </Pag>
                </div>
            </div>
        </div>
    );
};

export default Admin;
