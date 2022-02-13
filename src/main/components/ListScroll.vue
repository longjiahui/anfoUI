<template>
    <div  class="list-scroll vblock-xs">
        <div :class="containerClass">
            <slot v-for="(item, i) in context?.data?.datas"
                :key="!dataKey?i:(typeof dataKey === 'string'?(item?.[dataKey]):(dataKey?.(item)))" :item="item" :i="i"></slot>
        </div>
        <div v-if="noDataText && context?.data?.datas?.length === 0" class='desc'>{{noDataText}}</div>
        <div v-if="!context?.data?.noMoreData" @click="context?.refreshDatas()" class="desc clickable">点击加载更多</div>
        <!-- <div v-else class="desc">没有更多数据啦</div> -->
    </div>
</template>

<script>
import { reactive, watch } from 'vue'

export default {
    props: {
        context: {
            type: Object,
            default: ()=>({})
        },
        containerClass: String,
        noDataText: {
            type: String,
            default: ''
        },
        dataKey: {
            type: [String, Function],
            default: null,
        }
    },
    setup(props){
        let { context } = props

        let { data, refreshDatas } = context

        // refreshDatas?.({reset: true})
        return {
            context,
        }
    }
}
</script>

<style lang="scss" scoped>
.list-scroll{
    .desc{
        color: #999;
        font-size: .8em;
    }
}
</style>