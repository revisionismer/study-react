import React from 'react';
import { useDispatch } from 'react-redux';
import { decrease, increase } from '../../store/testStore';

const Bottom = (props) => {

    //  const { addNumber } = props;
    const dispatcher = useDispatch();

    return (
        <div style={{ border: "1px solid black", padding: "10px" }}>
            <h1>Bottom</h1>
            {/** <button onClick={addNumber}>증가</button>   */}
            <button onClick={() => dispatcher(increase("ssar"))}>증가</button>
            <button onClick={() => dispatcher(decrease("cos"))}>감소</button>
        </div>
    );
};

export default Bottom;