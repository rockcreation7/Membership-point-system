import { formReducer } from "./formReducers"

test("submitReducers", () => {
  const submitReducers = formReducer({}, { type: "FORM_SUBMIT", payload: {} })
  expect(submitReducers).toEqual({ loading: true })
})

test("successReducers", () => {
  const successReducers = formReducer(
    {},
    { type: "FORM_SUBMIT_SUCCESS", payload: {successData:'errorData'} }
  )
  expect(successReducers).toEqual({ loading: false, success: true, data: {successData:'errorData'}})
})

test("failReducers", () => {
  const failReducers = formReducer({}, { type: "FORM_SUBMIT_FAIL", payload: {errorData:'errorData'} })
  expect(failReducers).toEqual({ loading: false, success: false, error: {errorData:'errorData'} })
})
