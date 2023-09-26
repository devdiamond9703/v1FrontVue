<template>
  <v-app>
      <v-container fluid class="bg-deep-purple" style="height: 100vh">
          <v-card class="mx-auto px-6 py-8" max-width="450">
              <v-card-title>
                  <v-row>
                      <v-col class="text-center">
                        <h2>Login</h2>
                      </v-col>
                  </v-row>
              </v-card-title>
              <v-form v-model="login.other.form" @submit.prevent="onFormSubmit">
                  <v-text-field
                      v-model="login.field.email"
                      :readonly="login.other.loading"
                      :rules="[required]"
                      class="mb-2"
                      clearable
                      label="Email"
                      variant="underlined"
                  ></v-text-field>

                  <v-text-field
                      v-model="login.field.password"
                      :readonly="login.other.loading"
                      :rules="[required]"
                      clearable
                      label="Password"
                      placeholder="Enter your password"
                      variant="underlined"
                  ></v-text-field>

                <br>

                <v-btn
                  :disabled="!login.other.form" 
                  :loading="login.other.loading"
                  block
                  color="success"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  Login
                </v-btn>
              </v-form>
          </v-card>
      </v-container>
  </v-app>
</template>
<script>
import { checkUser } from '../../api/auth/index.js'
  export default {
    data() {
        return {
          login: {
              other: {
                  form: false,
                  loading: false,
              },
              field: {
                  email: null,
                  password: null,
              }
          }
        }
    },

    methods: {
        async onFormSubmit() {
            if (!this.login.other.form) return
            this.login.other.loading = true
            setTimeout(() => (this.login.other.loading = false), 2000)
            let response = await checkUser(this.login.field);
            localStorage.setItem("userData", JSON.stringify(response));
        },
        required (v) {
          return !!v || 'Field is required'
        },
    },
  }
</script>