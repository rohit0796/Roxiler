const user={
    id:0,
    tid:0,
    title:''
};
const changeId=(state=user,action)=>{
    switch(action.type){
        case "CHANGE": return action.payload;
        default: return state;
    }
}

export default changeId;