import React, { useContext, useEffect } from 'react';
import registerPic from '../assets/register.png';
import userImage from '../assets/user.png';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Axios from 'axios';
import { toast } from 'react-toastify';
import './course.css';

import GetStarted from './UI/GetStarted';

import {
  FileText,
  Download,
  Grid,
  ArrowRight,
  Codesandbox,
  ArrowLeft,
  Eye,
  EyeOff,
  Briefcase,
  Dribbble,
  Box,
} from 'react-feather';

import '../App.css';
import { getRandomUser } from './random';
import { UserTypeContext } from '../contexts/UserTypeContext';
import { StudentDetailsContext } from '../contexts/StudentDetailsContext';
import { TeacherDetailsContext } from '../contexts/TeacherDetailsContext';

import md5 from 'md5';
let randomUser = getRandomUser();
export const yearOptions = [
  {
    value: 'FE',
    label: 'First Year',
  },
  {
    value: 'SE',
    label: 'Second Year',
  },
  {
    value: 'TE',
    label: 'Third Year',
  },
  {
    value: 'BE',
    label: 'Fourth Year',
  },
];

export const departmentOptions = [
  {
    value: 'ISE',
    label: 'Information Science And Engineering',
  },
  {
    value: 'CS',
    label: 'Computer Science',
  },
  {
    value: 'ECE',
    label: 'Electronics And Communication',
  },
  {
    value: 'EEE',
    label: 'Electrical And Electronics',
  },
  {
    value: 'ME',
    label: 'Mechanical',
  },
];

export const featuresInfo = [
  {
    img: <Grid color='#09A407' size={22} />,
    text: 'Join multiple courses under a single classroom',
  },
  {
    img: <Download color='#09A407' size={22} />,
    text: 'Download files for study',
  },
  {
    img: <FileText color='#09A407' size={22} />,
    text: 'Share assignments and study material easily',
  },
  {
    img: <Box color='#09A407' size={22} />,
    text: 'All features on a single platform',
  },
];

const Features = () => {
  return featuresInfo.map((feature) => {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '15px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '2.1rem',
            height: '2.1rem',
            backgroundColor: '#09A4071a',
            borderRadius: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {feature.img}
        </div>
        <div style={{ flexGrow: 1, alignItems: 'flex-start', display: 'flex' }}>
          <p
            style={{
              fontFamily: 'Poppins',
              fontSize: 17,
              color: '#878787',
              fontWeight: 500,
              paddingLeft: 20,
              margin: 0,
            }}
          >
            {feature.text}
          </p>
        </div>
      </div>
    );
  });
};

const encrypt = (password) => {
  var buffer1 = md5(password);
  var buffer2 = md5(buffer1);
  return md5(buffer2);
};

