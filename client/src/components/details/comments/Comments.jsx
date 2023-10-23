import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';
import Pagination from '../../Pagination';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
`;

const Image = styled('img')({
    width: '50px !important',
    height: '50px',
    borderRadius: '50%',
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    flex: 20;
    margin: 0 20px;
`;

const initialValue = {
    username: '',
    name: '',
    postId: '',
    comments: '',
};

const Comments = ({ post, socket }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [commentsRealTime, setCommentsRealTime] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line
    const [commentPerPage, setCommentPerPage] = useState(10);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const response = await API.getComments(post._id);
            if (response.isSuccess) {
                setComments(response.data.reverse());
            }
        };
        getData();
    }, [post]);

    useEffect(() => {
        // console.log('SOCKET IO', socket);
        socket.on('new-comment', (newComment) => {
            setCommentsRealTime(newComment);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        // console.log('SOCKET IO', socket);
        socket.on('delete-comment', (comment) => {
            setCommentsRealTime(comment);
        });
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setComment({
            ...comment,
            username: account.username,
            postId: post._id,
            comments: e.target.value,
        });
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            await API.newComment(comment);
            const { data } = await API.getComments(post._id);
            setComment(initialValue);
            socket.emit('comment', data);
        } catch (error) {
            console.log(error);
        }
    };

    let uiCommentUpdate =
        commentsRealTime.length > 0 ? commentsRealTime.reverse() : comments;

    const indexOfLastPost = currentPage + commentPerPage;
    const currentComments = uiCommentUpdate.slice(currentPage, indexOfLastPost);

    //change page
    const paginate = (e) =>
        setCurrentPage((e.selected * commentPerPage) % uiCommentUpdate.length);

    return (
        <Box>
            <Container>
                <Image src={account.avatar || url} alt="dp" />
                <StyledTextArea
                    minRows={5}
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}>
                    Post
                </Button>
            </Container>
            <Box>
                {currentComments.length === 0 && (
                    <h3 className="d-flex justify-content-center text-center mt-4">
                        Let Comment
                    </h3>
                )}
                {currentComments.map((comment, index) => (
                    <Comment
                        socket={socket}
                        comment={comment}
                        key={index}
                        post={post}
                    />
                ))}
                <div className="d-flex justify-content-center">
                    <Pagination
                        total={uiCommentUpdate.length}
                        perPage={commentPerPage}
                        paginate={paginate}
                    />
                </div>
            </Box>
        </Box>
    );
};

export default Comments;
