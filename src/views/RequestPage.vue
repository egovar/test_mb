<template>
  <v-container class="request-page">
    <v-btn
      fab
      @click="editCard"
      class="request-page__edit-btn"
      color="rgb(32, 66, 171)"
      dark
    >
      <v-icon v-if="fieldset_disabled">mdi-pencil</v-icon>
      <v-icon v-else>mdi-content-save</v-icon>
    </v-btn>
    <form @submit.prevent v-if="is_loaded">
      <h2 class="request-page__title">№{{ request_data.num }}</h2>
      <fieldset class="request-page__fieldset" :disabled="fieldset_disabled">
        <label class="request-page__label" for="client_name"
          >Имя клиента:</label
        >
        <input
          :placeholder="placeholder"
          v-model="fullname"
          type="text"
          class="request-page__input"
          id="client_name"
        />

        <label class="request-page__label" for="client_phone"
          >Телефонный номер:</label
        >
        <input
          :placeholder="placeholder"
          v-model="phone"
          type="text"
          class="request-page__input"
          id="client_phone"
        />

        <label class="request-page__label" for="client_mail"
          >Адрес электронной почты:</label
        >
        <input
          :placeholder="placeholder"
          v-model="email"
          type="text"
          class="request-page__input"
          id="client_mail"
        />

        <label class="request-page__label" for="company_name"
          >Название компании:</label
        >
        <input
          :placeholder="placeholder"
          v-model="company_name"
          type="text"
          class="request-page__input"
          id="company_name"
        />

        <label class="request-page__label" for="company_type"
          >Организационно-правовая форма:</label
        >
        <input
          :placeholder="placeholder"
          v-model="company_type"
          type="text"
          class="request-page__input"
          id="company_type"
        />

        <label class="request-page__label" for="inn">ИНН:</label>
        <input
          :placeholder="placeholder"
          v-model="inn"
          type="text"
          class="request-page__input"
          id="inn"
        />

        <label class="request-page__label" for="product">Продукт:</label>
        <input
          :placeholder="placeholder"
          v-model="product"
          type="text"
          class="request-page__input"
          id="product"
        />

        <label class="request-page__label" for="state">Cтатус заявки:</label>
        <select
          :class="'request-page__input_' + request_state"
          v-model="request_state"
          class="request-page__input request-page__input_select"
          id="state"
        >
          <option value="init">В работе</option>
          <option value="fin">Успешно завершена</option>
          <option value="err">Отменена</option>
        </select>

        <h3 class="request-page__subtitle">Дополнительная информация</h3>

        <label class="request-page__label" for="partner">Партнер:</label>
        <input
          :placeholder="placeholder"
          v-model="partner_name"
          type="text"
          class="request-page__input"
          id="partner"
        />
        <label class="request-page__label" for="partner_inn"
          >ИНН партнера:</label
        >
        <input
          :placeholder="placeholder"
          v-model="partner_inn"
          type="text"
          class="request-page__input"
          id="partner_inn"
        />
        <label class="request-page__label" for="crm">Источник заявки:</label>
        <input
          :placeholder="placeholder"
          v-model="crm"
          type="text"
          class="request-page__input"
          id="crm"
        />
      </fieldset>
      <span class="request-page__time">
        Заявка принята: {{ add_time }}, последнее обновление:
        {{ last_upd_time }}
      </span>
    </form>
    <loading-placeholders v-else></loading-placeholders>
  </v-container>
</template>

