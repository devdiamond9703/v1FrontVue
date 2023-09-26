<template>
<v-container fluid>
  <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" color="#263544"> 
          <v-list>
            <v-list-item
              prepend-avatar="@/assets/admin.jpg"
              title="Admin"
              subtitle="admin@gmail.com"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item :to="{name: 'app.dashboard'}" prepend-icon="mdi-folder" title="Home"  value="myfiles"></v-list-item>
            <v-list-item :to="{name: 'app.attribute'}" prepend-icon="mdi-account-multiple" title="Attribute" value="shared"></v-list-item>
            <v-list-item :to="{name: 'app.category'}" prepend-icon="mdi-account-multiple" title="Category" value="shared"></v-list-item>
            <v-list-item :to="{name: 'app.product'}" prepend-icon="mdi-account-multiple" title="Product" value="shared"></v-list-item>
            
          </v-list>
          
      </v-navigation-drawer>
      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Application</v-app-bar-title>
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="brown" size="default">
                <span class="text-h6">{{ user.initials }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="text-h5">{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn :to="{name: 'login'}"  size="small" rounded variant="text">
                  login
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-app-bar>
      
      <v-main>
        <v-sheet :elevation="4" class="pa-5" rounded>
          <router-view />
        </v-sheet>
      </v-main>

    </v-app>
</v-container>
</template>

<script>
  export default {
    data () { 
      return {
        drawer: true,
        user: {
          initials: 'A',
          fullName: 'Admin',
          email: 'admin@gmail.com',
        },
      }
    }
  }
</script>
