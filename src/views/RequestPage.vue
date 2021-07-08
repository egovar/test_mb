<template>
  <v-container class="request-page">
    <form @submit.prevent="">
      <h2 class="request-page__title">№{{ request_data.num }}</h2>
      <fieldset class="request-page__fieldset">
        <label for="client_name">Имя клиента:</label>
        <input
          type="text"
          id="client_name"
          :value="request_data.person_fullname"
        />

        <label for="client_phone">Телефонный номер:</label>
        <input
          type="text"
          id="client_phone"
          :value="request_data.person_phone"
        />

        <label for="client_mail">Адрес электронной почты:</label>
        <input
          type="text"
          id="client_mail"
          :value="request_data.person_email"
        />

        <label for="company_name">Название компании:</label>
        <input
          type="text"
          id="company_name"
          :value="request_data.company_name"
        />

        <label for="company_type">Организационно-правовая форма:</label>
        <input
          type="text"
          id="company_type"
          :value="request_data.company_type"
        />

        <label for="inn">ИНН:</label>
        <input type="text" id="inn" :value="request_data.inn" />

        <label for="product">Продукт:</label>
        <input
          type="text"
          id="product"
          :value="'stg' in request_data ? request_data.stg[0] || ' ' : ' '"
        />

        <label for="state">Cтатус заявки:</label>
        <select id="state" :value="request_data.state">
          <option value="init">В работе</option>
          <option value="fin">Успешно завершена</option>
          <option value="err">Отменена</option>
        </select>

        <h3>Дополнительная информация:</h3>
        <div><!--Нужен для правильного рендера сетки--></div>

        <label for="partner">Партнер:</label>
        <input type="text" id="partner" :value="partner_name" />
        <label for="partner_inn">ИНН партнера:</label>
        <input type="text" id="partner_inn" :value="partner_inn" />
        <label for="crm">Источник заявки:</label>
        <input type="text" id="crm" :value="crm" />
      </fieldset>
    </form>
    Заявка принята: {{ add_time }}, последнее обновление: {{ last_upd_time }}
  </v-container>
</template>

<script>
import df from "dateformat";
export default {
  name: "RequestPage",
  props: ["id"],
  mounted() {
    this.$store.commit("setRequestPage", {});
    this.$store.dispatch("getRequestInfo", this.id);
    const index = this.$store.state.tabs.findIndex(
      (tab) => tab.key === "requests/" + this.id
    );
    if (index === -1)
      this.$store.commit("addTab", {
        name: "auf",
        key: "requests/" + this.id,
      });
  },
  computed: {
    request_data() {
      return this.$store.state.request_page_info;
    },
    partner_name() {
      return this.request_data?.extra?.partner?.client_name || "";
    },
    partner_inn() {
      return this.request_data?.extra?.partner?.inn || "";
    },
    crm() {
      return this.request_data?.extra?.crm_source_type;
    },
    add_time() {
      return df(Date.parse(this.request_data.dadd), "dd.mm.yyyy - hh:mm");
    },
    last_upd_time() {
      return df(Date.parse(this.request_data.lastUpd), "dd.mm.yyyy - hh:mm");
    },
  },
};
</script>

<style lang="scss" scoped>
.request-page {
  &__title {
    text-align: right;
  }
  &__fieldset {
    border: none;
    display: grid;
    grid-template-columns: 25% 75%;
  }
}
</style>
