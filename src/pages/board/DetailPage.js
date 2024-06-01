import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import DefaultImg from '../../assets/img/auth-background.png';

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

    const [board, setBoard] = useState({
        id: "",
        title: "",
        content: "",
        writer: "",
        pageOwner: "",
        deleteYn: 'N',
        originalImgFileName: null,
        thumnailImgFileName: null,
        hits: ""
    });

    // 2024-05-21 : board API로 수정 중
    useEffect(() => {

        const getBoard = async () => {
            axios.get(`http://127.0.0.1:8080/api/boards/s/${id}/detail`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {
                console.log(res.data.data);
                setBoard(res.data.data);

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
        getBoard();
    }, [id, ACCESS_TOKEN, navigate]);

    // 2024-05-24 : 여기서부터 다시
    function updateBoard() {
        const id = document.getElementById('boardId').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const writer = document.getElementById('writer').value;
        const hits = document.getElementById('hits').value;

        const thumnailImgFile = document.getElementById("thumnailFile").files;

        console.log(id, title, writer);

        var boardObject = {
            'id': id,
            'title': title,
            'content': content,
            'writer': writer,
            'hits': hits
        }

        console.log(boardObject);

        var formData = new FormData();

        formData.append("board", JSON.stringify(boardObject));

        for (var i = 0; i < thumnailImgFile.length; i++) {

            if (thumnailImgFile.length > 1) {
                alert("이미지 파일은 1개만 등록해주세요.");
                return false;
            }

            if (thumnailImgFile[i].type === 'image/jpeg' || thumnailImgFile[i].type === 'image/jpg' || thumnailImgFile[i].type === 'image/png') {

                formData.append("files", thumnailImgFile[i]);
            } else {
                alert("이미지 파일을 등록해주세요.");
                document.getElementById("thumnailFile").value = "";
                return;
            }
        }

        console.log(formData);

        axios.put(`/api/boards/s/${id}/update`,
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

    function changePicture() {
        const thumnailImgFile = document.getElementById("thumnailFile").files;

        if (thumnailImgFile && thumnailImgFile[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('thumnailImg').src = e.target.result;
            }

            reader.readAsDataURL(thumnailImgFile[0]);
            document.getElementById('thumnailImgName').innerHTML = thumnailImgFile[0].name;

        }
    }

    function deleteBoard() {
        const id = document.getElementById('boardId').value;

        console.log(id);

    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (

        <div className='container' style={{ height: '1500px' }}>
            <h1 style={{ textAlign: 'center' }}>게시글 상세보기 페이지</h1>
            <hr />

            <div style={{ display: 'flex', height: '1000px', flexDirection: 'column', alignItems: 'center' }}>

                <Form id='detailForm' style={{ display: 'flex', width: '500px', height: '650px', flexDirection: 'column' }}>
                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column>boardId</Form.Label>
                        <Col sm={10}>
                            <input type="text" placeholder="boardId" id='boardId' name="boardId" className="form-control" value={board.id} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm={2}>Title</Form.Label>
                        <Col sm={10}>
                            <input type="text" placeholder="title" id='title' name="title" className="form-control" defaultValue={board.title} />
                        </Col>
                    </Form.Group>
                    <Form.Group className='mb-4'>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <label style={{ paddingRight: '30px' }}>Content</label>
                            <textarea id='content' name='content' placeholder='내용을 입력해주세요.' defaultValue={board.content} rows={5} cols={80}></textarea>
                        </div>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm={2}>writer</Form.Label>
                        <Col sm={10}>
                            <input placeholder="writer" id='writer' name="writer" className="form-control" defaultValue={board.writer} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-4'>
                        <Form.Label column sm={2}>hits</Form.Label>
                        <Col sm={10}>
                            <input placeholder="hits" id='hits' name="hits" className="form-control" value={board.hits} readOnly />
                        </Col>
                    </Form.Group>
                    <div className='my_main_item_thumnail'>
                        <img id='thumnailImg' style={{ width: '100%', height: '100%' }} src={board.thumnailImgFileName === null ? DefaultImg : '/thumnail/' + board.thumnailImgFileName} alt=''></img>
                        <p id='thumnailImgName'>{board.originalImgFileName === null ? '기본 사진' : board.originalImgFileName}</p>
                        {board.pageOwner === true ?
                            <div id="thumnailImgArea">
                                섬네일 사진 등록 : <input type="file" id="thumnailFile" name="thumnailFile" onChange={() => changePicture(this)} />
                            </div>
                            : ''}
                    </div>
                </Form>
                <div id='btnArea' style={{ paddingTop: "40px" }}>
                    {board.pageOwner === true ? <Button type='button' id='modifyBtn' name='modifyBtn' variant='success' style={{ marginRight: '5px' }} onClick={() => updateBoard()}>수정</Button> : ''}
                    {' '}
                    {board.pageOwner === true ? <Button type='button' id='deleteBtn' name='deleteBtn' variant='danger' style={{ marginRight: '5px' }} onClick={() => deleteBoard()}>삭제</Button> : ''}
                    {' '}
                    <Button type='button' id='cancelBtn' name='cancelBtn' variant='warning' onClick={() => navigate('/boards')}>취소</Button>
                </div>
            </div>

        </div>


    );
};

export default DetailPage;