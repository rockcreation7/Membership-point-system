import axios from "axios"
import {
  FORM_SUBMIT,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAIL,
  FORM_LIST_REQUEST,
  FORM_LIST_SUCCESS,
  FORM_LIST_FAIL,
} from "../constants/formConstants"
import { Dispatch } from "redux"
import config from "../config.js"
const apiURL = config.API_URL

const listforms = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: FORM_LIST_REQUEST })
    const { data } = await axios.get(apiURL + "/form/list")
    dispatch({ type: FORM_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FORM_LIST_FAIL, payload: error.message })
  }
}

const formSubmit = (data: object, callback: Function) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: FORM_SUBMIT })
  await axios
    .post(apiURL + "/form", data)
    .then((response) => {
      dispatch({
        type: FORM_SUBMIT_SUCCESS,
        payload: response,
      })
      callback()
    })
    .catch((error) => { 
      // beware axios console will hide msg, cant log, use error.response to diplay
      dispatch({ type: FORM_SUBMIT_FAIL, payload: error.response })
    })
}

export { formSubmit, listforms }
