

// export const myGetter = ( state ) => {
    // return state
// }


export const getEntriesByTerm = ( state ) => ( term = '') => {
    if ( term.trim().length === 0 ) return state.entries

    return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLowerCase() ) )
}


export const getEntriesById = ( state ) => ( id = '' ) => {
    const entry = state.entries.find( entry => id === entry.id )

    if ( !entry ) return

    return { ...entry }
}


