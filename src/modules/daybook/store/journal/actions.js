

// export const myAction = async ({ commit }) => {

import journalApi from "@/api/journalApi"

// }



export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json')
    const entries = []

    if ( data ) {
        for (const id of Object.keys( data ) ) {
            entries.push({
                id,
                ...data[id]
            })
        }
    }

    commit('setEntries', entries)
}


export const updateEntries = async ({ commit }, entry ) => {

    const { date, picture, text } = entry
    await journalApi.put(`/entries/${entry.id}.json`, {date, picture, text })
    // console.log(resp)

    commit('updateEntry', {...entry} )
}


export const addEntry = async ({ commit }, entry ) => {
    const { date, text, picture } = entry

    try {
        const { data } = await journalApi.post(`/entries.json`, {date,text, picture })
        const newEntry = {
            date, text, id: data?.name
        }
        commit('addEntry', newEntry )
        return data?.name
    } catch (error) {
        console.log( error )
    }
}


export const deleteEntry = async ({ commit }, id ) => {
    try {
        console.log( id );
        await journalApi.delete(`/entries/${id}.json`)
        commit('deleteEntry', id )
    } catch (error) {
        console.log( error )
    }
}



