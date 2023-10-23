import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, styled } from '@mui/material';
import { Delete } from '@mui/icons-material';

import { API } from '../../../service/api';
import { DataContext } from '../../../context/DataProvider';

const Component = styled(Box)`
    margin-top: 30px;
    background: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Image = styled('img')({
    width: '20px',
    height: '20px',
    borderRadius: '50%',
});

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 24px;
    margin:0 20px 2px 6px;
    text-align: center;
    color: #000;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, socket, post }) => {
    const { account } = useContext(DataContext);
    const [user, setUser] = useState({});
    const avatarUrl = 'https://static.thenounproject.com/png/12017-200.png';

    useEffect(() => {
        const getUser = async () => {
            let response = await API.getUser(comment.username);
            setUser(response.data[0]);
        };
        getUser();
        // eslint-disable-next-line
    }, [comment]);

    const removeComment = async (e) => {
        if (
            window.confirm('Bạn chắc chắn muốn xóa bình luận này chứ?') === true
        ) {
            e.preventDefault();
            try {
                await API.deleteComment(comment._id);
                const { data } = await API.getComments(post._id);
                socket.emit('delete', data);
            } catch (error) {
                console.log(error);
            }
        } else {
            e.preventDefault();
        }
    };

    return (
        <Component>
            <Container>
                <Link
                    className="d-flex justify-content-center align-items-center"
                    to={`/user/${comment.username}`}
                    style={{ textDecoration: 'none' }}>
                    <Image src={user.avatar || avatarUrl} />
                    <Name>{user.name}</Name>
                </Link>
                <StyledDate>
                    {new Date(comment.createdAt).toDateString()}
                </StyledDate>
                {account.admin ? (
                    <DeleteIcon onClick={(e) => removeComment(e)} />
                ) : (
                    comment.username === account.username && (
                        <DeleteIcon onClick={(e) => removeComment(e)} />
                    )
                )}
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    );
};

export default Comment;
