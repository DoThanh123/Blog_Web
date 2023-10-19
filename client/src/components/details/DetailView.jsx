import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';

// components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '0 100px 20px',
    paddingTop: '56px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const EditIcon = styled(Edit)`
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
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
    },
}));

const socket = io('/', {
    reconnection: true,
});

const DetailView = () => {
    const url =
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const [post, setPost] = useState({});

    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();

    //lấy dữ liệu của bài viết
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    const deleteBlog = async () => {
        if (window.confirm('Bạn chắc chắn muốn xóa chứ?') === true) {
            await API.removeComment(post._id);
            await API.deletePost(post._id);
            navigate('/');
        } else {
            navigate(`/details/${post._id}`);
        }
    };

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {account.admin ? (
                    <>
                        <Link to={`/update/${post._id}`}>
                            <EditIcon color="primary" />
                        </Link>
                        <DeleteIcon
                            onClick={() => {
                                deleteBlog();
                            }}
                            color="error"
                        />
                    </>
                ) : (
                    account.username === post.username && (
                        <>
                            <Link to={`/update/${post._id}`}>
                                <EditIcon color="primary" />
                            </Link>
                            <DeleteIcon
                                onClick={() => {
                                    deleteBlog();
                                }}
                                color="error"
                            />
                        </>
                    )
                )}
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link
                    to={`/user/${post.username}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>
                        Author:{' '}
                        <span style={{ fontWeight: 600 }}>{post.name}</span>
                    </Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>
                    {new Date(
                        post.createdDate || post.createdAt
                    ).toDateString()}
                </Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} socket={socket} />
        </Container>
    );
};

export default DetailView;
