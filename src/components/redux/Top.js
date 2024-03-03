import React from 'react';
import { useSelector } from "react-redux";

const Top = (props) => {

    // const { number } = props;

    // react hooks
    const number = useSelector((store) => store.number);
    const username = useSelector((store) => store.username);

    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            <h1>Top</h1>
            번호 : {number}
            사용자 : {username}
        </div>
    );
};

export default Top;