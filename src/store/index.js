import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const initial_tabs = (() => {
  if (
    localStorage.getItem("tabs") !== undefined ||
    localStorage.getItem("tabs").length < 2
  ) {
    return [
      { name: "Заявки", key: "" },
      { name: "Счета", key: "accounts" },
    ];
  } else return localStorage.getItem("tabs");
})();

export default new Vuex.Store({
  state: {
    tabs: initial_tabs,
    cards: [],
    local_cards: [],
    request_page_info: {},
  },
  getters: {
    getRequestCards({ local_cards, cards }) {
      const IDs = [];
      return local_cards.concat(cards).filter(({ id }) => {
        const flag = IDs.includes(id);
        if (!flag) {
          IDs.push(id);
          return true;
        } else return false;
      });
    },
  },
  mutations: {
    setRequestCards(state, cards_obj) {
      state.cards = cards_obj;
    },
    setRequestPage(state, page_obj) {
      state.request_page_info = page_obj;
    },
  },
  actions: {
    getRequestCards({ commit }) {
      fetch("https://my-json-server.typicode.com/plushevy/demo/list").then(
        (res) => {
          if (res.ok) res.json().then((res) => commit("setRequestCards", res));
        }
      );
    },
    getRequestInfo({ state: { local_cards }, commit }, id) {
      const index = local_cards.findIndex((card) => card.id === id);
      if (index === -1) {
        fetch(
          "https://my-json-server.typicode.com/plushevy/demo/orders/" + id
        ).then((res) => {
          if (res.ok) res.json().then((res) => commit("setRequestPage", res));
        });
      } else commit("setRequestPage", local_cards[index]);
    },
  },
  modules: {},
});
