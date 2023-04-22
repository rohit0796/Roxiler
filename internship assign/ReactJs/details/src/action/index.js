export const change = (id, tid, title) => {
    return {
        type: "CHANGE",
        payload: {
            id,
            tid,
            title
        }
    }
}
