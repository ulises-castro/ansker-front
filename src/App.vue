<template>
  <div id="app">
    <!-- <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false">
    </b-loading> -->
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
    sendErrorsAndManagesUserLogin() {
      this.$http.interceptors.response.use(undefined, (err) => {

      // Handler error from backend
      let errorMessage = 'general.error';
      if (err.response && err.response.data) {
        errorMessage = (!err.response.data.error)
          ? 'general.' + err.response.data
          : err.response.data.error;
      }

      this.$notify({
        message: this.$t(errorMessage),
        duration: 3000,
      });

      return;
      if (err) {
         this.$store.dispatch('logout');

         this.$router.push({ name: 'Home' });
       }
     });
    }
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

    (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));

     // TODO: B Create 401 | 403 response middlare, BUG: Because whatever response code exists you will get out
     this.sendErrorsAndManagesUserLogin();
 
  },
  metaInfo: {
    title: 'Ansker',
    titleTemplate: '%s ~ Ansker',
    meta: [
      {
        name: 'description',
        content: 'Comparte lo que piensas con tu alrededor anónimamente.'
      },
      {
        property: 'og:title',
        content: 'Ansker - Comparte lo que piensas con tu alrededor anónimamente'
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
        content: 'Comparte lo que piensas con tu alrededor anónimamente'
      }
    ],
  }
}
</script>
<style lang="scss">
@import '@/styles/variables.scss';

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

a.has-text-primary:hover {
  color: $primary !important;
}

.is-color-primary {
  color: $primary !important;
}

.is-cursor-pointer {
  cursor: pointer;
}

.has-text-primary {
  color: $primary !important;
}

.is-underline {
  text-decoration: underline;
}

a {
  color: $primary;
  font-weight: bold;
}

i {
  &.icon-fb {
    width: 10px;
    counter-reset: white;
    background: url('./assets/icons/facebook.svg');
  }
}

.logo {
  font-size: 30px;
  color: $primary;
  font-weight: bold;
  font-family: 'Marck Script', cursive;
}

.is-relative {
  position: relative;
}


canvas::after {
  content: "Cavas";
}

// Creating personally spaces
$spaceamounts: (0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100);

$sides: ('', '-top', '-bottom', '-left', '-right'); // Leave this variable alone

@each $space in $spaceamounts {
  @each $side in $sides {
    .m#{str-slice($side, 0, 2)}-#{$space} {
      margin#{$side}: #{$space}px !important;
    }

    .p#{str-slice($side, 0, 2)}-#{$space} {
      padding#{$side}: #{$space}px !important;
    }
  }

  // Only left and right values
  .m0-#{$space} {
    margin: 0 #{$space}px !important;
  }

  .p0-#{$space} {
    padding: 0 #{$space}px !important;
  }

  // Only top and bottom values
  .m#{$space}-0 {
    margin: #{$space}px 0 !important;
  }

  .p#{$space}-0 {
    padding: #{$space}px 0 !important;
  }

  .p0-#{$space} {
    padding: 0 #{$space}px !important;
  }

  // General paddings
  .m#{$space} {
    margin: #{$space}px !important;
  }

  .p#{$space} {
    padding: #{$space}px !important;
  }
}

</style>
