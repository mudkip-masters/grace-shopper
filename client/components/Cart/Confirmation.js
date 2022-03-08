import React from "react";

const Confirmation = () => {
  return (
    <div className="funds-success-message-container">
      {/*   <div class="funds-checkmark-text-container">
        <div class="funds-checkmark-container">
          <svg
            class="funds-checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="funds-checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="funds-checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>

          <div class="funds-display-on-ie">
            <svg
              class="funds-ie-checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="funds-ie-checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="funds-ie-checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>

        <h1 class="funds-success-done-text">Done!</h1>
      </div>

      <div class="funds-success-message"> */}
      <h2>We think you made the right choice.</h2>
      <p>
        If you change your mind about who should have access to your electronic
        health information, you can return to My Account at any time to update
        your choice.
      </p>
    </div>
  );
};

export default Confirmation;
