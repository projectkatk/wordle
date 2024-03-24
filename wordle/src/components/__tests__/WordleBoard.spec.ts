import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from '@/settings'
import {beforeEach} from "vitest"

describe('WordleBoard', () => {
  let wordOfTheDay = "TESTS"
  let wrapper: ReturnType<typeof mount>;
  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay }})
  })

  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue(guess)
    await guessInput.trigger("keydown.enter")
  }

  describe("End of game messages", () => {
    test("a victory message", async() => {
      await playerSubmitsGuess(wordOfTheDay)
    
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
     })
    
     test("a defeat message appears if the user makes a guess that is incorrect", async() => {
      await playerSubmitsGuess("WRONG")
    
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
     })
    
     test("no end of game message appears if the user has not yet made a guess", async() => {
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
     })

  })

  describe("Rules for defining the word of the day", () => {
    beforeEach(() => {
      console.warn = vi.fn()
    })
    test.each(
      [
        { wordOfTheDay: "FLY", reason: "length is less than 5" },
        { wordOfTheDay: "tests", reason: "every letter must be in uppercase" },
        { wordOfTheDay: "AQFJG", reason: "the word must be a valid English" }
      ]
    )("Since $reason: $wordOfTheDay is invalid, a warning must be emitted", async({ wordOfTheDay }) => {    
      mount(WordleBoard, {props: {wordOfTheDay}})
    
      expect(console.warn).toHaveBeenCalled()
     })
    
     test("no warning is needed if the word of the day is provided is a real uppercase English word with 5 characters", async() => {    
      mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})
    
      expect(console.warn).not.toHaveBeenCalled()
     })
  })

  describe("Player input", () => {
    test(`player guesses are limited to ${WORD_SIZE} letters`, async () => {
      await playerSubmitsGuess(wordOfTheDay + 'EXTRA')
      
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test("player guesses are only be submitted if they are real words", async () => {
      await playerSubmitsGuess("QWERT")

      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })

    test("player guesses are note case-sensitive", async () => {
      await playerSubmitsGuess(wordOfTheDay.toLowerCase())

      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })

    test("player guesses can only contain letters", async () => {
      await playerSubmitsGuess("H3!RT")

      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual('HRT')
    })

    test.skip("non-letter characters do not render on the screen while being typed", async () => {
      await playerSubmitsGuess("123")

      expect(wrapper.find<HTMLInputElement>('input[type=text]').element.value).toEqual("")
    })
  })
})
