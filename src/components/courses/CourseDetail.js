import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Spinner from '../Spinner';
import { getCourse, deleteCourse } from "../../redux/Slices/courseSlice";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

export const CourseDetail = ({ match, history }) => {

  const [message, setMessage] = useState('')
  const { firstName, lastName, loading, course, errors } = useSelector(state => state.courseSlice)
  const { authedUser } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()

 useEffect(() => {
  const { id } = match.params;
  dispatch(getCourse(id))
  
 }, [match.params, dispatch])

 useEffect(() => {
  setMessage(errors)
 }, [errors])

 const courseDelete = () => {
  const { id } = match.params;
  const { emailAddress } = authedUser
  dispatch(deleteCourse(emailAddress, id))
  history.push('/')
};
  // function that confirms if user wants to delete course
  const confirmDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        courseDelete()
      }
    })
  };
  // deletes course from REST API via delete method


return loading ? <Spinner size="4x" spinning="spinning" /> : (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                {/* The authenticated user's ID matches that of the user who owns the course. */}

                {authedUser && authedUser.id === course.userId ? (
                  <Link className="button" to={`/courses/${course.id}/update`}>
                    Update Course
                  </Link>
                ) : (
                  ''
                )}
                {authedUser && authedUser.id === course.userId ? (
                  <button
                    className="button"
                    onClick={() => confirmDelete()}
                  >
                    Delete Course
                  </button>
                ) : (
                  ''
                )}
              </span>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <h2>{message}</h2>
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
              <p>By Author: {`${firstName} ${lastName}`} </p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={`${course.description}`} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={`${course.materialsNeeded}`} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  
}
