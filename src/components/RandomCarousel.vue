<script setup lang="ts">
import { ref, onMounted, nextTick, defineExpose } from 'vue'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

interface Props {
  items: string[]
}
const props = defineProps<Props>()

const emblaRef = ref<any>(null)
const emblaApi = ref<any>(null)
const isReady = ref(false)

onMounted(async () => {
  await nextTick()
  emblaApi.value = emblaRef.value?.emblaApi
  if (emblaApi.value) {
    isReady.value = true
  }
  console.log('EmblaRef:', emblaRef.value)
  console.log('Embla API:', emblaRef.value?.emblaApi)
})

async function spinTo(index: number) {
  if (!isReady.value || !emblaApi.value) return

  const count = props.items.length
  const fakeSpins = 10 + Math.floor(Math.random() * 5)

  for (let i = 0; i < fakeSpins; i++) {
    const fakeIndex = i % count
    emblaApi.value.scrollTo(fakeIndex)
    await new Promise((r) => setTimeout(r, 80))
  }

  emblaApi.value.scrollTo(index)
}

defineExpose({ spinTo })
</script>

<template>
  <Carousel ref="emblaRef" class="w-full max-w-xs overflow-hidden">
    <CarouselContent class="flex">
      <CarouselItem
        v-for="(item, index) in props.items"
        :key="index"
        class="min-w-full"
      >
        <div
          class="flex aspect-square items-center justify-center text-4xl font-bold p-4 border"
        >
          {{ item }}
        </div>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>