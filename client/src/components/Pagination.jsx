import ReactPaginate from 'react-paginate';
import { styled } from '@mui/material';

const Pagi = styled('div')`
    margin: 12px auto 8px;
`;

const Pagination = ({ total, perPage, paginate }) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumber.push(i);
    }

    return (
        <Pagi>
            <ReactPaginate
                nextLabel="&raquo;"
                onPageChange={paginate}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                pageCount={pageNumber.length}
                previousLabel="&laquo;"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />
        </Pagi>
    );
};

export default Pagination;
