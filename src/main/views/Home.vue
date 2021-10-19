<template>
  <div class="home">
    <anfo-list :context="context" container-class="hello">
      <!-- <template v-slot:pagination="d">{{d}}</template> -->
      <template v-slot="{item}">
        <div>
        {{item}}
        </div>
      </template>
    </anfo-list>
    <anfo-list-scroll :context="scrollContext">
      <template v-slot="{item}">
        <div>
        {{item}}
        </div>
      </template>
    </anfo-list-scroll>
  </div>
</template>

<script>
import anfoUI from '@/index'

export default {
  setup(){
    let context = anfoUI.createListContext({
      api: ()=>([1, 2, 3]),
      dataMapper: d=>({data: d})
    })

    let scrollContext = anfoUI.createListScrollContext({
      api: ()=>([1, 2, 3]),
      dataMapper: r=>r
    })
    return { context, scrollContext }
  }
}
</script>
