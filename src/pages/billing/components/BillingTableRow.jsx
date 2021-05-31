import React, { useState, useCallback } from "react";

import ExpandedSection from "./ExpandedSection";
import "../../../styles/billing.scss";
import { formatDate } from "../../../utils/Utils.js";

const moment = require("moment");

const BillingTableRow = ({ item, index, serialNumber, mobile }) => {
  const [showExpandedDetails, setShowExpandedDetails] = useState(false);
  // Logic for handling bad data
  let firstName, lastName, email, mobileNumber;
  let badData = false;

  if (
    item.application !== null &&
    item.application.personal_info !== null &&
    item.application.personal_info.form !== null
  ) {
    const form = item.application.personal_info.form;
    firstName = form.firstName;
    lastName = form.lastName;
    email = form.email;
    mobileNumber = form.mobileNumber;
    console.log({ item });
  } else {
    badData = true;
  }
  const handleShowExpandedDetails = useCallback(() => {
    setShowExpandedDetails(!showExpandedDetails);
  }, [showExpandedDetails]);

  // const dateObj = new Date(JSON.parse(item.start_date));
  // const momentObj = moment(dateObj);
  // const formattedDate = momentObj.format("MM/DD/YYYY hh:mm:ss");
  const formattedDate = formatDate(item.application.purchase_detail.form.firstPayment)

  return (
    <div className="custom-row-wrapper">
      {/* Desktop View */}
      {!badData && (
        <div
          className={mobile ? "custom-row-mobile" : "custom-row-desktop"}
          onClick={() => {
            setShowExpandedDetails(!showExpandedDetails);
          }}
        >
          <div className="left-column">{item.status}</div>
          <div className="middle-column">
            <div className="middle-column__section">
              {firstName} {lastName}
            </div>
            <div className="middle-column__section">{item.plan.amount}</div>
            <div className="middle-column__section">{formattedDate}</div>
            <div className="middle-column__section">{item.plan.interval}</div>
            <div className="middle-column__section">
              {item.plan.interval_count}
            </div>
          </div>
        </div>
      )}

      {showExpandedDetails && (
        <ExpandedSection application={item.application} />
      )}
    </div>
  );
};

export default BillingTableRow;
