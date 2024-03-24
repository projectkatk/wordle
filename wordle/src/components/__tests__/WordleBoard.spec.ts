import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
 test("a victory message", async() => {
  const wrapper = mount(WordleBoard, { props: { wordOfTheDay }})

  const guessInput = wrapper.find("input[type=text]")
  await guessInput.setValue("TESTS")
  await guessInput.trigger("keydown.enter")

  expect(wrapper.text()).toContain(VICTORY_MESSAGE)
 })

 test("a defeat message appears if the user makes a guess that is incorrect", async() => {
  const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})

  const guessInput = wrapper.find("input[type=text]")
  await guessInput.setValue("WRONG")
  await guessInput.trigger("keydown.enter")

  expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
 })

 test("no end of game message appears if the user has not yet made a guess", async() => {
  const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})

  expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
  expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
 })
})
