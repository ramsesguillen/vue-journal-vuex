

// export const myAction = ( state ) => {

// }



export const setEntries = ( state, entries ) => {
    state.entries = [...state.entries, ...entries ]
    state.isLoading = false
}



export const updateEntry = ( state, entryUpadted ) => {
    state.entries = state.entries.map( entry => entry.id === entryUpadted.id ? entryUpadted : entry )
}


export const addEntry = ( state, entry ) => {
    state.entries = [ entry, ...state.entries ]
}

export const deleteEntry = ( state, id ) => {
    state.entries = state.entries.filter( entry => entry.id !== id )
}

