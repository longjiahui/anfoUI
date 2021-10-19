<template>
  <div class="home">
    <anfo-list :context="context">
      <template v-slot="{item}">
        <div>
        {{item}}dd
        </div>
      </template>
    </anfo-list>
  </div>
</template>

<script>
import { createListContext } from '../../../dist/anfoUI.common'

export default {
  setup(){
    let context = createListContext({
      api: ()=>([1, 2, 3]),
      dataMapper: d=>({data: d})
    })
    context.refreshDatas()
    return { context }
  }
}
</script>
