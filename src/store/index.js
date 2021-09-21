import journal from "../modules/daybook/store/journal";
import auth from "../modules/auth/store";

const { createStore } = require("vuex");



const store = createStore({

    modules: {
        auth,
        journal
    }
})



export default store