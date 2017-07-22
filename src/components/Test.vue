<template>
  <div>
    <span>{{msg}}</span>
    <button @click='fun'>获取数据</button>
  </div>
</template>

<script>
  import Vue from "vue";
  import { mapGetters, mapActions} from "vuex";

  export default {
    name: 'test',
    methods: {
      ...mapActions([
         'fun',
        ]),
    },
    computed: {
      ...mapGetters([
         'msg',
        ])
    }
  }
</script>