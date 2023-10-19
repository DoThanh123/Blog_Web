import { Link, useParams } from 'react-router-dom';
import { Edit, Add } from '@mui/icons-material';

import { styled, Box, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { API } from '../../../service/api';
import Post from '../../home/post/Post';
import Pagination from '../../Pagination';

const Image = styled('img')({
    width: '80%',
    height: '70vh',
    objectFit: 'cover',
});

const UserDiv = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
});

const Div = styled('div')({
    position: 'relative',
    top: '-70px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
`;

const Wrapper = styled('div')`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
`;

const User = () => {
    const [info, setInfo] = useState({});
    const [background, setBackground] = useState('');
    const [bgUrl, setBgURL] = useState(
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    );
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line
    const [postPerPage, setPostPerPage] = useState(5);
    const indexOfLastPost = currentPage + postPerPage;
    const currentPosts = posts.slice(currentPage, indexOfLastPost);
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
    }, [username]);

    useEffect(() => {
        const getPost = async () => {
            let res = await API.getPostByUsername(username.username);
            if (res.isSuccess) {
                setPosts(res.data.reverse());
            }
        };
        getPost();
        // eslint-disable-next-line
    }, [username]);
    //upload img
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    info.background = response.data;
                    setBgURL(response.data);
                    await API.editUser(info);
                }
            }
        };
        getImage();
        // eslint-disable-next-line
    }, [background]);

    const url = 'https://static.thenounproject.com/png/12017-200.png';

    //change page
    const paginate = (e) =>
        setCurrentPage((e.selected * postPerPage) % posts.length);

    return (
        <div>
            <div
                className="d-flex justify-content-center"
                style={{
                    paddingTop: '56px',
                    alignItems: 'center',
                    position: 'relative',
                }}>
                <Image src={info.background || bgUrl} alt="background" />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-16px',
                        right: '180px',
                    }}>
                    <label htmlFor="fileInput">
                        <Add fontSize="large" color="action" />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => setBackground(e.target.files[0])}
                    />
                </div>
            </div>
            <UserDiv className="d-flex">
                <Div>
                    <img src={info.avatar || url} alt="user-avatar" />
                    <div className="pt-4">
                        <h3 className="mb-1 mt-2">{info.name}</h3>
                        <p className="mb-1">Phone: {info.phone}</p>
                        <p className="mb-1">Email: {info.email}</p>
                    </div>
                </Div>
                <div>
                    <Link
                        to={`/user/edit/${info.username}`}
                        style={{ textDecoration: 'none' }}>
                        <EditIcon color="primary" />
                        <span>Edit your profile</span>
                    </Link>
                </div>
            </UserDiv>
            {posts?.length > 0 ? (
                <>
                    <h2 style={{ marginLeft: '20px' }}>Blogs</h2>
                    <Wrapper>
                        {currentPosts.map((post, index) => (
                            <Grid key={index} style={{ width: '20%' }}>
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                    to={`/details/${post._id}`}>
                                    <Post post={post} />
                                </Link>
                            </Grid>
                        ))}
                    </Wrapper>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            total={posts.length}
                            perPage={postPerPage}
                            paginate={paginate}
                        />
                    </div>
                </>
            ) : (
                <Box
                    style={{
                        color: '878787',
                        margin: '30px 80px',
                        fontSize: 18,
                    }}>
                    No Blogs
                </Box>
            )}
        </div>
    );
};

export default User;
