<template>
    <div>
        <button @click="searchModal = true">
            <i class="fa fa-search text-2xl" v-show="!searchModal"></i>
        </button>

        <div v-show="searchModal" class="modal" style="margin-top: -24px">
            <div class="modal-content">
                <div class="relative">
                    <input type="text" name="username"
                        class="w-full h-8 px-3 py-2 pr-8 border rounded-md shadow-sm placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        :placeholder="searchPlaceholder" v-model="searchUser" @keyup.enter="search" />
                    <button
                        class="absolute top-0 right-0 flex items-center justify-center hover:bg-gray-300 h-8 w-8 rounded-md"
                        @click="searchModal = false">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchModal: false,
            searchUser: '',
            searchResults: [],
            searchQuery: '',
            searchPlaceholder: 'Buscar usuario',
        };
    },
    methods: {
        search() {
            // Lógica para realizar la búsqueda
            console.log('Búsqueda realizada:', this.searchUser);

            // Realizar petición axios al endpoint de búsqueda
            axios.post('/search/user', { username: this.searchUser })
                .then((response) => {
                    if (response.data.hasOwnProperty('error')) {
                        this.searchPlaceholder = response.data.error;
                        this.searchModal = true;
                        return;
                    }

                    this.searchResults = response.data.users;
                    this.searchQuery = response.data.query;

                    // Redirigir al usuario a la página de resultados de búsqueda
                    window.location.href = '/search?query=' + this.searchQuery;
                    // this.showSearchResults();

                })
                .catch((error) => {
                    console.log(error);
                    // Mostrar mensaje de error en la interfaz
                    alert('Ocurrió un error en el servidor');
                });

            // Cerrar modal después de realizar la búsqueda
            this.searchModal = false;
        },

    },
};
</script>
