// 1-1. 액션
export const increase = (username) => ({
    type: "INCREMENT",
    payload: username
});
export const decrease = (username) => ({
    type: "DECREMENT",
    payload: username
});


// 1-2. 상태
const initState = {
    username: "",
    number: 1
}

// 1-3. reducer : 액션의 결과를 걸러주는 역할
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { number: state.number + 1, username: action.payload };  // tip : return 되면 그걸 호출한 쪽에서 무언가를 받는게 아니라 return 되는 순간 state가 변경되어 ui가 변경된다.
        case "DECREMENT":
            return { number: state.number - 1, username: action.payload };
        default:
            return state;
    }
}

export default reducer;