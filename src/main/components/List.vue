<template>
    <div v-loading="context?.data?.isLoading" class="list-pagination vblock-xs">
        <!-- context.totalPage是个computed，此处通过props传进来后不会自动解value，所以需要.value -->
        <!-- <a-pagination v-if="context?.totalPage?.value > 1" size="small" v-model:current="context.data.page" v-model:pageSize="context.data.pageSize" :total="context.data.total"></a-pagination> -->
        <!-- {{$slots.pagination && $slots.pagination()}} -->
        <slot v-if="$slots.pagination" name="pagination" :context="context" :total-page="context?.totalPage?.value" :current="context.data.page" :pageSize="context?.data?.pageSize" :total="context?.data?.total"></slot>
        <component :is="$anfoUIListPagination" v-else-if="$anfoUIListPagination && context?.totalPage?.value > 1" v-model:current="context.data.page" v-model:pageSize="context.data.pageSize" :total="context.data.total" />
        <!-- <component v-else-if="$anfoUIListPagination" :is="$anfoUIListPagination" :context="context" :total-page="context?.totalPage?.value" v-model:current="context.data.page" v-model:pageSize="context.data.pageSize" :total="context?.data?.total" /> -->
        <div :class="containerClass">
            <slot v-for="(item, i) in context?.data?.datas"
            :key="i" :item="item" :i="i"></slot>
        </div>
        <div v-if="context?.data?.datas?.length === 0 && noDataText" class="desc">{{noDataText}}</div>
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
        noDataText: String,
    },
    setup(props){
        let { context } = props

        let { data, refreshDatas } = context
        watch(()=>data?.page, ()=>{
            refreshDatas?.()
        }, { immediate: true })
    }
}
</script>

<style lang="scss" scoped>
.list-pagination{
    .desc{
        color: #999;
        font-size: .8em;
    }
}
</style>