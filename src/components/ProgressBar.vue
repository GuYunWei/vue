<template>
  <div class="progress-outer">
    <div class="progress" :class="{'progress-striped active': animate}">
      <div class="progress-bar"
        :class="type && 'progress-bar-' + type"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemin="0"
        :aria-valuemax="max"
        :style="{width: (percent < 100 ? percent : 100) + '%'}">
      </div>
    </div>
    <span class="progress-text">{{valueText}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        default: 100
      },
      type: {
        type: String,
        default: ""
      },
      animate: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      percent(){
        return parseInt(this.value * 100/ this.max, 10);
      },
      valueText(){
        return this.percent + '%';
      }
    }
  }
</script>

<style scoped>
  .progress{
    height: 7px;
    width: 70%;
    margin-right: 10px;
    display: inline-block;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    vertical-align: middle;
  }
  .progress-bar{
    width: 0;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: #04BE02;
    border-radius: 4px;
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    transition: width .6s ease;
  }
  .progress-text{
    vertical-align: middle;
  }
  .progress-bar-info{
    background-color: #5bc0de;
  }
  .progress-bar-success{
    background-color: #5cb85c;
  }
  .progress-bar-danger{
    background-color: #d9534f;
  }
  .progress-bar-warning{
    background-color: #f0ad4e;
  }
  .progress.active .progress-bar{
    animation: progress-bar-stripes 2s linear infinite;
  }
  @keyframes progress-bar-stripes{
    0%{ background-position: 40px 0; }
    100%{ background-position: 0 0; }
  }
  .progress-striped .progress-bar{
    background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%,
                      transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%,
                      rgba(255,255,255,.15) 75%, transparent 75%, transparent);
    -webkit-background-size: 40px 40px;
    background-size: 40px 40px;
  }
</style>