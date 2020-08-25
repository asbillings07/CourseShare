import { createSlice } from '@reduxjs/toolkit'
import { request } from '../../Data'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie'

const MySwal = withReactContent(Swal)

const initialState = {
  loading: false,
  courseData: [],
  errors: null,
  course: [],
  firstName: '',
  lastName: ''
}

const courseSlice = createSlice({
  name: 'courseSlice',
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    isError: (state, action) => {
      state.errors = action.payload
      state.loading = false
    },
    gotAllCourseData: (state, action) => {
      state.courseData = action.payload
      state.loading = false
    },
    gotCourse: (state, action) => {
      const data = action.payload
      const course = data[0]

      state.course = course
      state.firstName = course.user.firstName
      state.lastName = course.user.lastName
      state.loading = false
    },
    createdCourse: (state, action) => {
      console.log(action.payload)
      state.loading = false
    },
    updatedCourse: (state, action) => {
      console.log(action.payload)
      state.loading = false
    },
    deletedCourse: (state, action) => {
      console.log(action.payload)
      state.loading = false
    }
  }
})

export default courseSlice.reducer
export const {
  isError,
  gotCourse,
  toggleLoading,
  gotAllCourseData,
  createdCourse,
  updatedCourse,
  deletedCourse
} = courseSlice.actions

export const getAllCourses = () => {
  return async (dispatch) => {
    console.log('DISPACH', dispatch)
    dispatch(toggleLoading())
    try {
      const courses = await request('/courses')
      dispatch(gotAllCourseData(courses.data))
    } catch (err) {
      dispatch(isError(err.message))
    }
  }
}

// course detail

export const getCourse = (id) => {
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await request(`/courses/${id}`)
      dispatch(gotCourse(res.data))
    } catch (err) {
      dispatch(isError(err.message))
    }
  }
}

// creates course
export const createCourse = (email, info) => {
  const password = Cookies.get('password')
  return async (dispatch) => {
    try {
      const res = await request(`/courses`, 'POST', info, true, {
        email,
        password
      })
      dispatch(createdCourse(res.data))
      dispatch(getAllCourses())
    } catch (err) {
      dispatch(isError(err.message))
    }
  }
}
// deletes course
export const deleteCourse = (email, id) => {
  const password = Cookies.get('password')
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await request(`/courses/${id}`, 'DELETE', null, true, {
        email,
        password
      })
      dispatch(deletedCourse(res.data))
      dispatch(getAllCourses())
    } catch (err) {
      dispatch(isError(err.message))
    }
  }
}
// updates course
export const updateCourse = (email, info, id) => {
  const password = Cookies.get('password')
  return async (dispatch) => {
    dispatch(toggleLoading())
    try {
      const res = await request(`/courses/${id}`, 'PUT', info, true, { email, password })
      dispatch(updatedCourse(res.data))
      dispatch(getAllCourses())
    } catch (err) {
      dispatch(isError(err.message))
    }
  }
}
