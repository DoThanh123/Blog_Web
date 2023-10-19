// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Data is being loaded. Please wait',
    },
    success: {
        title: 'Success',
        message: 'Data successfully loaded',
    },
    requestFailure: {
        title: 'Error!',
        message: 'An error occur while parsing request data',
    },
    responseFailure: {
        title: 'Error!',
        message:
            'An error occur while fetching response from server. Please try again',
    },
    networkError: {
        title: 'Error!',
        message:
            'Unable to connect to the server. Please check internet connectivity and try again.',
    },
};

// API SERVICE URL
// SAMPLE REQUEST
// NEED SERVICE CALL: { url: "/", method: "POST/GET/PUT/DELETE" }
export const SERVICE_URLS = {
    userLogin: { url: '/login', method: 'POST' },
    userSignup: { url: '/signup', method: 'POST' },
    getAllUser: { url: '/admin', method: 'GET' },
    getUser: { url: 'user', method: 'GET', query: true },
    deleteUser: { url: 'user/delete', method: 'DELETE', query: true },
    getAllPosts: { url: '/posts', method: 'GET', params: true },
    getRefreshToken: { url: '/token', method: 'POST' },
    uploadFile: { url: 'file/upload', method: 'POST' },
    createPost: { url: 'create', method: 'POST' },
    deletePost: { url: 'delete', method: 'DELETE', query: true },
    getPostById: { url: 'post', method: 'GET', query: true },
    getPostByUsername: { url: 'user/posts', method: 'GET', query: true },
    newComment: { url: '/comment/new', method: 'POST' },
    getComments: { url: 'comments', method: 'GET', query: true },
    // getAllComments: { url: '/comments', method: 'GET', query: true },
    deleteComment: {
        url: 'comments/delete',
        method: 'DELETE',
        query: true,
    },
    removeComment: {
        url: 'comments/remove',
        method: 'DELETE',
        query: true,
    },
    updatePost: { url: 'update', method: 'PUT', query: true },
    editUser: { url: '/user/edit', method: 'PUT', query: true },
    userLogout: { url: '/logout', method: 'DELETE', query: true },
};
