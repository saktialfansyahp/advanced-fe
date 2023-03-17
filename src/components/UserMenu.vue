<template>
    <div class="user-menu">
        <div class="user-avatar">
        <img :src="userAvatar"/>
        </div>
        <div class="user-info">
        <span class="username"></span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            name: ''
        }
    },
    methods: {
        async user() {
            const token = localStorage.getItem('access_token')
            await axios.get('http://localhost:8000/api/auth/login', {
                headers: {
                    'Authorization': 'Bearer' + token
                }
            })
            .then(response => {
                const name = response.data.name
                this.name = name
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
}
</script>
  