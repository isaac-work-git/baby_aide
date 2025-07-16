<script setup lang="ts">
import { ref } from 'vue'
import EmblaCarousel from './components/EmblaCarousel.vue'
import TopBar from './components/TopBar.vue'

const categories = {
  colors: ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Black', 'White'],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  animals: ['Cat', 'Dog', 'Bear', 'Fox', 'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo'],
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
  <TopBar />

  <main class="flex flex-col gap-20 mt-20 mx-auto p-4 justify-center-safe">
    <div class="text-center mt-6">
      <h1 class="text-4xl font-bold mb-4">
        Press the button to find out what you will learn today!
      </h1>
    </div>
  
    <div class="grid grid-cols-2 gap-4 p-4">
      <EmblaCarousel ref="colorRef" :items="categories.colors" />
      <EmblaCarousel ref="numberRef" :items="categories.numbers" />
      <EmblaCarousel ref="letterRef" :items="categories.letters" />
      <EmblaCarousel ref="animalRef" :items="categories.animals" />
    </div>
  
    <div class="text-center mt-6">
      <button @click="spinAll" class="btn bg-primary text-primary-content text-lg px-8 py-6 rounded-3xl">
        Let's Learn!
      </button>
    </div>
  </main>
</template>
