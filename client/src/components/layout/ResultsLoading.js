import React from "react";
import chart from "../../img/icons/chart.png";

export const ResultsLoading = () => {
  return (
    <div class="main-body-container">
      <div class="loading-modal">
        <div class="loading-wrapper">
          <div class="chart-wrapper">
            <img class="chart-icon" src={chart} />
            <img class="chart-icon" src={chart} />
          </div>

          <p class="loading-msg">loading...</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsLoading;
