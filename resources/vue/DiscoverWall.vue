<!-- Codi de la pagina -->
<template>
    <div class="posts w-full sm:w-96 flex flex-col items-center gap-3 overflow-y-scroll">
        <div v-for="post in posts_data" :key="post.id_user"
            class="post flex flex-col gap-y-3 items-center bg-white rounded-md p-4">
            <div class="info bg-cyan w-full mx-5 p-3 rounded-lg flex flex-row gap-y-3">
                <div
                    class="flex flex-col rounded-full w-20 h-20 bg-gray-300 justify-center items-center mr-4 overflow-hidden">
                    <img v-bind:src="posts_data.profile" alt="" class="w-full h-full object-cover" @click="goToProfile(post.user)">
                </div>
                <div class="other-content w-full flex justify-between">
                    <div class="user-info flex flex-col h-full justify-around ml-4 gap-y-1">
                        <span class="username text-sm font-comfortaa font-semibold hover:cursor-pointer" @click="goToProfile(post.user)">@{{ post.user }}</span>
                        <button class="btn-follow bg-purple rounded-xl py-0.5 px-4 text-white">Seguir</button>
                    </div>

                    <div class="extra-info flex gap-x-3 items-baseline">
                        <span class="time text-sm">{{ post.date.substring(0, 10) }}</span>
                        <i class="fa-solid fa-ellipsis-vertical text-purple cursor-pointer"></i>
                    </div>
                </div>
            </div>

            <div class="images w-full mx-5 mt-1">
                <div class="image w-full">
                    <a :href="'/post-view/' + post.post">
                        <img :src="post.image" alt="image" class="rounded-md">
                    </a>
                </div>
            </div>



            <div class="content bg-cyan w-full mx-5 p-3 rounded-lg flex flex-col text-sm relative">
                <p>{{ post.text }}</p>
                <div class="topics mt-2 flex flex-wrap gap-2">
                    <span class="topic bg-red py-1 px-2 rounded-xl text-white w-fit">
                        #hello-world
                    </span>
                    <span class="topic bg-red py-1 px-2 rounded-xl text-white w-fit">
                        #test
                    </span>

                </div>
            </div>

            <div class="options bg-purple w-full flex justify-around mx-5 p-1 rounded-lg text-white text-xl">
                <like-BTN v-bind:id_user="post.id_user" v-bind:id_post="post.post" />
                <button><i class="fa fa-retweet"></i></button>
                <button @click="showCommentInput = true"><i class="fa-regular fa-comment"></i></button>
                <button @click="copyURL"><i class="fa fa-share"></i></button>
            </div>
            
            <div v-if="showCommentInput" class="comments">
                <textarea v-model="newComment" class="w-full resize-none focus:outline-none p-2 rounded-lg" placeholder="Añade un comentario..."></textarea>
                <button @click="submitComment(post.id)" class="bg-purple rounded-xl py-0.5 px-4 text-white mt-2">Enviar</button>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import likeBTN from './LikeBTN.vue'
import { resultPosts } from './mostrar-posts';

export default {
    components: {
        likeBTN
    },
    data() {
        return {
            posts_data: [],
            newComment: '',
            showCommentInput: false,

        }
    },

    mounted() {
        this.getposts()
    },
    methods: {
        getposts() {
            resultPosts('/posts-discover').then(data => {
                this.posts_data = data
            })
        },
        goToProfile(user) {
            const baseURL = window.location.origin;
            const profileURL = `${baseURL}/perfil/${user}`;
            window.location.href = profileURL;
        },
        toggleCommentInput() {
            this.showCommentInput = !this.showCommentInput;
        },
        toggleCommentInput() {
            this.showCommentInput = !this.showCommentInput;
        },
        submitComment(postId) {
        axios.post(`/messages/${postId}/comments`, {text: this.newComment})
            .then(response => {
                this.newComment = '';
                this.showCommentInput = false;
            })
            .catch(error => {
                console.log(error);
            });
    },
    }

}

</script>

