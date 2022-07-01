import React from 'react';
import { ArrowRight } from 'react-feather';
const GetStarted = ({ goNext }) => {
  return (
    <React.Fragment>
      <h2
        style={{
          marginTop: '10%',
          marginBottom: '10%',
          width: 'auto',
          textAlign: 'left',
          fontFamily: 'Poppins',
          color: '#545454',
          fontWeight: 600,
          fontSize: 22,
          paddingRight: '10%',
        }}
      >
        Welcome to CMRIT Project Management
        <br />
      </h2>
      <h3
        style={{
          fontFamily: 'Poppins',
          color: '#545454',
          fontSize: 17,
          fontWeight: 500,
        }}
      >
        A Project portal for student and teacher to manage their projects with
        ease.
      </h3>

      {/* <Features /> */}
      <div style={{ marginTop: '10%' }}>
        <button onClick={() => goNext()}>
          {/* <Gift/> */}
          <p
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: 'white',
              margin: 0,
              fontFamily: 'Poppins',
              letterSpacing: 0.4,
            }}
          >
            Get Started
          </p>
          <ArrowRight
            size={25}
            color='white'
            style={{ marginLeft: '0.5rem' }}
          />
        </button>
      </div>
    </React.Fragment>
  );
};

export default GetStarted;
