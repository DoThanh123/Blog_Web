import { useContext } from 'react';
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

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
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
                    to={`/user/${comment.username}`}
                    style={{ textDecoration: 'none' }}>
                    <Name>{comment.name}</Name>
                </Link>
                <StyledDate>
                    {new Date(comment.createdAt).toDateString()}
                </StyledDate>
                {account.admin ? (
                    <DeleteIcon onClick={(e) => removeComment(e)} />
                ) : (
                    comment.name === account.username && (
                        <DeleteIcon onClick={(e) => removeComment(e)} />
                    )
                )}
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    );
};

export default Comment;
