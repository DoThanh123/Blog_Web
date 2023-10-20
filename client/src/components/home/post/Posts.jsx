import { useEffect, useState } from 'react';

import { Grid, Box, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// import { getAllPosts } from '../../../service/api';
import { API } from '../../../service/api';

//components
import Post from './Post';
import Pagination from '../../Pagination';

const Div = styled('div')`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line
    const [postPerPage, setPostPerPage] = useState(16);
    const indexOfLastPost = currentPage + postPerPage;
    const currentPosts = posts.slice(currentPage, indexOfLastPost);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data.reverse());
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [category]);

    //change page
    const paginate = (e) =>
        setCurrentPage((e.selected * postPerPage) % posts.length);

    return (
        <>
            {posts?.length ? (
                <>
                    <Div>
                        {currentPosts.map((post, index) => (
                            <Grid key={index} item lg={3} sm={4} xs={12}>
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                    to={`details/${post._id}`}>
                                    <Post post={post} />
                                </Link>
                            </Grid>
                        ))}
                    </Div>
                    <Pagination
                        total={posts.length}
                        perPage={postPerPage}
                        paginate={paginate}
                    />
                </>
            ) : (
                <Box
                    style={{
                        color: '878787',
                        margin: '30px 80px',
                        fontSize: 18,
                        width: '100%',
                        textAlign: 'center',
                    }}>
                    Chưa có blog nào thuộc danh mục này
                </Box>
            )}
        </>
    );
};

export default Posts;
