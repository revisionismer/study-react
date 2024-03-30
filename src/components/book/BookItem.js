import React from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookItem = (props) => {

    const {id, title, author} = props.book;

    return (
        <Card>
            <CardBody>
                <CardHeader>{author}</CardHeader>
                <CardTitle>{title}</CardTitle>
                <Link to={"/boards/" + id + "/detail"} className='btn btn-primary'>상세보기</Link>
            </CardBody>
        </Card>
    );
};

export default BookItem;