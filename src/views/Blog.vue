<template>
  <div>
    <div id="rectangle" :style="{backgrangd:rgb(red,blue,green)}"></div>
    <div>
        <input type="number" v-model="red" placeholder="red">
        <input type="number" v-model="blue" placeholder="blue">

        <input type="number" v-model="green" placeholder="green">
<button @click="random">随便 给我个色</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            red:0,
            blue:0,
            green:0
        }
    },
// watch: {
    // red: function (val) {
     
//     },
//     blue: function (val) {
//     },
//     green:function (val) {
        
//     }
//   }
};
</script>

<style>
#rectangle {
  width: 100px;
  height: 100px;
  background: rgb(0, 0, 0);
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
}
</style>