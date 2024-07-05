import React, { useEffect, useState } from 'react';

import '../../assets/css/auth.css';
import '../../assets/css/common.css';

import Avatar from '../../assets/img/avatar.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 2024-07-01 : 회원 정보 보기 기능 완료
const UserInfoPage = () => {

    var ACCESS_TOKEN = getCookie('access_token');

    const navigate = useNavigate();

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

    const [user, setUser] = useState({
        id : "",
        username : "",
        email : "",
        profileImageUrl : null,
        role : ""
    });

    useEffect(() => {

        const getUser = async () => {
            axios.get(`http://127.0.0.1:8080/api/users/s/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {
                console.log(res.data.data);
                setUser(res.data.data);
                    
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
        getUser();

    }, [ACCESS_TOKEN, navigate]);

    // 2024-07-02 : 여기까지
    function profileImageUpload() {
	
        console.log("프로필이미지 : " + ACCESS_TOKEN);

        var profileImgInput = document.getElementById("profile-img-input");

        // 3-2. 이미지 업로드 창 띄우기
        profileImgInput.click();

        // 3-3. 업로드창에 이벤트 리스너를 달아 업로드창에 변화가 있을때 실행
        profileImgInput.addEventListener('change', (e) => {
            let f = e.target.files[0];
        
            console.log(f);
            
            // 3-4. 이미지가 아닌 파일은 다시 등록하라고 알러트
            if(!f.type.match("image.*")) {
                alert("이미지를 등록해야 합니다.");
                return;
            }
		
            let formData = new FormData();
            formData.append('files', f);

            // 3-7. axios
            axios.put('/api/users/s/update/profileImage',
                // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
                formData,
                // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
                {
                    headers: {
                        'Authorization': 'Bearer ' + ACCESS_TOKEN,
                        "Content-Type" : "multipart/form-data"
                    }
                }
                ).then(function (res) {
                    console.log(res);
                    // 3-8. axois 안에 들어가야함
                    let reader = new FileReader();
                    reader.onload = (e) => {
                        document.getElementById("userProfileImage").setAttribute("src", e.target.result);
                        document.getElementById("dropdown_userImage").setAttribute("src", e.target.result);
                    }
    
                    reader.readAsDataURL(f);	

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
                }
            )

            
        });

    }

    function userInfoUpdate() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var convertPassword = document.getElementById('convertPassword').value;
        var convertPassword_chk = document.getElementById('convertPassword_chk').value;
        var email = document.getElementById('email').value;

        if(!password) {
            alert("빈칸일 수 없습니다.");
            document.getElementById('password').focus();
            return;
        } else if(!convertPassword) {
            alert("빈칸일 수 없습니다.");
            document.getElementById('convertPassword').focus();
            return;
        } else if(!convertPassword_chk) {
            alert("빈칸일 수 없습니다.");
            document.getElementById('convertPassword_chk').focus();
            return;
        }

        if(convertPassword === convertPassword_chk) {

            let formData = {
                username : username,
				password : password,
				convertPassword : convertPassword,
				email : email
			}

            axios.put(`/api/users/s/update`,
                // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
                formData,
                // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
                {
                    headers: {
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }).then(function (res) {
                    console.log(res);
                    
                    document.getElementById('password').value = "";
                    document.getElementById('convertPassword').value = "";
                    document.getElementById('convertPassword_chk').value = "";

                }).catch(function (res) {
                    console.log(res);

                    if(res.response.data == null) {
                        alert(res.response.message);
                        return;
                    } else {
                        /* 2023-10-03 : 일단 이렇게 해놓으면 예외처리는 작동하나 수정 요망 */
                        alert(res.response.data.message);	

                        document.getElementById('password').value = "";
                        document.getElementById('password').focus();
                        return;
                        
                    }
                    
                } 
            )


        } else {
            alert("변경할 비밀번호를 확인해주세요.");
            document.getElementById('convertPassword').value = "";
            document.getElementById('convertPassword_chk').value = "";

            return;
        }

    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (
        <>
            <div className="container">
                <div className="my_auth_box">
                    <div className="my_auth_form_box">
                        <div className="d-flex justify-content-center">
                            <form id="userProfileImageForm">
                                <input type="file" className="my_hidden" id="profile-img-input" name="profileImageFile" />
                            </form>
           
                            <img id="userProfileImage" name="userProfileImage" className="my_profile_rounded_img_btn_lg" src={user.profileImageUrl === null ? Avatar : "/userImg/" + user.profileImageUrl}  alt="" onClick={() => profileImageUpload()}/>       
                        </div>
                        <div className="my_error_box my_hidden"></div>
                        {/* 수정은 put 요청 fetch 사용해야함 */}
        
                        <form id="userUpdateForm">
                            <div>
                                <input id="userId" name="userId" type="hidden" value={user.id} />
                            </div>
                            <div>	
                                <input id="username" name="username" className="my_auth_form_box_input" type="text" placeholder="유저네임" maxLength="20" defaultValue={user.username} required/>
                            </div>
                            <div>	
                                <input id="password" name="password" className="my_auth_form_box_input" type="password" placeholder="현재 비밀번호" maxLength="20" required autoComplete='false'/>
                            </div>
                            <div>	
                                <input id="convertPassword" name="convertPassword" className="my_auth_form_box_input" type="password" placeholder="변경할 비밀번호" maxLength="20" required autoComplete='false' />
                            </div>
                            <div>	
                                <input id="convertPassword_chk" name="convertPassword_chk" className="my_auth_form_box_input" type="password" placeholder="비밀번호 확인" maxLength="20" required autoComplete='false' />
                            </div>
                            <div>	
                                <input id="email" name="email" className="my_auth_form_box_input" type="email" placeholder="이메일" maxLength="60" defaultValue={user.email} required />
                            </div>	
                        </form>
                        <button id="updateUserBtn" className="my_secondary_btn" onClick={() => userInfoUpdate()}>회원정보수정</button>
                    </div>
                </div>
                <br />
            </div>
        </>
    );
};

export default UserInfoPage;