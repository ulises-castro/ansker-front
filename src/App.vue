<template>
  <div id="app">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false">
    </b-loading>
    <router-view/>
  </div>
</template>
<script type="text/javascript">
/* eslint-disable */
export default {
  name: 'App',
  data() {
    return {
      isLoading : false
    }
  },
  methods: {
  },
  created() {
    // TODO: Check if useful this piece of code otherwise remove it
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '273084363581374',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });

      FB.AppEvents.logPageView();

      window.FB = FB;
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

     // TODO: B Create 401 | 403 response middlare
     this.$http.interceptors.response.use(undefined, (err) => {
       // console.log(err, err.status,"err");
       if (err) {
        //  this.$store.dispatch('logout');

        //  this.$router.push({ name: 'Home' });
       }
     });
  },
  metaInfo: {
    // Children can override the title.
    title: 'Ansker',
    // Result: My Page Title ← My Site
    // If a child changes the title to "My Other Page Title",
    // it will become: My Other Page Title ← My Site
    titleTemplate: '%s ~ Ansker',
    // Define meta tags here.
    meta: [
      {
        name: 'description',
        content: 'Comparte secretos con tus amigos o en tu ciudad de forma anónima.'
      },
      {
        property: 'og:title',
        content: 'Ansker - Comparte secretos anónimamente'
      },
      {
        property: 'og:site_name',
        content
      : 'Ansker'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: 'https://ansker.me'
      },
      {
        property: 'og:description',
        content: 'Comparte secretos con tus amigos o en tu ciudad de forma anónima.'
      }
    ],
  }
}
</script>
<style lang="scss">
@import '@/styles/main.scss';

html, body, #app {
  height: 100%;
  width: 100%;
}

.loading-overlay .loading-icon:after {
  border: 4px solid #54a0c0;
  border-radius: 290486px;
  border-right-color: transparent;
  border-top-color: transparent;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
