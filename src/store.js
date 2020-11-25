import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name:'null',
        count: 0,
        num: 5,
        isAddToken:true
    },
    getters: {
        doneCount(state) {
            return state.count++;
        }
    },
    mutations: {
        changeisAddToken(state,val){
            state.isAddToken=val;
        },
        changeName(state,val){
            state.name=val;
        },
        addCountFnc(state) {
            state.count++;
        },
        reduceCountFnc(state) {
            state.count--;
        }
    },
    actions: {
        changeisAddToken(context, val){
            context.commit('changeisAddToken', val);
        },
        changeName(context, val) {
            context.commit('changeName', val);
        },
        addFunc(context, val) {
            context.commit('addCountFnc', val);
        },
        reduce(context) {
            context.commit('reduceCountFnc');
        }

    }
});
