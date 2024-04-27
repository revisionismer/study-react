import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import avatarImg from '../../assets/img/avatar.svg';

import { PencilSquare, Backspace } from 'react-bootstrap-icons'

import '../../assets/css/board.css';

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
    // 2024-04-24 : 여기서부터 다시
    function saveBoard() {
        // 2024-04-12 : 저장하기 전에 ACCESS_TOKEN을 다시 가져온다.(혹시 삭제되거나 할 수 있기 때문)
        ACCESS_TOKEN = getCookie('access_token');

        const title = document.getElementById('b_title').value;
        const content = document.getElementById('b_content').value;
        const thumnailImgFile = document.getElementById("thumnailFile").files;

        console.log(title + ", " + content);

        if (title.length === 0) {
            alert("제목을 입력해주세요.");
            document.getElementById('b_title').focus();
            return;
        }

        if (content.length === 0) {
            alert("내용을 입력해주세요.");
            document.getElementById('b_content').focus();
            return;
        }

        var boardObject = {
            'title': title,
            'content': content
        }

        var formData = new FormData();

        formData.append("board", JSON.stringify(boardObject));

        for (var i = 0; i < thumnailImgFile.length; i++) {

            if (thumnailImgFile[i].type === 'image/jpeg' || thumnailImgFile[i].type === 'image/jpg' || thumnailImgFile[i].type === 'image/png') {

                formData.append("files", thumnailImgFile[i]);
            } else {
                alert("이미지 파일을 등록해주세요.");
                document.getElementById("thumnailFile").value = "";
                return;
            }
        }

        console.log(formData);

        axios.post('/api/boards/s/write',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            formData,
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Authorization': 'Bearer ' + ACCESS_TOKEN,
                    "Content-Type": "multipart/form-data"
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
            } else {

                alert(res.response.data.error);
                deleteCookie('access_token');
                navigate("/login");

                return;

            }

        })


    }

    /**
     *         if(thumnailImgFile !== undefined) {

            console.log(thumnailImgFile.type);

            // 2024-04-23 : 이미지 파일 검증
            if(thumnailImgFile.type !== "image/jpg" & thumnailImgFile.type !== "image/jpeg" & thumnailImgFile.type !== "image/png") {
        
                alert("이미지 파일을 올려주세요.");
                document.getElementById("thumnailFile").value = "";
                return;
            }
        }

     * 
     */

    function deleteImgBtn() {
        document.getElementById("thumnailFile").value = "";
    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (
        <>
            <div id='book-write-wrapper'>
                <div className='book-write-container'>
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
            </div>
            <br /><br />
            <div id='board-write-wrapper'>
                <div className='board-write-container'>
                    <div className='board-write-box'>
                        <div className='board-write-title-box'>
                            <input type='text' className='board-write-title-input' id='b_title' name='b_title' placeholder='제목을 작성해주세요.' />
                        </div>
                        <div className='divider'></div>
                        <div className='board-write-content-box'>
                            <textarea id='b_content' name='b_content' className='board-write-content-textarea' placeholder='본문을 작성해주세요.' />
                            <div className='icon-button'>
                                {/** 2024-04-19 : 여기까지 */}
                                <div className='icon image-box-light-icon'>
                                    <PencilSquare style={{ cursor: "pointer" }} onClick={() => saveBoard()}></PencilSquare>
                                    <Backspace style={{ cursor: "pointer" }} onClick={() => navigate('/boards')}></Backspace>
                                </div>
                            </div>
                            <input type='file' accept='image/*' style={{ display: 'none' }} />
                        </div>
                        <div className='board-write-images-box'>
                            <div className='board-write-image-box'>
                                <img className='board-write-image' alt='' src=""></img>
                                <div id="thumnailImgArea">
                                    섬네일 사진 등록 : <input type="file" id="thumnailFile" name="thumnailFile" />
                                </div>

                                <div className='icon-button image-close' style={{ cursor: "pointer" }}>
                                    <div className='icon close-icon' id='cacelBtn' onClick={() => deleteImgBtn()}></div>
                                </div>
                            </div>

                        </div>

                    </div>


                </div>
            </div>


        </>
    );
};

export default WritePage;