const RegistrationDetails = ({
  goBack,
  setLogin,
  userType,
  setUserType,
  setStudentDetails,
}) => {
  const [fName, setfName] = React.useState('');
  const [lName, setlName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [viewPassword, setViewPassword] = React.useState(true);
  const [studentClass, setStudentClass] = React.useState(yearOptions[0].value);
  const [studentDepartment, setStudentDepartment] = React.useState(
    departmentOptions[0].value
  );
  const [isStudent, setIsStudent] = React.useState(userType === 'student');

  const onChangefName = (e) => setfName(e.target.value);
  const onChangelName = (e) => setlName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const validateFName = () => {
    let isValid = true;
    if (!fName.length) {
      isValid = false;
    }

    if (/[0-9]/.test(fName)) {
      isValid = false;
    }

    return isValid;
  };

  const validateLName = () => {
    let isValid = true;
    if (!lName.length) {
      isValid = false;
    }

    if (/[0-9]/.test(lName)) {
      isValid = false;
    }

    return isValid;
  };

  const validatePassword = () => {
    let isValid = true;
    if (!password.length) {
      isValid = false;
    }

    return isValid;
  };

  const validateEmail = () => {
    let isValid = true;
    if (!email.length) {
      isValid = false;
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      isValid = false;
    }
    return isValid;
  };

  const registerStudent = () => {
    if (
      !validateEmail() ||
      !validateLName() ||
      !validateFName() ||
      !validatePassword()
    ) {
      return toast.error('Form is invalid');
    }

    Axios.post('https://dbms-back.herokuapp.com/student', {
      fname: fName,
      lname: lName,
      email: email,
      password: encrypt(password),
      year: studentClass,
      department: studentDepartment,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          Axios.post('https://dbms-back.herokuapp.com/student_login', {
            email: email,
            password: encrypt(password),
          }).then((res) => {
            console.log(res.data.student);
            if (res.data.student === 'found') {
              const a = res.data.data;
              const details = a[0];
              toast.success('Registration Successful! Logging in..');
              setTimeout(() => {
                localStorage.setItem('userDetails', JSON.stringify(details));
                localStorage.setItem('userType', JSON.stringify('student'));
                window.location.href = '/';
              }, 2000);
            }
          });
          // let details = {
          //     fname: fName,
          //     lname: lName,
          //     email: email,
          //     password: encrypt(password),
          //     year: studentClass,
          //     department: studentDepartment
          // };
          // toast.success('Registration Successful! Logging in..')
          // setTimeout(() => {
          //     localStorage.setItem('userDetails',JSON.stringify(details))
          //     localStorage.setItem('userType',JSON.stringify('student'))
          //     window.location.href="/"
          // }, 2000);
        } else if (res.data.success === false) {
          if (res.data.reason === 'Email exists') {
            console.log(res.data.reason);
            toast.error('Account with this Email already exists');
          } else {
            console.log(res.data.message);
            toast.error('Error');
          }
        } else {
          console.log('error');
          toast.error('Error');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error');
      });
  };

  const registerTeacher = () => {
    if (
      !validateEmail() ||
      !validateLName() ||
      !validateFName() ||
      !validatePassword()
    ) {
      return toast.error('Form is invalid');
    }

    Axios.post('https://dbms-back.herokuapp.com/teacher', {
      fname: fName,
      lname: lName,
      email: email,
      password: encrypt(password),
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          Axios.post('https://dbms-back.herokuapp.com/teacher_login', {
            email: email,
            password: encrypt(password),
          }).then((res) => {
            console.log(res.data.teacher);
            if (res.data.teacher === 'found') {
              const a = res.data.data;
              const details = a[0];
              toast.success('Registration Successful! Logging in..');
              setTimeout(() => {
                localStorage.setItem('userDetails', JSON.stringify(details));
                localStorage.setItem('userType', JSON.stringify('teacher'));
                window.location.href = '/';
              }, 2000);
            }
          });
        } else if (res.data.success === false) {
          if (res.data.reason === 'Email exists') {
            console.log(res.data.reason);
            toast.error('Account with this Email already exists');
          } else {
            console.log(res.data.message);
            toast.error('Error');
          }
        } else {
          console.log('error');
          toast.error('Error');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error');
      });
  };

  console.log('User type recieved in registration page is "', userType, '" ');

  return (
    <React.Fragment>
      <ArrowLeft
        size={25}
        color='#545454'
        onClick={() => goBack()}
        style={{ cursor: 'pointer', position: 'absolute' }}
      />
      <div
        style={{
          position: 'absolute',
          right: 30,
          fontFamily: 'Poppins',
          fontSize: 16,
          color: '#09a407',
          fontWeight: 600,
          cursor: 'pointer',
        }}
        onClick={() => setLogin()}
      >
        Already have an account ? Login now
      </div>

      <div
        style={{
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '5%',
          marginTop: 10,
        }}
      >
        <div
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '5rem',
            backgroundColor: '#eeeeee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img src={randomUser} style={{ width: '3.5rem', marginTop: 10 }} />
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <h2
            style={{
              textAlign: 'left',
              fontFamily: 'Poppins',
              color: '#545454',
              fontWeight: 600,
              fontSize: 26,
            }}
          >
            Welcome
          </h2>
          <p
            style={{
              fontFamily: 'Mulish',
              fontSize: 17,
              color: '#ababab',
              fontWeight: 600,
              margin: 0,
            }}
          >
            Enter few more details to get started
          </p>
        </div>
      </div>

      <br />

      {/* User Type */}

      <p
        style={{
          fontFamily: 'Poppins',
          fontSize: 16,
          color: '#545454',
          fontWeight: 600,
          margin: 0,
          textAlign: 'left',
          marginBottom: '0.5rem',
        }}
      >
        Are you a student or a teacher/instructor ?
      </p>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label
            class='checkbox-container'
            style={{ borderColor: isStudent ? '#09a407' : '#eee' }}
          >
            <Dribbble size={22} style={{ marginRight: 15 }} color='#545454' />
            Student
            <input
              type='checkbox'
              onClick={() => {
                setIsStudent(true);
                setUserType('student');
              }}
              checked={isStudent}
            />
            <span class='checkmark'></span>
          </label>
          <label
            class='checkbox-container'
            style={{ borderColor: !isStudent ? '#09a407' : '#eee' }}
          >
            <Briefcase size={22} style={{ marginRight: 15 }} color='#545454' />
            Teacher
            <input
              type='checkbox'
              onClick={() => {
                setIsStudent(false);
                setUserType('teacher');
              }}
              checked={!isStudent}
            />
            <span class='checkmark'></span>
          </label>
        </div>
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: 'Poppins',
          fontSize: 16,
          color: '#545454',
          fontWeight: 600,
          margin: 0,
          textAlign: 'left',
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        Personal Information
      </p>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div
          style={{ width: '50%', alignItems: 'flex-start', display: 'flex' }}
        >
          <input
            placeholder='First Name'
            onChange={onChangefName}
            // onBlur={() => validateFName() ? null : toast.error('First name cannot be empty')}
          />
        </div>
        <div style={{ width: '50%' }}>
          <input
            placeholder='Last Name'
            onChange={onChangelName}
            // onBlur={() => validateLName() ? null : toast.error('Last name cannot be empty')}
          />
        </div>
      </div>

      {isStudent ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          <div
            style={{ width: '50%', display: 'flex', flexDirection: 'column' }}
          >
            <p
              style={{
                fontFamily: 'Poppins',
                fontSize: 16,
                color: '#545454',
                fontWeight: 600,
                margin: 0,
                textAlign: 'left',
                marginBottom: '0.5rem',
              }}
            >
              Select your class
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Dropdown
                options={yearOptions}
                onChange={(option) => setStudentClass(option.value)}
                value={yearOptions[0].value}
                placeholder='Select an option'
                className='dropdown'
              />
            </div>
          </div>
          <div
            style={{ width: '50%', display: 'flex', flexDirection: 'column' }}
          >
            <p
              style={{
                fontFamily: 'Poppins',
                fontSize: 16,
                color: '#545454',
                fontWeight: 600,
                margin: 0,
                textAlign: 'left',
                marginBottom: '0.5rem',
              }}
            >
              Select your Department
            </p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Dropdown
                options={departmentOptions}
                onChange={(option) => setStudentDepartment(option.value)}
                value={departmentOptions[0].value}
                placeholder='Select an option'
                className='dropdown'
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Email Password */}

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 25,
        }}
      >
        {/* <div style={{width: '1.8rem', height: '1.8rem', backgroundColor: '#09a4071a', borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center" , marginRight:15, border: '0px solid #09a407'}}>
                    <Lock size={19} color="#09a407"/>
                </div> */}
        <p
          style={{
            fontFamily: 'Poppins',
            fontSize: 16,
            color: '#545454',
            fontWeight: 600,
            margin: 0,
            textAlign: 'left',
          }}
        >
          Email and Password
        </p>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <div
          style={{ width: '50%', alignItems: 'flex-start', display: 'flex' }}
        >
          <input
            type='email'
            placeholder='Email ID'
            onChange={onChangeEmail}
            // onBlur={() => validateEmail() ? null : toast.error('Invalid Email ID')}
          />
        </div>
        <div style={{ width: '50%' }}>
          <div
            style={{
              display: 'inline-flex',
              position: 'relative',
              width: '100%',
            }}
          >
            <input
              type={viewPassword ? 'password' : 'text'}
              placeholder='Password'
              onChange={onChangePassword}
              style={{ marginRight: 0 }}
              // onBlur={() => validatePassword() ? null : toast.error('Password cannot be empty!')}
            />
            {viewPassword ? (
              <Eye
                size={22}
                color='#ababab'
                style={{
                  position: 'absolute',
                  left: '85%',
                  zIndex: 12,
                  marginTop: 10,
                  cursor: 'pointer',
                }}
                onClick={() => setViewPassword(!viewPassword)}
              />
            ) : (
              <EyeOff
                size={22}
                color='#ababab'
                style={{
                  position: 'absolute',
                  left: '85%',
                  zIndex: 12,
                  marginTop: 10,
                  cursor: 'pointer',
                }}
                onClick={() => setViewPassword(!viewPassword)}
              />
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          alignItems: 'flex-end',
          display: 'flex',
          flexDirection: 'column',
          marginRight: 10,
        }}
      >
        <button
          onClick={userType === 'student' ? registerStudent : registerTeacher}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'white',
              margin: 0,
              fontFamily: 'Poppins',
              letterSpacing: 0.4,
            }}
          >
            Register
          </p>
        </button>
      </div>
    </React.Fragment>
  );
};

