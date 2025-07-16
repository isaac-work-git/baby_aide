<script setup lang="ts">
import { ref } from 'vue'
import EmblaCarousel from './components/EmblaCarousel.vue'

const categories = {
  colors: ['Red', 'Green', 'Blue', 'Yellow'],
  numbers: ['1', '2', '3', '4'],
  letters: ['A', 'B', 'C', 'D'],
  animals: ['Cat', 'Dog', 'Bear', 'Fox'],
}

function shuffle<T>(array: T[]): () => T {
  let copy = [...array]
  return () => {
    if (copy.length === 0) copy = [...array]
    const index = Math.floor(Math.random() * copy.length)
    return copy.splice(index, 1)[0]
  }
}

const getColor = shuffle(categories.colors)
const getNumber = shuffle(categories.numbers)
const getLetter = shuffle(categories.letters)
const getAnimal = shuffle(categories.animals)

const colorRef = ref()
const numberRef = ref()
const letterRef = ref()
const animalRef = ref()

function spinAll() {
  const color = getColor()
  const number = getNumber()
  const letter = getLetter()
  const animal = getAnimal()

  colorRef.value?.spinTo(categories.colors.indexOf(color))
  numberRef.value?.spinTo(categories.numbers.indexOf(number))
  letterRef.value?.spinTo(categories.letters.indexOf(letter))
  animalRef.value?.spinTo(categories.animals.indexOf(animal))

  console.log({ color, number, letter, animal })
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4 p-4">
    <EmblaCarousel ref="colorRef" :items="categories.colors" />
    <EmblaCarousel ref="numberRef" :items="categories.numbers" />
    <EmblaCarousel ref="letterRef" :items="categories.letters" />
    <EmblaCarousel ref="animalRef" :items="categories.animals" />
  </div>

  <div class="text-center mt-6">
    <button @click="spinAll" class="bg-blue-600 text-white text-lg px-6 py-3 rounded">
      Spin All!
    </button>
  </div>
</template>
