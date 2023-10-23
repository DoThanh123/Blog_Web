import { Link, useParams } from 'react-router-dom';
import { Edit, Add } from '@mui/icons-material';

import { styled, Box, Grid } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { API } from '../../../service/api';
import Post from '../../home/post/Post';
import Pagination from '../../Pagination';
import { DataContext } from '../../../context/DataProvider';

const Image = styled('img')({
    width: '80%',
    height: '40vh',
    objectFit: 'cover',
    objectPosition: 'top',
});

const AvatarImage = styled('img')({
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '50%',
    objectPosition: 'top',
});

const UserDiv = styled('div')({
    justifyContent: 'space-around',
    height: '200px',
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
    flex-wrap: nowrap;
    padding: 10px;
`;

const User = () => {
    const { account } = useContext(DataContext);

    const [info, setInfo] = useState({});

    const [background, setBackground] = useState('');
    const [bgUrl, setBgURL] = useState(
        'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
    );

    const [userAvatar, setUserAvatar] = useState('');
    const [avatar, setAvatar] = useState(
        'https://static.thenounproject.com/png/12017-200.png'
    );

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line
    const [postPerPage, setPostPerPage] = useState(4);
    const indexOfLastPost = currentPage + postPerPage;
    const currentPosts = posts.slice(currentPage, indexOfLastPost);
    const username = useParams();
    //get user info
    useEffect(() => {
        const user = async () => {
            let res = await API.getUser(username.username);
            if (res.isSuccess) {
                setInfo(res.data[0]);
            }
        };
        user();
        // eslint-disable-next-line
    }, [username]);
    //get posts
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
    //upload background
    useEffect(() => {
        const getImage = async () => {
            if (background) {
                const data = new FormData();
                data.append('name', background.name);
                data.append('file', background);

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
    //upload avatar
    useEffect(() => {
        const getImage = async () => {
            if (userAvatar) {
                const data = new FormData();
                data.append('name', userAvatar.name);
                data.append('file', userAvatar);

                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    info.userAvatar = response.data;
                    setAvatar(response.data);
                    await API.editUser(info);
                }
            }
        };
        getImage();
        // eslint-disable-next-line
    }, [avatar]);

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
                {account.username === info.username && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '160px',
                        }}>
                        <label
                            htmlFor="backgroundInput"
                            style={{
                                backgroundColor: '#22c5e8',
                                borderRadius: '50%',
                            }}>
                            <Add fontSize="large" color="action" />
                        </label>
                        <input
                            type="file"
                            id="backgroundInput"
                            style={{ display: 'none' }}
                            onChange={(e) => setBackground(e.target.files[0])}
                        />
                    </div>
                )}
            </div>
            <UserDiv className="d-flex">
                <Div>
                    <div
                        className="d-flex justify-content-center"
                        style={{
                            paddingTop: '56px',
                            alignItems: 'center',
                            position: 'relative',
                        }}>
                        <AvatarImage
                            src={info.avatar || avatar}
                            alt="user-avatar"
                        />
                        {account.username === info.username && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '14px',
                                }}>
                                <label
                                    htmlFor="avatarInput"
                                    style={{
                                        backgroundColor: '#22c5e8',
                                        borderRadius: '50%',
                                    }}>
                                    <Add fontSize="large" color="action" />
                                </label>
                                <input
                                    type="file"
                                    id="avatarInput"
                                    style={{ display: 'none' }}
                                    onChange={(e) =>
                                        setUserAvatar(e.target.files[0])
                                    }
                                />
                            </div>
                        )}
                    </div>
                    <div style={{ paddingTop: '7.5rem', marginLeft: '1.5rem' }}>
                        <h3 className="mb-1 mt-2">{info.name}</h3>
                        <p className="mb-1">Phone: {info.phone}</p>
                        <p className="mb-1">Email: {info.email}</p>
                    </div>
                </Div>
                <div style={{ width: '150px' }}>
                    {account.admin === 'admin' ? (
                        <Link
                            to={`/user/edit/${info.username}`}
                            style={{ textDecoration: 'none' }}>
                            <EditIcon color="primary" />
                            <span>Edit your profile</span>
                        </Link>
                    ) : (
                        account.username === info.username && (
                            <Link
                                to={`/user/edit/${info.username}`}
                                style={{ textDecoration: 'none' }}>
                                <EditIcon color="primary" />
                                <span>Edit your profile</span>
                            </Link>
                        )
                    )}
                </div>
            </UserDiv>
            {posts?.length > 0 ? (
                <div style={{ margin: '0 134px' }}>
                    <h2 style={{ marginLeft: '20px' }}>Blogs</h2>
                    <Wrapper>
                        {currentPosts.map((post, index) => (
                            <Grid key={index} style={{ width: '25%' }}>
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
                </div>
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
