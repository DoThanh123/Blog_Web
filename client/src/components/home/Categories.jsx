import {
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    styled,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ed;
    color: #fff;
    text-decoration: none;
`;

const StyledCell = styled(TableCell)`
    padding: 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    display: block;
    width: 100%;
    padding: 16px;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            <Link
                to={`/create?category=${category || ''}`}
                style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </Link>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <StyledCell>
                            <StyledLink to={'/'}>All Categories</StyledLink>
                        </StyledCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <StyledCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>
                            </StyledCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Categories;
