<script setup lang="ts">
import {WORD_SIZE} from "@/settings"
import {computed, ref} from "vue"
import englishWords from "@/englishWordsWith5Letters.json"

const guessInProgress = ref<string|null>(null)

const emit = defineEmits<{
  "guess-submitted": [ guess: string ]
}>()

// very important - utilise this at work
const formattedGuessInProgress = computed<string>({
  get() {
    return guessInProgress.value ?? ""
  },
  set(rawValue: string) {
    guessInProgress.value = null // this is very important

    guessInProgress.value = rawValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, "")
  }
})

function onSubmit() {
  if (!englishWords.includes(formattedGuessInProgress.value)) {
    return
  }
  emit("guess-submitted", formattedGuessInProgress.value)
}

</script>

<template>
  <input v-model="formattedGuessInProgress"
         type="text"
         :maxlength="WORD_SIZE"
         @keydown.enter="onSubmit"
  />
</template>
