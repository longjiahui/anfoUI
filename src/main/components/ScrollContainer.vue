<template>
    <div ref="scrollContainer" class="scroll-container page">
        <div class="stage">
            <slot :progress="progress" :seg="seg" :progress-in-seg="progressInSeg"></slot>
        </div>
        <div class="placeholder"
            :style="{
                height: `${duration}px`,
            }"></div>
    </div>
</template>

<script setup>
import { computed, defineProps, onMounted, onUnmounted, ref } from 'vue'

let props = defineProps({
    duration: [Number, String],
    segs: {
        type: Array,
        default: ()=>[1]
    },
})

let duration = computed(()=>{
    let val = +props.duration
    val = isNaN(val)?0:val
    return val
})

let scrollContainer = ref(null)

let progress = ref(0)

let finalSegs = computed(()=>{
    let segs = props.segs
    if(segs?.[0] !== 0){
        segs.unshift(0)
    }
    if(segs?.[segs?.length - 1] !== 1){
        segs.push(1)
    }
    return segs
})
let seg = computed(()=>{
    let ind = finalSegs.value.findLastIndex(s=>progress.value > s)
    if(ind < 0){
        return 0
    }else{
        return ind
    }
})
let progressInSeg = computed(()=>{
    let segs = finalSegs.value
    let nextProgress = segs[seg.value + 1] || 1
    return (progress.value - segs[seg.value]) / (nextProgress - segs[seg.value])
})

let handleScroll = e=>{
    let scrollTop = e.target?.scrollTop
    progress.value = scrollTop / duration.value
}
onMounted(()=>{
    scrollContainer.value?.addEventListener('scroll', handleScroll)
})
onUnmounted(()=>{
    scrollContainer.value?.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.scroll-container{
    overflow: auto;
    position: relative;
}
.stage{
    position: sticky;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>