import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TableArea = styled.div`
    width: 500px;
    height: 300px;

`;

const ListPage = () => {

    // 2024-03-14 : 여기까지.
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
    
        const getBooks = async () => {
            axios.get("http://127.0.0.1:8080/api/books/all")
            .then( (res) => {
               
                console.log(res);
                
                setBooks([...res.data.data]);
                   
            })
            .catch( () => {
                console.log("데이터 불러오기 실패");
            })
        }
        
        getBooks();
    }, []);

    return (
        <>
            리스트 페이지
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <TableArea>
                <table className='table table-secondary table-striped'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>제목</th>
                            <th>작성자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map( (book, index) => {
                            return (
                            // Tip : 2개 이상의 태그를 return 할시에는 <></>로 감싸줘야 된다.
                                <tr key={index}>
                                    <td><Link to={"/boards/" + book.id}>{book.id}</Link></td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableArea>
            </div>
        </>
    );
};

export default ListPage;