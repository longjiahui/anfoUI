<template>
    <div ref="scrollContainer" class="scroll-container page">
        <div class="stage">
            <slot :progress="progress"></slot>
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
})

let duration = computed(()=>{
    let val = +props.duration
    val = isNaN(val)?0:val
    return val    
})

let scrollContainer = ref(null)

let progress = ref(0)

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