<template>
  <div>
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<script>
import { Group, Cell } from 'vux'
import common from '@/api/common'

export default {
    components: {
        Group,
        Cell
  }
}
var params = {

}

common.ShowPI(params)
.then((res)=>{
    console.info('ShowPI res', res);
})
</script>
