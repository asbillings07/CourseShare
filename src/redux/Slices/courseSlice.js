import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    courseData: [],
    errors: [],
}

const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading
          },
        isError: (state, action) => {
            state.errors.push(action.payload)
            toggleLoading()
        },
        gotCourseData: (state, action) => {
            state.courseData = action.payload
            toggleLoading()
        },
        createdCourse: (state, action) => {
            
        },
        updatedCourse: (state, action) => {

        },
        deletedCourse: (state, action) => {

        }

    }
})

export default courseSlice.reducer
export const { isError, isLoading, gotCourseData, createdCourse, updatedCourse, deletedCourse} = courseSlice.actions

export const getAllCourses = () => {
    return async dispatch => {
        dispatch(toggleLoading())
        try {
        const courses = await axios.get(`${config.apiBaseUrl}/courses`)
        dispatch(gotCourseData(courses.data))
        } catch (err) {
        dispatch(isError(err.message))
        }
    }
    }


  // creates course
  export const createCourse = (email, password, info) => {
      return async dispatch => {
    const res = await request(`/courses`, 'POST', info, true, {
      email,
      password,
    })
    

}
  }
  // deletes course
  export async function deleteCourse(email, password, id) {
    const res = await request(`/courses/${id}`, 'DELETE', null, true, {
      email,
      password,
    });
    if (res.status === 204) {
      return [];
    } else if (res.status === 401 || res.status === 403) {
      return res
    }
  }
  // updates course
  export async function updateCourse(email, password, info, id) {
    const res = await request(`/courses/${id}`, 'PUT', info, true, {
      email,
      password,
    });
    if (res.status === 204) {
      return res;
    } else if (res.status === 401 || res.status === 400) {
      return res
    }
  }
