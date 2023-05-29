 const reducer = (state,action) => {

    if(action.type == "User_Update")
    {
        return {
            ...state,
            name:action.payload.name,
            email:action.payload.email
        };
    }

    return state;
}

export default reducer;