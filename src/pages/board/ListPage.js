import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookItem from '../../components/book/BookItem';

const TableArea = styled.div`
    width: 500px;
`;

const ListPage = () => {

    // 2024-03-14 : 여기까지.
    const [books, setBooks] = useState([]);

    const navigate = useNavigate();

    // 해당 js가 호출시 최초 한번 실행
    useEffect(() => {

        const getBooks = async () => {
            axios.get("http://127.0.0.1:8080/api/books/all")
                .then((res) => {

                    console.log(res);

                    setBooks([...res.data.data]);

                })
                .catch((res) => {
                    console.log("데이터 불러오기 실패");

                    if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
       
                        alert(res.response.data.message);
                        
                        navigate("/");
                        return;
                    } 
                }
            )
        }
        getBooks();

    }, [navigate]);

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
                <div style={{height: '1000vh'}}>
                    {/** 1-2. 데이터 뿌리는 방법 2 : component에 위임(2024-03-26) */}
                    {books.map((book, index) => {
                        return (<BookItem key={index} book={book}></BookItem>);
                    })}
                </div>
            </div>
        </>
    );
};

export default ListPage;