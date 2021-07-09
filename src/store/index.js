import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

const initial_tabs = () => {
  const current_tabs = JSON.parse(localStorage.getItem("tabs"));
  if (current_tabs == null || current_tabs?.length < 2) {
    localStorage.clear();
    localStorage.setItem(
      "tabs",
      JSON.stringify([
        { name: "Заявки", key: "" },
        { name: "Счета", key: "accounts" },
      ])
    );
    return [
      { name: "Заявки", key: "" },
      { name: "Счета", key: "accounts" },
    ];
  } else return current_tabs;
};

export default new Vuex.Store({
  state: {
    tabs: initial_tabs(),
    cards: [],
    local_cards: [],
    request_page_info: {},
    account_cards: [],
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
    getNewNum({ local_cards, cards }) {
      const num_arr = [...cards, ...local_cards].map((card) => card.num);
      return Math.max(...num_arr) + 1;
    },
    getNewLocalId({ local_cards }) {
      return "local" + (local_cards.length + 1);
    },
  },
  mutations: {
    setRequestCards(state, cards_obj) {
      state.cards = cards_obj;
    },
    setRequestPage(state, page_obj) {
      state.request_page_info = page_obj;
    },
    addTab(state, tab_obj) {
      state.tabs.push(tab_obj);
      localStorage.setItem(
        "tabs",
        JSON.stringify(state.tabs.filter((tab) => tab.temp !== true))
      );
    },
    closeTab(state, index) {
      state.tabs.splice(index, 1);
      localStorage.setItem(
        "tabs",
        JSON.stringify(state.tabs.filter((tab) => tab.temp !== true))
      );
    },
    editCard(state, obj) {
      const index = state.local_cards.findIndex((card) => card.id === obj.id);
      if (index === -1) state.local_cards.push(obj);
      else state.local_cards[index] = obj;
    },
    setAccountCards(state, obj) {
      state.account_cards = obj;
    },
  },
  actions: {
    getRequestCards({ commit }) {
      return new Promise((resolve, reject) => {
        fetch("https://my-json-server.typicode.com/plushevy/demo/list").then(
          (res) => {
            if (res.ok) {
              res.json().then((res) => {
                commit("setRequestCards", res);
                resolve();
              });
            } else reject();
          }
        );
      });
    },
    getRequestInfo({ state: { local_cards }, commit }, id) {
      return new Promise((resolve, reject) => {
        const index = local_cards.findIndex((card) => card.id === id);
        if (index === -1) {
          fetch(
            "https://my-json-server.typicode.com/plushevy/demo/orders/" + id
          ).then((res) => {
            if (res.ok) {
              res.json().then((res) => {
                commit("setRequestPage", res);
                resolve();
              });
            } else reject();
          });
        } else {
          commit("setRequestPage", local_cards[index]);
          resolve();
        }
      });
    },
    closeTabAndRedirect({ state: { tabs }, commit }, key) {
      const index = tabs.findIndex((tab) => tab.key === key);
      if ("/" + tabs[index].key === router.history.current.path) {
        router.push({ path: "/" + tabs[index - 1].key }).then(() => {
          commit("closeTab", index);
        });
      } else commit("closeTab", index);
    },
    createNewRequest({ commit }, card_obj) {
      return new Promise((resolve) => {
        commit("editCard", card_obj);
        resolve();
      });
    },
    getAccountCards({ commit }) {
      return new Promise((resolve, reject) => {
        fetch(
          "https://my-json-server.typicode.com/plushevy/demo/meetings"
        ).then((res) => {
          if (res.ok)
            res.json().then((res_obj) => {
              commit("setAccountCards", res_obj);
              resolve();
            });
          else reject();
        });
      });
    },
  },
  modules: {},
});
