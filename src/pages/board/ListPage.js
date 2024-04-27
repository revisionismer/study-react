import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookItem from '../../components/book/BookItem';

import DefaultImg from '../../assets/img/auth-background.png';

const TableArea = styled.div`
    width: 500px;
`;

const ListPage = () => {

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

    // 2024-03-14 : 여기까지.
    const [books, setBooks] = useState([]);
    const [boards, setBoards] = useState([]);

    const navigate = useNavigate();

    // 해당 js가 호출시 최초 한번 실행
    useEffect(() => {

        const getBooks = async () => {
            axios.get("http://127.0.0.1:8080/api/books/all",
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }
            ).then((res) => {

                console.log(res);

                setBooks([...res.data.data]);

            }).catch((res) => {
                console.log("데이터 불러오기 실패");

                if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {

                    alert(res.response.data.message);

                    navigate("/");
                    return;
                }
            }
            )
        }

        const getBoards = async () => {
            axios.get("http://127.0.0.1:8080/api/boards",
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }
            ).then(function (res) {

                console.log(res);
                setBoards([...res.data.data.boards.content]);

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

        getBooks();
        getBoards();


    }, [navigate, ACCESS_TOKEN]);

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (
        <>
            리스트 페이지
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TableArea>
                    <table className='table table-secondary table-striped'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/** 1-1. 데이터 뿌리는 방법 1 : 직접 */}
                            {books.map((book, index) => {
                                return (
                                    // Tip : 2개 이상의 태그를 return 할시에는 <></>로 감싸줘야 된다.
                                    <tr key={index}>
                                        <td><Link to={"/boards/" + book.id + "/detail"}>{book.id}</Link></td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.visitCnt}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </TableArea>
            </div>
            <p>책 리스트</p>
            <div className='container'>
                <div style={{ height: '100vh' }}>
                    {/** 1-2. 데이터 뿌리는 방법 2 : component에 위임(2024-03-26) */}
                    {books.map((book, index) => {
                        return (<BookItem key={index} book={book}></BookItem>);
                    })}
                </div>
            </div>
            <p>게시글(메인)</p>
            <div className='container'>
                <div style={{ height: '200vh' }}>
                    {boards.map((board, index) => {
                        return (
                            <div key={index}>
                                <img style={{ width: '50px', height: '50px' }} src={board.thumnailImgFileName === null ? DefaultImg : '/thumnail/' + board.thumnailImgFileName} alt=''></img>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ListPage;