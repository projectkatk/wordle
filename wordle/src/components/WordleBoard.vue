<script setup lang="ts">
import {VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE} from "@/settings"
import {computed, ref} from "vue"
import englishWords from "@/englishWordsWith5Letters.json"

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})
const guessInProgress = ref("")
const guessSubmitted = ref("")

// very important - utilise this at work
const formattedGuessInProgress = computed({
  get() {
    return guessInProgress.value
  },
  set(rawValue: string) {
    guessInProgress.value = rawValue.slice(0, WORD_SIZE)

  }
})

</script>

<template>
  <input v-model="formattedGuessInProgress"
         type="text"
         :maxlength="5"
         @keydown.enter="guessSubmitted = guessInProgress"
  />
  <p
    v-if="guessSubmitted.length> 0"
    v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE"
  />
</template>
