<script setup lang="ts">
import { onMounted, ref, defineExpose } from 'vue'
import EmblaCarousel from 'embla-carousel'

const props = defineProps<{
  items: string[]
}>()

const viewportRef = ref<HTMLElement | null>(null)
let embla: ReturnType<typeof EmblaCarousel> | null = null

onMounted(() => {
  if (viewportRef.value) {
    embla = EmblaCarousel(viewportRef.value)
  }
})

async function spinTo(index: number) {
  if (!embla) return
  const spins = 10 + Math.floor(Math.random() * 5)
  for (let i = 0; i < spins; i++) {
    embla.scrollTo(i % props.items.length)
    await new Promise((r) => setTimeout(r, 80))
  }
  embla.scrollTo(index)
}

defineExpose({ spinTo })
</script>

<template>
  <div class="overflow-hidden w-full max-w-xs border" ref="viewportRef">
    <div class="flex">
      <div
        v-for="(item, index) in props.items"
        :key="index"
        class="min-w-full h-32 flex items-center justify-center text-2xl font-bold border-r bg-gray-100"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
