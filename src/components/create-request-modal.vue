<template>
  <v-dialog
    class="create-request-modal"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        fab
        class="create-request-modal__btn"
        color="rgb(32, 66, 171)"
        dark
        v-on="on"
      >
        <v-icon>mdi-file-plus</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="rgb(32, 66, 171)" dark>
          <v-btn icon dark @click="dialog.value = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Новая заявка</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            text
            dark
            @click="
              save();
              $refs.form.validate() ? (dialog.value = false) : null;
            "
            >Сохранить</v-btn
          >
        </v-toolbar>
        <v-container>
          <v-form ref="form">
            <v-text-field
              v-model="person_fullname"
              label="Имя клиента"
              :rules="rule"
            ></v-text-field>
            <v-text-field
              v-model="person_phone"
              label="Номер телефона"
              :rules="rule"
            ></v-text-field>
            <v-text-field
              v-model="person_email"
              label="email"
              :rules="rule"
            ></v-text-field>
            <v-text-field
              v-model="company_name"
              label="Название компании"
            ></v-text-field>
            <v-text-field
              v-model="company_type"
              label="Организационно-правовая форма"
              :rules="rule"
            ></v-text-field>
            <v-text-field
              v-model="inn"
              label="ИНН"
              :rules="rule"
            ></v-text-field>
            <v-text-field
              v-model="stg[0]"
              label="Продукт"
              :rules="rule"
            ></v-text-field>
            <h3>Дополнительная информация:</h3>
            <v-text-field
              v-model="extra.partner.client_name"
              label="Партнёр"
            ></v-text-field>
            <v-text-field
              v-model="extra.partner.inn"
              label="ИНН партнёра"
            ></v-text-field>
            <v-text-field
              v-model="extra.crm_source_type"
              label="Источник заявки"
            ></v-text-field>
            <v-btn
              class="create-request-modal__save-btn_bottom"
              @click="
                save();
                $refs.form.validate() ? (dialog.value = false) : null;
              "
            >
              Сохранить
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "create-request-modal",
  data() {
    return {
      rule: [(v) => !!v || "Обязательное поле"],
      person_fullname: "",
      person_phone: "",
      person_email: "",
      inn: "",
      company_name: "",
      company_type: "",
      stg: [""],
      extra: {
        partner: {
          client_name: "",
          inn: "",
        },
        crm_source_type: "",
      },
    };
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        const id = this.$store.getters.getNewLocalId;
        this.$store.dispatch("createNewRequest", {
          id: id,
          num: this.$store.getters.getNewNum,
          dadd: new Date().toISOString(),
          lastUpd: new Date().toISOString(),
          state: "init",
          person_fullname: this.person_fullname,
          client_name: this.person_fullname,
          person_phone: this.person_phone,
          person_email: this.person_email,
          inn: this.inn,
          company_name: this.company_name,
          company_type: this.company_type,
          stg: this.stg,
          extra: this.extra,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-request-modal {
  &__btn {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    z-index: 5;
    &:focus::before {
      opacity: 0;
    }
  }
  &__save-btn {
    &_bottom {
      margin: 1.5rem auto;
      display: flex;
      width: 50%;
    }
  }
}
@media screen and (max-width: 601px) {
  .create-request-modal {
    &__btn {
      bottom: 2rem;
      right: 2rem;
    }
  }
}
</style>
