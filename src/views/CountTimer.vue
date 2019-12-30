<template lang="html">
  <container :showFooter="false">

    <h3 class="white has-text-weight-bold is-text-white">
      Cuenta regresiva para la version 0.1.0
    </h3>
    <vue-countdown-timer
      :start-time="'2018-10-10 00:00:00'"
      :end-time="'2020-1-30 00:00:00'"
      :interval="1000"
      :start-label="'Until start:'"
      :end-label="'Until end:'"
      label-position="begin"
      :end-text="'Event ended!'"
      :day-txt="'dias'"
      :hour-txt="'horas'"
      :minutes-txt="'minutos'"
      :seconds-txt="'segundos'"
    >
      <template slot="countdown" slot-scope="scope">
        <small class="has-text-weight-bold p10 p-b-15 p-t-0 is-size-5" style="color: #363636">
          <div class="flex flex-center">
            <div class="flex flex-wrap timer">
              <p>{{ scope.props.days }}</p>
              <small>{{ scope.props.dayTxt }}</small>
            </div>
            <div class="flex flex-wrap timer">
              <p>{{ scope.props.hours }}</p>
              <small>{{ scope.props.hourTxt }}</small>
            </div>
            <div class="flex flex-wrap timer">
              <p>{{ scope.props.minutes }}</p>
              <small>{{ scope.props.minutesTxt }}</small>
            </div>
            <div class="flex flex-wrap timer">
              <p>{{ scope.props.seconds }}</p>
              <small>{{ scope.props.secondsTxt }}</small>
            </div>
          </div>
        </small>
      </template>
    </vue-countdown-timer>
    <div class="flex space-between" style="width: 80%">
      <div>
        <van-icon name="https://icon-icons.com/icons2/122/PNG/128/twitter_socialnetwork_20007.png" size="50" />
      </div>
      <div>
        {publicPath}
        <van-icon :name="`${publicPath}/icons/social/facebook.png`" size="43" />
      </div>
    </div>
  </container>
</template>
<script>
export default {
  name: "CountTimer",
  data() {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.timer {
  padding: 10px;
  color: white;

  &p {
    font-size: 2em;
  }

  &small {

  }
}
</style>
