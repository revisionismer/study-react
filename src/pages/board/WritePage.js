import React, { useState, useEffect } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WritePage = (props) => {

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

    // 2024-03-27 : 여기까지
    function saveBook() {

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        if (!title) {
            alert("도서명을 입력해주세요");
            document.getElementById('title').focus();
            return false;
        }

        if (!author) {
            alert("도서의 저자를 입력해주세요.");
            document.getElementById('author').focus();
            return false;
        }

        var bookObject = {
            title: title,
            author: author
        }

        console.log(bookObject);

        axios.post('/api/books/s/save',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(bookObject),
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            }

        ).then(function (res) {
            console.log(res);

            navigate("/boards");

        }).catch(function (res) {
            console.log(res);

            if (res.response.status === 400 || res.response.status === 401) {
                alert(res.response.data.message);
                navigate("/login");
                return;
            }

        })

    }

    return (
        <div className='container'>
            <Form>
                <FormGroup id='formBasicTitle'>
                    <FormLabel>Title</FormLabel>
                    <FormControl type='text' id='title' name='title' placeholder='책의 제목을 입력해주세요.' />
                </FormGroup>
                <FormGroup id='formBasicAuthor'>
                    <FormLabel>Author</FormLabel>
                    <FormControl type='text' id='author' name='author' placeholder='책의 저자를 입력해주세요.' />
                </FormGroup>
            </Form>
            <div style={{ paddingTop: 10 }}>
                <Button type='button' id='bookSaveBtn' name='bookSaveBtn' variant='primary' style={{ marginRight: 10 }} onClick={() => saveBook()}>저장</Button>
                <Button type='button' id='cancelBtn' name='cancelBtn' variant='warning' onClick={() => navigate('/boards')}>취소</Button>
            </div>
        </div>
    );
};

export default WritePage;