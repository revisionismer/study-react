import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

// 2024-03-28 : 토큰이 만료되었을때 처리해줘야한다.
const DetailPage = (props) => {

    var ACCESS_TOKEN = getCookie('access_token');

    function getCookie(key) {

        let result = null;
        let cookie = document.cookie.split(';');

        cookie.some(function (item) {
            item = item.replace(' ', '');

            let dic = item.split('=');

            if (key === dic[0]) {
                result = dic[1];
                return true;
            }
            return false;
        });
        return result;
    }

    const navigate = useNavigate();

    const { id } = useParams();

    const [book, setBook] = useState({
        id: "",
        title: "",
        author: "",
        visitCnt: ""
    });

    useEffect(() => {

        const getBook = async () => {
            axios.get(`http://127.0.0.1:8080/api/books/s/${id}/detail`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res.data.data);
                setBook(res.data.data);

            }).catch(function (res) {
                console.log(res);
                if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    alert(res.response.data.message);
                    
                    // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                    deleteCookie('access_token');
                    navigate("/login");
                    return;
                } 
            })

        }

        // useEffect 마지막에는 함수 안에서 변동되는 값들을 넣어준다.(변경감지)
        getBook();
    }, [id, ACCESS_TOKEN, navigate]);

    // 2024-04-01 : 여기까지
    function updateBook() {
        const id = document.getElementById('bookId').value;
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        console.log(id, title, author);

        var bookObject = {
            title: title,
            author: author
        }

        console.log(bookObject);

        axios.put(`http://127.0.0.1:8080/api/books/s/${id}/update`,
            JSON.stringify(bookObject),
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            }
        ).then(function (res) {

            console.log(res.data.data);
            navigate(`/boards/${id}/detail`);

        }).catch(function (res) {
            console.log(res);
            if (res.response.status === 400) {
                alert(res.response.data.message);
                return;
            }

        })

    }

    function deleteBook() {
        const id = document.getElementById('bookId').value;

        console.log(id);

        axios.delete(`http://127.0.0.1:8080/api/books/s/${id}/delete`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            }
        ).then(function (res) {

            console.log(res.data.data);
            navigate(`/boards`);

        }).catch(function (res) {
            console.log(res);
            if (res.response.status === 400) {
                alert(res.response.data.message);
                return;
            } 
        })

    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // 2024-03-31 : detailPage 꾸미기 완료.
    return (

        <div className='container'>
            <h1>게시글 상세보기 페이지</h1>
            <hr />
            <div style={{ width: "500px" }}>

                <Form id='detailForm'>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={2}>bookId</Form.Label>
                        <Col sm={10}>
                            <input type="text" placeholder="bookId" id='bookId' name="bookId" className="form-control" value={book.id} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={2}>Title</Form.Label>
                        <Col sm={10}>
                            <input type="text" placeholder="title" id='title' name="title" className="form-control" defaultValue={book.title} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={2}>author</Form.Label>
                        <Col sm={10}>
                            <input placeholder="author" id='author' name="author" className="form-control" defaultValue={book.author} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label column sm={2}>visitCnt</Form.Label>
                        <Col sm={10}>
                            <input placeholder="visitCnt" id='visitCnt' name="visitCnt" className="form-control" value={book.visitCnt} readOnly />
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            <div id='btnArea' style={{ paddingTop: "10px" }}>
                <Button type='button' id='modifyBtn' name='modifyBtn' variant='success' onClick={() => updateBook()}>수정</Button>
                {' '}
                <Button type='button' id='deleteBtn' name='deleteBtn' variant='danger' onClick={() => deleteBook()}>삭제</Button>
                {' '}
                <Button type='button' id='cancelBtn' name='cancelBtn' variant='warning' onClick={() => navigate('/boards')}>취소</Button>
            </div>
        </div>


    );
};

export default DetailPage;