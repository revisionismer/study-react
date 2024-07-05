import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookItem from '../../components/book/BookItem';

import DefaultImg from '../../assets/img/auth-background.png';

import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

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

    const [currentPage, setCurrentPage] = useState({});

    const [totalPageCount, setTotalPageCount] = useState({});

    const navigate = useNavigate();

    // 2024-06-07 : 페이지 블록당 보여줄 페이지 번호 갯수
    const [limit, setLimit] = useState();

    // 2024-06-06 : 페이징처리 얼떨결에 됨....(상세 분석은 나중에)
    let start = (currentPage - 1) - (currentPage % limit) + 1;
    let end = currentPage - (currentPage % limit) + limit;

    console.log("start : " + start, "end : " + end);

    // 2024-06-11 : 화살표 말고 숫자 버튼 누를때 동작
    const pagination = document.querySelectorAll(".pagination li");

    pagination.forEach( (page) => {
        
        page.addEventListener('click', () => {

            pagination.forEach( (e) => {
                e.classList.remove('active');
            });

            page.classList.add('active');
        
        });

    });

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
                    if (!res.message === 'Network Error') {
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

                setData({ ...res.data.data });
                setCurrentPage(0);

                setLimit(5);
                setTotalPageCount(res.data.data.pageNumbers.length);


            }).catch(function (res) {
                console.log(res);

                if (!res.message === 'Network Error') {
                    if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                        // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                        alert(res.response.data.message);

                        // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                        deleteCookie('access_token');
                        navigate("/login");
                        return;
                    }

                } else {  // 2024-05-09 : 이곳만 남겨둘거라 else는 이쪽에만 선언
                    if (ACCESS_TOKEN !== null) {
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

    // 2024-05-17 : 페이징 완료
    async function movePage(e) {

        e.preventDefault();

        console.log(e.currentTarget.innerText);

        var page = e.currentTarget.innerText - 1;

        setCurrentPage(page);

        console.log("currentpage : " + page);

        var url = "/api/boards?page=" + page;

        await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
//                  'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            }
        ).then(function (res) {

            console.log(res);
            setBoards([...res.data.data.boards.content]);

            setData({ ...res.data.data });

            // 2024-05-16 : 여기서부터 다시

        }).catch(function (res) {
            console.log(res);

            if (!res.message === 'Network Error') {
                if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    alert(res.response.data.message);

                    // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                    deleteCookie('access_token');
                    navigate("/login");
                    return;
                }

            } else {  // 2024-05-09 : 이곳만 남겨둘거라 else는 이쪽에만 선언
                if (ACCESS_TOKEN !== null) {
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
        }
        )
    }

    async function movePrev(e) {

        // 2024-05-16 : 동작은 하는데 초반 defaultPage때문에 이전페이지 첫페이지로 이동하는 문제 해결해야함
        e.preventDefault();

        var page = currentPage - 1;

        if(page < 0) {
            return false;
        }

        setCurrentPage(page);

        // 2024-06-12 : 이전 페이지로 가기전에 원래 페이지 정보
        var oriPage = currentPage + 1;

        // 2024-06-11 : 이전 페이지 진행중(active)
        document.getElementById('page_' + oriPage).classList.remove('active');

        var url = "/api/boards?page=" + page;

        await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
//                  'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            }
        ).then(function (res) {

            console.log(res);
            setBoards([...res.data.data.boards.content]);

            setData({ ...res.data.data });

            document.getElementById('page_' + currentPage).classList.add('active');

        }).catch(function (res) {
            console.log(res);

            if (!res.message === 'Network Error') {
                if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    alert(res.response.data.message);

                    // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                    deleteCookie('access_token');
                    navigate("/login");
                    return;
                }

            } else {  // 2024-05-09 : 이곳만 남겨둘거라 else는 이쪽에만 선언
                if (ACCESS_TOKEN !== null) {
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

    async function moveNext(e) {

        e.preventDefault();

        var page = currentPage + 1;
     
        if(page >= totalPageCount) {
            return false;
        }

        setCurrentPage(page);

        // 2024-06-12 : 다음 페이지로 가기전에 원래 페이지에 붙어있는 active 제거
        document.getElementById('page_' + page).classList.remove('active');

        var url = "/api/boards?page=" + page;

        await axios.get(url,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
//                  'Authorization': 'Bearer ' + ACCESS_TOKEN
                }
            }
        ).then(function (res) {

            console.log(res);
            setBoards([...res.data.data.boards.content]);

            setData({ ...res.data.data });

            // 2024-06-12 : api 실행후에는 다음 페이지에 active가 되어 있어야 하므로 + 1을 한 번더 해준다.
            var nextPage = page + 1;

            document.getElementById('page_' + nextPage).classList.add('active');

        }).catch(function (res) {
            console.log(res);

            if (!res.message === 'Network Error') {
                if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    alert(res.response.data.message);

                    // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                    deleteCookie('access_token');
                    navigate("/login");
                    return;
                }

            } else {  // 2024-05-09 : 이곳만 남겨둘거라 else는 이쪽에만 선언
                if (ACCESS_TOKEN !== null) {
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

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // 2024-06-13 : debunce 적용 
    function debounce(func, delay) {
        let timer;

        return function() {
            const args = arguments;
            clearTimeout(timer);

            timer = setTimeout( () => {
                func.apply(this, args);
            }, delay);
        }
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
                                        <td><Link to={"/books/" + book.id + "/detail"}>{book.id}</Link></td>
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
            <div className='container' style={{ height: '300vh' }}>
                <div className='my_main_list'>
                    {boards.map((board, index) => {
                        return (
                            <div className={'my_main_item'} key={index}>
                                <Link className={'my_atag_none_' + index} to={"/boards/" + board.id + "/detail"}>
                                    <div className='my_main_item_thumnail'>
                                        <img style={{ width: '100%', height: '100%' }} src={board.thumnailImgFileName === null ? DefaultImg : '/thumnail/' + board.thumnailImgFileName} alt=''></img>
                                    </div>
                                    <div className='my_main_content my_p_sm_1'>
                                        <div className='my_main_item_title'>
                                            <h3>제목 : {board.title}</h3>
                                        </div>
                                        <div className='my_main_item_summary my_mb_sm_1 my_text_two_line'>
                                            내용 : {board.content}
                                        </div>
                                        <div className='my_main_item_date my_mb_sm_1'>
                                            날짜 : {board.updatedAt === null ? board.createdAt : board.updatedAt}
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
                            <Link className="my_atag_none my_mr_sm_1" id="main_prev">
                                <i className="fa-solid fa-angle-left"></i>
                            </Link>

                            <Link className="my_atag_none_1">
                                <div className="my_paging_number_box my_mr_sm_1_1">
                                    1
                                </div>
                            </Link>

                            <Link className="my_atag_none my_ml_sm_1">
                                <i className="fa-solid fa-angle-right"></i>
                            </Link>
                        </div>
                        :
                        <div className="my_paging d-flex justify-content-center align-items-center my_mb_lg_1">
                            {data.isPrev === true ?
                                <Link className="my_atag_none my_mr_sm_1" id="main_prev" onClick={debounce(movePrev, 10)}>
                                    <ChevronLeft></ChevronLeft>
                                </Link>
                                :
                                ''
                            }
                            <ul className='pagination' style={{ listStyle: "none", padding: "0", margin: "0" }}>
                                {data.pageNumbers?.slice(start, end).map((i) => (
                                    <li id={'page_' + i} className={ i === currentPage + 1 ? 'page active' : 'page'} key={i} onClick={movePage}>{i}</li>
                                ))}

                            </ul>
                            {data.isNext === true ?
                                <Link className="my_atag_none my_mr_sm_1" id="main_next" onClick={debounce(moveNext, 10)}>
                                    <ChevronRight></ChevronRight>
                                </Link>
                                :
                                ''
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default ListPage;