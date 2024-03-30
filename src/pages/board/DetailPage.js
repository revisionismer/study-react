import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

// 2024-03-28 : 토큰이 만료되었을때 처리해줘여한다.
const DetailPage = () => {

    var ACCESS_TOKEN = getCookie('access_token');

    function getCookie(key) {

        let result = null;
        let cookie = document.cookie.split(';');

        cookie.some( function(item) {
            item = item.replace(' ', '');

            let dic = item.split('=');

			if(key === dic[0]) {
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
        id : "",
        title: "",
        author: ""
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

            })
            .catch(function (res) {
                console.log(res);
                if (res.response.status === 401) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    
                    alert(res.response.data.message);
                    navigate("/login");
                    return;
                }
        
            })
            
        }

        // useEffect 마지막에는 함수 안에서 변동되는 값들을 넣어준다.(변경감지)
        getBook();
    }, [id, ACCESS_TOKEN, navigate]);
  
    return (

        <div className='container'>
            <h1>게시글 상세보기 페이지</h1>
            <hr/>
            <h1>{book.id}</h1>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <Button type='button' id='cancelBtn' name='cancelBtn' variant='warning' onClick={() => navigate('/boards')}>취소</Button>
        </div>
    );
};
        
export default DetailPage;