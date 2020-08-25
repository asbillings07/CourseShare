import React, { useEffect } from 'react';
import AddCourse from './AddCourse';
import Spinner from '../Spinner';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from "../../redux/Slices/courseSlice";

export const Courses = () => {

  const dispatch = useDispatch()
  const { loading, courseData, errors } = useSelector(state => state.courseSlice)

  useEffect(() => {
    dispatch(getAllCourses())
  }, [dispatch])


  // maps through all of the courses and displays them on the "/" page
  const showCourse = () => {
    return courseData.map(course => (
      <React.Fragment key={course.id}>
        <div className="grid">
          <Link
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h4 className="course--label">Course</h4>
            <FlexText>{course.title}</FlexText>
          </Link>
        </div>
      </React.Fragment>
    ))
  };

  
return errors ? <div>{errors}</div> : loading ? <Spinner size="4x" spinning="spinning" /> : (
        <React.Fragment>
          {showCourse()}
          <AddCourse />
        </React.Fragment>
      );
    
  
}

const FlexText = styled.h3`
  font-size: 18px;
  color: #fff;
  /* phones */
  @media (max-device-width: 767px) {
    font-size: 16px;
  }

  /* pads */
  @media (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 16px;
  }
`;