const Login = ({
  goBack,
  setLogin,
  userType,
  setUserType,
  studentDetails,
  setStudentDetails,
  teacherDetails,
  setTeacherDetails,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [viewPassword, setViewPassword] = React.useState(true);
  const [isStudent, setIsStudent] = React.useState(true);

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  useEffect(() => {
    localStorage.setItem('fsocietyStudent', JSON.stringify(studentDetails));
  }, [studentDetails]);

  useEffect(() => {
    localStorage.setItem('fsocietyTeacher', JSON.stringify(teacherDetails));
  }, [teacherDetails]);

  // let localdata = localStorage.getItem('fsociety');
  // let details = localdata ? JSON.parse(localdata) : {};

  const validatePassword = () => {
    let isValid = true;
    if (!password.length) {
      isValid = false;
    }

    return isValid;
  };

  const validateEmail = () => {
    let isValid = true;
    if (!email.length) {
      isValid = false;
    }
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      isValid = false;
    }
    return isValid;
  };

  const loginStudent = () => {
    if (!validateEmail() || !validatePassword()) {
      return toast.error('Form is invalid');
    }

    Axios.post('https://dbms-back.herokuapp.com/student_login', {
      email: email,
      password: encrypt(password),
    }).then((res) => {
      console.log(res.data.student);
      if (res.data.student === 'found') {
        const a = res.data.data;
        const details = a[0];
        setStudentDetails(details);
      } else if (res.data.student !== 'found') {
        toast.error('User not found');
        console.log(res.data.message);
      } else console.log('error');
    });
  };

  const loginTeacher = () => {
    if (!validateEmail() || !validatePassword()) {
      return toast.error('Form is invalid');
    }

    Axios.post('https://dbms-back.herokuapp.com/teacher_login', {
      email: email,
      password: encrypt(password),
    }).then((res) => {
      console.log(res.data);
      if (res.data.teacher === 'found') {
        const a = res.data.data;
        const details = a[0];
        setTeacherDetails(details);
      } else if (res.data.teacher !== 'found') {
        toast.error('User not found');
        console.log(res.data.message);
      } else console.log('error');
    });
  };

  return (
    <React.Fragment>
      <ArrowLeft
        size={25}
        color='#545454'
        onClick={() => goBack()}
        style={{ cursor: 'pointer', position: 'absolute' }}
      />
      <div
        style={{
          position: 'absolute',
          right: 30,
          fontFamily: 'Poppins',
          fontSize: 16,
          color: '#09a407',
          fontWeight: 600,
          cursor: 'pointer',
        }}
        onClick={() => setLogin()}
      >
        New here ? Register now
      </div>

      <div
        style={{
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: '5%',
          marginTop: 10,
        }}
      >
        <div
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '5rem',
            backgroundColor: '#eeeeee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img src={randomUser} style={{ width: '3.5rem', marginTop: 10 }} />
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <h2
            style={{
              textAlign: 'left',
              fontFamily: 'Poppins',
              color: '#545454',
              fontWeight: 600,
              fontSize: 26,
            }}
          >
            Welcome Back
          </h2>
          <p
            style={{
              fontFamily: 'Mulish',
              fontSize: 17,
              color: '#ababab',
              fontWeight: 600,
              margin: 0,
            }}
          >
            Enter your login credentials to access your classroom
          </p>
        </div>
      </div>

      <p
        style={{
          fontFamily: 'Poppins',
          fontSize: 16,
          color: '#545454',
          fontWeight: 600,
          margin: 0,
          textAlign: 'left',
          marginBottom: '0.5rem',
          marginTop: 30,
        }}
      >
        Log in as a student or a teacher/instructor ?
      </p>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label
            class='checkbox-container'
            style={{ borderColor: isStudent ? '#09a407' : '#eee' }}
          >
            <Dribbble size={22} style={{ marginRight: 15 }} color='#545454' />
            Student
            <input
              type='checkbox'
              onClick={() => {
                setIsStudent(true);
                setUserType('student');
              }}
              checked={isStudent}
            />
            <span class='checkmark'></span>
          </label>
          <label
            class='checkbox-container'
            style={{ borderColor: !isStudent ? '#09a407' : '#eee' }}
          >
            <Briefcase size={22} style={{ marginRight: 15 }} color='#545454' />
            Teacher
            <input
              type='checkbox'
              onClick={() => {
                setIsStudent(false);
                setUserType('teacher');
              }}
              checked={!isStudent}
            />
            <span class='checkmark'></span>
          </label>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 25,
        }}
      >
        <p
          style={{
            fontFamily: 'Poppins',
            fontSize: 16,
            color: '#545454',
            fontWeight: 600,
            margin: 0,
            textAlign: 'left',
          }}
        >
          Email and Password
        </p>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <div
          style={{ width: '50%', alignItems: 'flex-start', display: 'flex' }}
        >
          <input
            type='email'
            placeholder='Email ID'
            onChange={onChangeEmail}
            // onBlur={() => validateEmail() ? null : toast.error('Invalid Email ID')}
          />
        </div>
        <div style={{ width: '50%' }}>
          <div
            style={{
              display: 'inline-flex',
              position: 'relative',
              width: '100%',
            }}
          >
            <input
              type={viewPassword ? 'password' : 'text'}
              placeholder='Password'
              onChange={onChangePassword}
              style={{ marginRight: 0 }}
              // onBlur={() => validatePassword() ? null : toast.error('Password cannot be empty!')}
            />
            {viewPassword ? (
              <Eye
                size={22}
                color='#ababab'
                style={{
                  position: 'absolute',
                  left: '85%',
                  zIndex: 12,
                  marginTop: 10,
                  cursor: 'pointer',
                }}
                onClick={() => setViewPassword(!viewPassword)}
              />
            ) : (
              <EyeOff
                size={22}
                color='#ababab'
                style={{
                  position: 'absolute',
                  left: '85%',
                  zIndex: 12,
                  marginTop: 10,
                  cursor: 'pointer',
                }}
                onClick={() => setViewPassword(!viewPassword)}
              />
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 20,
          alignItems: 'flex-end',
          display: 'flex',
          flexDirection: 'column',
          marginRight: 10,
        }}
      >
        <button onClick={userType === 'student' ? loginStudent : loginTeacher}>
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'white',
              margin: 0,
              fontFamily: 'Poppins',
              letterSpacing: 0.4,
            }}
          >
            Login
          </p>
        </button>
      </div>

      <br />
    </React.Fragment>
  );
};

