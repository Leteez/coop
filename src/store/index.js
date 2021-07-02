import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	 token : false,
	 member : false,
   members : [],
 },

 mutations: {
	 setToken(state,token){
     state.token = token;
   },
	setMember(state,member){
    state.member = member;
  },
  setMembers(state,members){
    state.members = members;
  },
  setConversations(state,conversations){
    state.conversations = conversations;
  },
	logout(state) {
    state.member=false;
    state.token=false;
  },
},
getters: {
  getMember(state) {
    let fonction = (member_id) => {
      return state.members.find((member) =>{
        return member.id == member_id;
      })
    }
    return fonction;
  }
},
actions: {
},
modules: {
},
plugins: [vuexLocal.plugin]
})
