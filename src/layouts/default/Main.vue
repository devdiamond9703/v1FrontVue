<template>
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
          <v-list-item to="/" prepend-icon="mdi-folder" title="Home"  value="myfiles"></v-list-item>
          <v-list-item to="/product" prepend-icon="mdi-account-multiple" title="Product" value="shared"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Application</v-app-bar-title>
    </v-app-bar>
    
    <v-main>
      <v-sheet :elevation="4" class="pa-5" rounded>
        <router-view />
      </v-sheet>
    </v-main>

  </v-app>
</template>

<script>
  export default {
    data: () => ({ drawer: true }),
  }
</script>
