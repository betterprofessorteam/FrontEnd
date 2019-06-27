import React, { useEffect } from "react";
import axios from "axios";
import { useStateValue } from "react-conflux";
import { stateContext } from "../store";

const UserProfile = () => {
  const [state, dispatch] = useStateValue(stateContext);

  //   useEffect(() => {
  //     axios
  //       .get(`https://better-professor.herokuapp.com/users/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       })
  //       .then(res => {});
  //   });

  //   useEffect(() => {
  //     axios
  //       .get("https://better-professor.herokuapp.com/user/students", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       })
  //       .then(res => {
  //         console.log("RES.DATA", res.data);
  //         setStudents(
  //           res.data.sort((a, b) =>
  //             a.studentData.lastName > b.studentData.lastName
  //               ? 1
  //               : a.studentData.lastName === b.studentData.lastName
  //               ? 1
  //               : -1
  //           )
  //         );
  //       })
  //       .catch(err => {
  //         dispatch({
  //           type: STUDENT_SEARCH_FAIL,
  //           payload: `${err.response.status}
  //                 ${err.response.data.error_description}`
  //         });
  //       });
  //   }, []);

  return (
    <>
      <h1>USER PROFILE</h1>
    </>
  );
};

export default UserProfile;

//https://better-professor.herokuapp.com/users/250
