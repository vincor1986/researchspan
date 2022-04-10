import React from "react";
import chart from "../../img/icons/chart.png";

export const ResultsLoading = ({ firstLoad }) => {
  return (
    <div class="loading-modal" id={!firstLoad ? "load-update" : ""}>
      <div class="loading-wrapper" id="always-opaque">
        <div class="chart-wrapper">
          <img class="chart-icon" src={chart} />
          <img class="chart-icon" src={chart} />
        </div>

        <p class="loading-msg">loading...</p>
      </div>
    </div>
  );
};

export default ResultsLoading;
