import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'

describe('WordleBoard', () => {
 test("a victory message", async() => {
  // arrange
  const wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" }})

  // act
  const guessInput = wrapper.find("input[type=text]")
  await guessInput.setValue("TESTS")
  await guessInput.trigger("keydown.enter")

  // assert
  expect(wrapper.text()).toContain("You Won!")
 })
})
