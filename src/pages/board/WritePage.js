import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import avatarImg from '../../aseets/img/avatar.svg';

import { PencilSquare } from 'react-bootstrap-icons'

import '../../aseets/css/board.css';

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
        // 2024-04-12 : 저장하기 전에 ACCESS_TOKEN을 다시 가져온다.(혹시 삭제되거나 할 수 있기 때문)
        ACCESS_TOKEN = getCookie('access_token');

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

            if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                alert(res.response.data.message);

                // 2024-04-12 : 403일때는 쿠키가 삭제가 안되어 클라이언트 단에서 한 번더 삭제 진행
                deleteCookie('access_token');
                
                navigate("/login");
                return;
            }

        })

    }

    function saveBoard() {
         // 2024-04-12 : 저장하기 전에 ACCESS_TOKEN을 다시 가져온다.(혹시 삭제되거나 할 수 있기 때문)
         ACCESS_TOKEN = getCookie('access_token');

         const title = document.getElementById('title').value;
         const content = document.getElementById('content').value;

         console.log(title + ", " + content);
    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    /**
     *          <Form>
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
     * 
     */

    return (
        <div id='board-write-wrapper'>
            <div className='board-write-container'>
                <div className='board-write-box'>
                    <div className='board-write-title-box'>
                        <input type='text' className='board-write-title-input' id='title' name='title' placeholder='제목을 작성해주세요.' />
                    </div>
                    <div className='divider'></div>
                    <div className='board-write-content-box'>
                        <textarea id='content' name='content' className='board-write-content-textarea' placeholder='본문을 작성해주세요.'/>
                        <div className='icon-button'>
                            {/** 2024-04-19 : 여기까지 */}
                            <div className='icon image-box-light-icon'><PencilSquare onClick={ () => saveBoard()}></PencilSquare></div>
                        </div>
                        <input type='file' accept='image/*' style={{ display: 'none'}} />
                    </div>
                    <div className='board-write-images-box'>
                        <div className='board-write-image-box'>
                            <img className='board-write-image' alt='' src={avatarImg}></img>
        
                            <div className='icon-button image-close'>
                                <div className='icon close-icon' onClick={ () => alert("하세요")}></div>
                            </div>
                        </div>
                        
                    </div>

                </div>
                
               
            </div>
        </div>
    );
};

export default WritePage;