import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Button } from "semantic-ui-react";
import MoreDetailsModal from "./MoreDetailsModal.jsx";
import { formatDate } from "../../../utils/Utils.js";
import "../../../styles/billing.scss";
import { getBillingTransactionHistory } from "../../../redux/actions/billing";

const ExpandedSection = ({ application }) => {
  console.log({ application });
  const dispatch = useDispatch();
  const { id } = application;
  const {
    amountFinance,
    apr,
    monthlyPayment,
    numberOfmonthlyPayment,
    downPayment,
    firstPayment,
  } = application.purchase_detail.form;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="expanded-section">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Amount Financed</Table.HeaderCell>
              <Table.HeaderCell>APR</Table.HeaderCell>
              <Table.HeaderCell>Monthly Payment</Table.HeaderCell>
              <Table.HeaderCell>Number of Monthly Payments</Table.HeaderCell>
              <Table.HeaderCell>Down Payment</Table.HeaderCell>
              <Table.HeaderCell>First Payment Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{amountFinance}</Table.Cell>
              <Table.Cell>{apr}</Table.Cell>
              <Table.Cell>{monthlyPayment}</Table.Cell>
              <Table.Cell>{numberOfmonthlyPayment}</Table.Cell>
              <Table.Cell>{downPayment}</Table.Cell>
              <Table.Cell>{formatDate(firstPayment)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Button
          onClick={() => {
            dispatch(getBillingTransactionHistory(id));
            setModalOpen(true);
          }}
          positive
        >
          View Transaction History
        </Button>
      </div>
      <MoreDetailsModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </>
  );
};

export default ExpandedSection;
