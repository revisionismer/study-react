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
    const [data, setData] = useState({}); 
   

    const navigate = useNavigate();

    // 해당 js가 호출시 최초 한번 실행
    useEffect(() => {

        const getBooks = async () => {
            axios.get("http://127.0.0.1:8080/api/books/all")
                .then((res) => {

                    setBooks([...res.data.data]);
                    
                })
                .catch((res) => {
                    console.log("데이터 불러오기 실패");

                    // 2024-05-09 : 네트워크 연결이 안되어 있을때 API 호출시 예외 터지는거 처리
                    if(!res.message === 'Network Error') {
                        if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
       
                            alert(res.response.data.message);
                            deleteCookie('access_token');
                            navigate("/");
                            return;
                        }
                    } 
                }
            )
        }

        const getBoards = async () => {
            axios.get("http://127.0.0.1:8080/api/boards",
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
//                      'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res);
                setBoards([...res.data.data.boards.content]);   
                
                setData({...res.data.data});  
                
            }).catch(function (res) {
                console.log(res);

                if(!res.message === 'Network Error') {
                    if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                        // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                        alert(res.response.data.message);
                        
                        // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                        deleteCookie('access_token');
                        navigate("/login");
                        return;
                    } 
               
                } else {  // 2024-05-09 : 이곳만 남겨둘거라 else는 이쪽에만 선언
                    if(ACCESS_TOKEN !== null) {
                        alert(res.response.data.message);
                        deleteCookie('access_token');
                        navigate("/login");
                        return;
                    } else {
                        alert("Internal Server Error");
                        navigate("/login");
                        return;
                    }
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
                <div style={{height: '100vh'}}>
                    {/** 1-2. 데이터 뿌리는 방법 2 : component에 위임(2024-03-26) */}
                    {books.map((book, index) => {
                        return (<BookItem key={index} book={book}></BookItem>);
                    })}
                </div>
            </div>
            <p>게시글(메인)</p>
            <div className='container' style={{height: '500vh'}}>
                <div className='my_main_list'>
                    {boards.map( (board, index) => {
                        return (
                            <div className={'my_main_item'} key={index}>
                                <Link className={'my_atag_none_' + index}>
                                    <div className='my_main_item_thumnail'>
                                        <img style={{width: '100%', height: '100%'}}  src={board.thumnailImgFileName === null ? DefaultImg : '/thumnail/' +  board.thumnailImgFileName} alt=''></img>
                                    </div>
                                    <div className='my_main_content my_p_sm_1'>
                                        <div className='my_main_item_title'>
				                            <h3>제목 : {board.title}</h3>
			                            </div>
			                            <div className='my_main_item_summary my_mb_sm_1 my_text_two_line'>
				                            내용 : {board.content}
			                            </div>
			                            <div className='my_main_item_date my_mb_sm_1'>
				                            날짜 : {board.createdAt}
			                            </div>
                                    </div>
                                </Link>
                                <Link className='my_atag_none'>
                                    <div className='my_main_item_username'>
			                            <span>by {board.writer}</span>
			                            <b></b>
		                            </div>
                                </Link>
                                
                            </div>
                        );
                    })}
                </div>
                <div>
                    {data.isFirst === true ? 
                        <div className='my_paging d-flex justify-content-center align-items-center my_mb_lg_1'>
                            <Link class="my_atag_none my_mr_sm_1" id="main_prev">
								<i class="fa-solid fa-angle-left"></i>
							</Link>

							<Link class="my_atag_none_1">
								<div class="my_paging_number_box my_mr_sm_1_1">
									1
								</div>
							</Link>

							<Link class="my_atag_none my_ml_sm_1">
								<i class="fa-solid fa-angle-right"></i>
							</Link>
                        </div> 
                    : 
                        <div className="my_paging d-flex justify-content-center align-items-center my_mb_lg_1">
                            {data.isPrev === true ? 
                                <Link class="my_atag_none my_mr_sm_1" id="main_prev">
								    <i class="fa-solid fa-angle-left"></i>
							    </Link>
                            :
                                ''
                            }
                            {[...Array(data.pageNumbers)].map((data, index) => 
                                <div key={index}>
                                    <Link>{data}</Link>
                                </div>
                            )}
                        </div>
                    }    
                </div>
            </div>
        </>
    );
};

export default ListPage;