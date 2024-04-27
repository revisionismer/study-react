import React from 'react';

import '../../../assets/css/footer.css';

const Footer = (props) => {
    return (
        <div className="my_footer">
            <div className="my_footer_left_menu">
                <div className="my_text_menu_title">Tistory</div>
                <div className="my_text_menu_body">티스토리는 마음을 담아 만듭니다.</div>
            </div>
            <div className="my_footer_right_menu">
                <div className="my_footer_right_menu_item">
                    <div className="my_text_menu_subtitle">메뉴가 궁금할 땐</div>
                    <div className="my_text_menu_body">스킨</div>
                    <div className="my_text_menu_body">포럼</div>
                    <div className="my_text_menu_body">스토리</div>
                </div>
                <div className="my_footer_right_menu_item">
                    <div className="my_text_menu_subtitle">사용하다 궁금할 땐</div>
                    <div className="my_text_menu_body">오픈 API</div>
                    <div className="my_text_menu_body">스킨가이드</div>
                    <div className="my_text_menu_body">고객센터</div>
                </div>
                <div className="my_footer_right_menu_item">
                    <div className="my_text_menu_subtitle">정책이 궁금할 땐</div>
                    <div className="my_text_menu_body">티스토리 개인정보처리방침</div>
                    <div className="my_text_menu_body">청소년보호정책</div>
                    <div className="my_text_menu_body">오픈API 이용약관</div>
                    <div className="my_text_menu_body">Email수집 거부정책</div>
                </div>
                <div className="my_footer_right_menu_item">
                    <div className="my_text_menu_subtitle">도움이 필요할 땐</div>
                    <div className="my_text_menu_body">권리침해신고</div>
                    <div className="my_text_menu_body">상거래 피해 구제신청</div>
                </div>
            </div>
        </div>

    );
};

export default Footer;