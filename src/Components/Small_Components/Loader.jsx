import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <label>Please wait...</label>
        <div className="loading" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 350px;
    height: 180px;
    border-radius: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 30px;
    box-shadow: 2px 2px 10px -5px lightgrey;
  }
  .loading {
    width: 100%;
    height: 10px;
    background: lightgrey;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }
  .loading::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 10px;
    background: #002;
    border-radius: 10px;
    z-index: 1;
    animation: loading 0.6s alternate infinite;
  }
  label {
    color: #002;
    font-size: 18px;
    animation: bit 0.6s alternate infinite;
  }

  @keyframes bit {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes loading {
    0% {
      left: -25%;
    }
    100% {
      left: 70%;
    }
    0% {
      left: -25%;
    }
  }`;

export default Loader;
