export const repairNotesCreators = {
    saveNote: note => ({
        type: "repair-notes save",
        payload: note
    }),
    removeNote: id => ({
        type: "repair-notes remove",
        payload: id
    })
};