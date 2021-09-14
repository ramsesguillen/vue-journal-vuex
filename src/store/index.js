import journal from "../modules/daybook/store/journal";

const { createStore } = require("vuex");



const store = createStore({

    modules: {
        journal
    }
})



export default store