<script>
import df from "dateformat";
import Loaders from "@/components/loading-placeholders";
export default {
  name: "RequestPage",
  props: ["id"],
  data() {
    return {
      is_loaded: false,
      fieldset_disabled: true,
      request_data: this.$store.state.request_page_info,
    };
  },
  computed: {
    placeholder() {
      return this.fieldset_disabled ? "Не указано" : "Введите значение";
    },
    fullname: {
      get() {
        return this.request_data.person_fullname;
      },
      set(newVal) {
        this.request_data.person_fullname = newVal;
      },
    },
    phone: {
      get() {
        return this.request_data.person_phone;
      },
      set(newVal) {
        this.request_data.person_phone = newVal;
      },
    },
    email: {
      get() {
        return this.request_data.person_email;
      },
      set(newVal) {
        this.request_data.person_email = newVal;
      },
    },
    company_name: {
      get() {
        return this.request_data.company_name;
      },
      set(newVal) {
        this.request_data.company_name = newVal;
      },
    },
    company_type: {
      get() {
        return this.request_data.company_type;
      },
      set(newVal) {
        this.request_data.company_type = newVal;
      },
    },
    inn: {
      get() {
        return this.request_data.inn;
      },
      set(newVal) {
        this.request_data.inn = newVal;
      },
    },
    product: {
      get() {
        return "stg" in this.request_data ? this.request_data.stg[0] || "" : "";
      },
      set(newVal) {
        this.request_data.stg[0] = newVal;
      },
    },
    request_state: {
      get() {
        return this.request_data.state;
      },
      set(newVal) {
        this.request_data.state = newVal;
      },
    },
    partner_name: {
      get() {
        return this.request_data?.extra?.partner?.client_name || "";
      },
      set(newVal) {
        this.request_data.extra.partner.client_name = newVal;
      },
    },
    partner_inn: {
      get() {
        return this.request_data?.extra?.partner?.inn || "";
      },
      set(newVal) {
        this.request_data.extra.partner.inn = newVal;
      },
    },
    crm: {
      get() {
        return this.request_data?.extra?.crm_source_type || "";
      },
      set(newVal) {
        this.request_data.extra.crm_source_type = newVal;
      },
    },
    add_time() {
      return df(Date.parse(this.request_data.dadd), "dd.mm.yyyy - HH:MM");
    },
    last_upd_time() {
      return df(Date.parse(this.request_data.lastUpd), "dd.mm.yyyy - HH:MM");
    },
  },
  methods: {
    editCard: function () {
      if (!this.fieldset_disabled) {
        this.$store.commit("editCard", {
          id: this.id,
          num: this.request_data.num,
          dadd: this.request_data.dadd,
          lastUpd: new Date().toISOString(),
          state: this.request_state,
          stg: [this.product],
          client_name: this.fullname,
          person_fullname: this.fullname,
          person_phone: this.phone,
          person_email: this.email,
          inn: this.inn,
          company_name: this.company_name,
          company_type: this.company_type,
          extra: {
            partner: {
              client_name: this.partner_name,
              inn: this.partner_inn,
            },
            crm_source_type: this.crm,
          },
        });
      }
      this.fieldset_disabled = !this.fieldset_disabled;
    },
  },
  mounted() {
    this.$store.dispatch("getRequestInfo", this.id).then(() => {
      this.is_loaded = true;
      this.request_data = this.$store.state.request_page_info;
      const index = this.$store.state.tabs.findIndex(
        (tab) => tab.key === "requests/" + this.id
      );
      if (index === -1) {
        this.$store.commit("addTab", {
          name: this.request_data.num,
          key: "requests/" + this.id,
        });
      }
    });
  },
  watch: {
    id: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.is_loaded = false;
        this.$store.dispatch("getRequestInfo", this.id).then(() => {
          this.is_loaded = true;
          this.request_data = this.$store.state.request_page_info;
        });
      }
    },
  },
  components: {
    "loading-placeholders": Loaders,
  },
};
</script>

<style lang="scss" scoped>
.request-page {
  position: relative;
  &__edit-btn {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    &:focus::before {
      opacity: 0;
    }
  }
  &__title {
    text-align: right;
    margin-right: 2rem;
  }
  &__subtitle {
    text-align: center;
    margin: 1rem 0 1rem;
    font-size: 1.5rem;
  }
  &__time {
    display: block;
    margin-top: 2rem;
    color: rgba(0, 0, 0, 0.7);
  }
  &__fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    grid-template-columns: 25% 75%;
  }
  &__label {
    text-align: center;
    color: rgba(0, 0, 0, 0.8);
  }
  &__input {
    text-align: center;
    font-size: 1.5rem;
    width: 100%;
    margin: 0 auto 0.75rem;
    outline: none;
    transition: box-shadow 0.2s ease, border-radius 0.2s ease;
    &_select {
      width: fit-content;
      margin: auto;
      padding: 0.5rem;
      border-right: 0.5rem solid;
      outline: none;
    }
    &_init {
      border-right-color: rgb(0, 87, 255);
    }
    &_err {
      border-right-color: rgb(255, 92, 0);
    }
    &_fin {
      border-right-color: #82d641;
    }
  }
  &__fieldset:not([disabled]) > .request-page__input {
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.25);
    border-radius: 5px;
  }
}
</style>
