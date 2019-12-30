<template lang="html">
  <container :showFooter="false">
    <vue-countdown-timer
      :start-time="'2018-10-10 00:00:00'"
      :end-time="'2020-1-30 00:00:00'"
      :interval="1000"
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
            <div class="timer">
              <p>{{ scope.props.days }}</p>
              <small>{{ scope.props.dayTxt }}</small>
            </div>
            <div class="timer">
              <p>{{ scope.props.hours }}</p>
              <small>{{ scope.props.hourTxt }}</small>
            </div>
            <div class="timer">
              <p>{{ scope.props.minutes }}</p>
              <small>{{ scope.props.minutesTxt }}</small>
            </div>
            <div class="timer">
              <p>{{ scope.props.seconds }}</p>
              <small>{{ scope.props.secondsTxt }}</small>
            </div>
          </div>
        </small>
      </template>
    </vue-countdown-timer>
    <h3 class="white has-text-weight-bold has-text-white">
      Cuenta regresiva para el lanzamiento oficial
    </h3>
    <div class="flex flex-center p30-0" style="width: 100%">
        <van-icon :name="`${publicPathSocialIcons}/twitter.png`" size="43" class-prefix="social-icon" />
        <van-icon :name="`${publicPathSocialIcons}/facebook.png`" size="43" class-prefix="social-icon" />
    </div>
  </container>
</template>
<script>
export default {
  name: 'CountTimer',
  data() {
    return {
      publicPathSocialIcons: `${process.env.VUE_APP_BASE_URL}/img/icons/social`,
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.timer {
  padding: 15px;
  color: white;

  & > p {
    font-size: 2em;
  }

  & > small {
    font-size: .9em;
    text-transform: capitalize;
    font-weight: lighter;
  }
}
</style>
