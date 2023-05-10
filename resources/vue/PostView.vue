<template>
   <div v-if="posts_data" class="post flex flex-col gap-y-3 items-center bg-white rounded-md p-4">
       <div class="info bg-cyan w-full mx-5 p-3 rounded-lg flex flex-row gap-y-3">
           <div class="flex flex-col rounded-full w-20 h-20 bg-gray-300 justify-center items-center mr-4 overflow-hidden">
               <img v-bind:src="posts_data.profile" alt="" class="w-full h-full object-cover" @click="goToProfile(posts_data.user)">
           </div>
           <div class="other-content w-full flex justify-between">
               <div class="user-info flex flex-col h-full justify-around ml-4 gap-y-1">
                   <span class="username text-sm font-comfortaa font-semibold hover:cursor-pointer" @click="goToProfile(posts_data.user)">@{{ posts_data.user }}</span>
                   <button class="btn-follow bg-purple rounded-xl py-0.5 px-4 text-white">Seguir</button>
               </div>


               <div class="extra-info flex gap-x-3 items-baseline">
                   <!--<span class="time text-sm">{{ posts_data.date.substring(0, 10) }}</span>-->
                   <i class="fa-solid fa-ellipsis-vertical text-purple cursor-pointer"></i>
               </div>
           </div>
       </div>


       <div class="images w-full mx-5 mt-1">
           <img v-bind:src="posts_data.image" alt="image" class="rounded-md">
       </div>


       <div class="content bg-cyan w-full mx-5 p-3 rounded-lg flex flex-col text-sm relative">
           <p>{{ posts_data.text }}</p>
           <div class="topics mt-2 flex flex-wrap gap-2">
               <span class="topic bg-red py-1 px-2 rounded-xl text-white w-fit">
                   #hello-world
               </span>
               <span class="topic bg-red py-1 px-2 rounded-xl text-white w-fit">
                   #test
               </span>
           </div>
       </div>
       <div id="message" class="hidden">La URL se ha copiado al portapapeles</div>


       <div class="options bg-purple w-full flex justify-around mx-5 p-1 rounded-lg text-white text-xl">
           <like-BTN v-bind:id_user="posts_data.id_user" v-bind:id_post="posts_data.post" />
           <button><i class="fa fa-retweet"></i></button>
           <button><i class="fa-regular fa-comment"></i></button>
           <button @click="copyURL"><i class="fa fa-share"></i></button>
       </div>
   </div>
</template>




<script>
import axios from 'axios';
import LikeBTN from './LikeBTN.vue';
import Swal from 'sweetalert2';




export default {
   components: { LikeBTN },
   data() {
       return {
           posts_data: null,
       }
   },


   mounted() {
       this.getPost();
   },


   methods: {
       getPost() {
           const postId = window.location.href.split('/').pop();
           axios.get(`/show-post/${postId}`)
               .then(data => {
                   this.posts_data = data;
               })
               .catch(error => {
               });
       },
       goToProfile(user) {
           const baseURL = window.location.origin;
           const profileURL = `${baseURL}/perfil/${user}`;
           window.location.href = profileURL;
       },
       copyURL(post) {
           const baseURL = window.location.origin;
           const shareURL = `${baseURL}/post-view/${post.post}`;
           navigator.clipboard.writeText(shareURL)
               .then(() => {
                   Swal.fire({
                       icon: 'success',
                       text: 'Se ha copiado la URL de la imagen en su portapapeles. ',
                       confirmButtonText: 'Volver'
                   })
               })
               .catch((error) => {
                   console.error("Hubo un error al copiar la URL al portapapeles: ", error);
               });
       }
   }
}
</script>