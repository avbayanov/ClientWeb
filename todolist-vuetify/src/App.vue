<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            app
        >
            <v-list dense>
                <v-list-item v-for="page in menu" :to="page.path">
                    <v-list-item-action>
                        <v-icon>{{ page.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ page.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar
            app
            color="light-green darken-1"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Todo list</v-toolbar-title>
        </v-app-bar>
        <v-content>
            <v-container
                class=""
                fluid
            >
                <v-row>
                    <v-col>
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            menu: [
                {
                    path: "/",
                    title: "Todos",
                    icon: "mdi-note-multiple"
                },
                {
                    path: "/about",
                    title: "About",
                    icon: "mdi-information"
                }
            ]
        })
    }
</script>

<style lang="scss">

</style>
