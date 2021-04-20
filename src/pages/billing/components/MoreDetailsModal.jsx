import React from "react";
import { useSelector } from "react-redux";
import { Modal, Table, Popup, Button, TableCell } from "semantic-ui-react";
import { formatDate } from "../../../utils/Utils.js";
import "../../../styles/billing.scss";

const MoreDetailsModal = ({ setModalOpen, modalOpen }) => {
  const transactionHistory = useSelector(
    (state) => state.billing.transactionHistory
  );
  return (
    <Modal
      onClose={() => {
        setModalOpen(false);
      }}
      open={modalOpen}
      className="more-details-modal"
      size="large"
      id="transaction-modal"
    >
      <Modal.Header>{transactionHistory && transactionHistory[0] ? transactionHistory[0].source.account_holder_name : ""}</Modal.Header>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Amount Captured</Table.HeaderCell>
            <Table.HeaderCell>Outcome</Table.HeaderCell>
            <Table.HeaderCell>Payment Method Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactionHistory !== undefined &&
            transactionHistory.map(
              (
                {
                  amount,
                  amount_captured,
                  created,
                  outcome,
                  payment_method_details,
                },
                index
              ) => (
                <Table.Row key={index}>
                  <Table.Cell>{formatDate(created)}</Table.Cell>
                  <Table.Cell>{amount}</Table.Cell>
                  <Table.Cell>{amount_captured}</Table.Cell>
                  <Table.Cell>
                    {outcome ? outcome.network_status : ""}
                  </Table.Cell>
                  <Table.Cell>
                    <Popup
                      style={{ zIndex: "99999" }}
                      content={JSON.stringify(payment_method_details)}
                      trigger={<Button icon="info circle" />}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            )}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => {
                  setModalOpen(false);
                }}
                negative
              >
                Close
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Modal>
  );
};

export default MoreDetailsModal;