const Register = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);

  const { userType, setUserType } = useContext(UserTypeContext);
  console.log(userType);
  const { studentDetails, setStudentDetails } = useContext(
    StudentDetailsContext
  );
  const { teacherDetails, setTeacherDetails } = useContext(
    TeacherDetailsContext
  );

  return (
    <div
      style={{
        width: '100%',
        height: window.innerHeight,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'visible',
      }}
    >
      {/* Left side */}
      <div
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: '#f6f6f6',
          overflow: 'visible',
          zIndex: 999,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '1rem',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: '15%',
            justifyContent: 'center',
          }}
        >
          <Codesandbox size={30} color='#09A407' />
          <div style={{ alignItems: 'flex-start', display: 'flex' }}>
            <p
              style={{
                fontFamily: 'Poppins',
                fontSize: 19,
                color: '#232323',
                fontWeight: 600,
                paddingLeft: 10,
                margin: 0,
              }}
            >
              CMRIT Project Management
            </p>
          </div>
        </div>

        <img
          src={registerPic}
          style={{
            width: '110%',
            alignSelf: 'center',
            marginTop: '20%',
            zIndex: 999,
            marginLeft: '-2%',
          }}
        />
      </div>

      {/* Right main side */}
      <div
        style={{
          width: '50%',
          height: '100%',
          backgroundColor: 'white',
          display: 'flex',
          padding: '2rem',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          zIndex: 998,
          paddingLeft: '3rem',
        }}
      >
        {showForm ? (
          isLogin ? (
            <Login
              userType={userType}
              setUserType={setUserType}
              setStudentDetails={setStudentDetails}
              studentDetails={studentDetails}
              setTeacherDetails={setTeacherDetails}
              teacherDetails={teacherDetails}
              goBack={() => setShowForm(false)}
              setLogin={() => setIsLogin(false)}
            />
          ) : (
            <RegistrationDetails
              userType={userType}
              setUserType={setUserType}
              setStudentDetails={setStudentDetails}
              goBack={() => setShowForm(false)}
              setLogin={() => setIsLogin(true)}
            />
          )
        ) : (
          <GetStarted goNext={() => setShowForm(true)} />
        )}
      </div>
    </div>
  );
};

export default Register;
