import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

Vue.use(Vuex);

const initial_tabs = (() => {
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
    addTab(state, tab_obj) {
      state.tabs.push(tab_obj);
      localStorage.setItem("tabs", JSON.stringify(state.tabs));
    },
    // closeTab(state, index) {
    //   state.tabs.splice(index, 1);
    //   localStorage.setItem("tabs", JSON.stringify(state.tabs));
    // },
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
    // closeTabAndRedirect({ state: { tabs } }, key) {
    //   const index = tabs.findIndex((tab) => tab.key === key);
    //   console.log("/" + tabs[index].key === router.history.current.path);
    //   console.log(tabs[index - 1]);
    //   if ("/" + tabs[index].key === router.history.current.path) {
    //     router.push({ path: "/" + tabs[index - 1].key }).then(() => {});
    //   }
    // },
  },
  modules: {},
});
