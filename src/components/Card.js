import React, { useRef, useState } from "react";
import { exportComponentAsPDF } from "react-component-export-image";
import { useDispatch, useSelector } from "react-redux";
import html2Pdf from "html2pdf.js";

import { Dropdown, Card, Form, Input, Divider } from "semantic-ui-react";
import { formatNumber, isEmail } from "../utils/Utils";
import { updateApplication, updateStatus } from "../redux/";

import { useHistory } from "react-router-dom";

import dayjs from "dayjs";

//import style
import "../styles/global.scss";
import "../styles/form.scss";

import PdfDisplay from "./PdfDisplay";
import PdfTemplate from "./PdfTemplate";

const CardForm = ({ userData, i }) => {
    const [more, setMore] = useState(false);
    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState(
        userData && userData.personal_info && userData.personal_info.form === null
            ? ""
            : userData.personal_info.form.email
    );
    const [error, setError] = useState("");
    const state = useSelector((state) => state.app);

    const myRef = useRef();

    const dispatch = useDispatch();
    const history = useHistory();

    console.log({ userData });

    const updateEmail = (e) => {
        e.preventDefault();
        setError("");
        const validEmail = isEmail(email);
        if (!validEmail) {
            setError("Must be a valid email address");
            return;
        } else {
            if (userData && userData.personal_info) {
                const data = {
                    personal_info: {
                        form: {
                            firstName:
                                userData.personal_info.form === null ? "" : userData.personal_info.form.firstName,
                            lastName: userData.personal_info.form === null ? "" : userData.personal_info.form.lastName,
                            middleName:
                                userData.personal_info.form === null ? "" : userData.personal_info.form.middleName,
                            suffix: userData.personal_info.form === null ? "" : userData.personal_info.form.suffix,
                            state: userData.personal_info.form === null ? "" : userData.personal_info.form.state,
                            city: userData.personal_info.form === null ? "" : userData.personal_info.form.city,
                            address: userData.personal_info.form === null ? "" : userData.personal_info.form.address,
                            zipCode: userData.personal_info.form === null ? "" : userData.personal_info.form.zipCode,
                            appSuite: userData.personal_info.form.appSuite,
                            homeNumber:
                                userData.personal_info.form === null ? "" : userData.personal_info.form.homeNumber,
                            mobileNumber:
                                userData.personal_info.form === null ? "" : userData.personal_info.form.mobileNumber,
                            socialSecurity:
                                userData.personal_info.form === null ? "" : userData.personal_info.form.socialSecurity,
                            dateOfBirth:
                                userData.personal_info.form === null ? "" : userData.personal_info.form.dateOfBirth,
                            email
                        }
                    }
                };
                dispatch(updateApplication(data, userData && userData.id, history));
                if (state.isAppLoading === false) {
                    setTimeout(() => {
                        setEdit(false);
                    }, 2000);
                }
            }
        }
    };

    const handleDownloadPdf = () => {
        var opt = {
            margin: 0.5,
            filename: `${userData.personal_info.form.lastName}_${dayjs(userData.createdAt).format("MM-DD-YYYY_hh-mm A")}.pdf`,
            image: { type: "jpeg", quality: 0.80 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };
        const elem = document.querySelector(".pdf-template-wrapper");
        html2Pdf().from(elem).set(opt).save();
    };

    return (
        <div>
            {/* <PdfDisplay userData={userData} ref={myRef} /> */}
            <PdfTemplate userData={userData} />
            <Card fluid>
                <Card.Content>
                    <div className="income-action" key={i}>
                        <div>
                            <small>{userData && dayjs(userData.createdAt).format("dddd, MMMM DD YYYY, hh:mm A")}</small>
                        </div>
                        <div className="actions">
                            <Dropdown className="drop" text="Actions">
                                <Dropdown.Menu>
                                    <Dropdown.Item text="Download PDF" onClick={handleDownloadPdf} />
                                    <Dropdown.Item
                                        onClick={() => history.push(`/credit?id=${userData && userData.id}`)}
                                        text="Edit Application"
                                    />
                                    <Dropdown.Item
                                        onClick={() =>
                                            history.push(`/credit?tab=cobuyer&id=${userData && userData.id}`)
                                        }
                                        text="Add Co-Buyer / Additional Info"
                                    />
                                    {userData && userData.status !== 1 && (
                                        <Dropdown.Item
                                            onClick={() =>
                                                dispatch(updateStatus(userData && userData.id, { status: 1 }))
                                            }
                                            text="APPROVE"
                                        />
                                    )}
                                    <Dropdown.Item
                                        text="REJECT"
                                        onClick={() => dispatch(updateStatus(userData && userData.id, { status: -1 }))}
                                    />
                                    {userData && userData.status === 1 && (
                                        <>
                                            <Dropdown.Item
                                                text="COMPLETE"
                                                onClick={() =>
                                                    dispatch(updateStatus(userData && userData.id, { status: 3 }))
                                                }
                                            />
                                            <Dropdown.Item
                                                text="Billing Form"
                                                onClick={() => {
                                                    history.push(`/form/initial-billing/${userData.id}`);
                                                }}
                                            />
                                        </>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="income" key={i + 1}>
                        <div>
                            <small>
                                {(userData && userData.personal_info && userData.personal_info.form && (
                                    <span>
                                        {userData.personal_info.form.firstName}{" "}
                                        <span>{userData.personal_info.form.middleName}. </span>
                                        <span>{userData.personal_info.form.lastName}</span>
                                    </span>
                                )) ||
                                    userData.name}
                            </small>
                            <br />
                            <small>Account #{userData && userData.id}</small>
                        </div>
                        <div>
                            <br />
                            <small>{userData && userData.description}</small>
                            <br />
                            <small>
                                {userData && userData.status === 0
                                    ? "Pending"
                                    : userData.status === -1
                                    ? "Rejected"
                                    : userData.status === 2
                                    ? "Signed"
                                    : userData.status === 3
                                    ? "Completed"
                                    : userData.status === 1
                                    ? "Approved"
                                    : ""}
                            </small>
                            <br />
                            <small>
                                {userData &&
                                    userData.purchase_detail &&
                                    userData.purchase_detail.form &&
                                    formatNumber(
                                        String(parseInt(String(userData.purchase_detail.form.amountFinance).substr(1)))
                                    )}
                            </small>
                        </div>
                    </div>
                    {more ? (
                        <div>
                            <Divider />
                            <div className="income" key={i + 1}>
                                <div>
                                    <h2>LOAN DETAIL</h2>
                                </div>
                                <div>
                                    <small>Additional Details</small>
                                </div>
                            </div>
                            <Divider />
                            <br />
                            <div>
                                <Form className="form">
                                    <Form.Group widths="equal">
                                        <Form.Field
                                            control={Input}
                                            label="Amount Finance"
                                            placeholder="Amount Finance"
                                            value={
                                                userData &&
                                                userData.purchase_detail &&
                                                userData.purchase_detail.form &&
                                                formatNumber(
                                                    String(
                                                        parseInt(
                                                            String(userData.purchase_detail.form.amountFinance).substr(
                                                                1
                                                            )
                                                        )
                                                    )
                                                )
                                            }
                                            disabled
                                            id="hm"
                                        />
                                        <Form.Field
                                            control={Input}
                                            label="Merchant Payable"
                                            placeholder="Merchant Payable"
                                            value={
                                                userData &&
                                                userData.purchase_detail &&
                                                userData.purchase_detail.form &&
                                                formatNumber(
                                                    String(
                                                        parseInt(
                                                            parseInt(
                                                                String(
                                                                    userData.purchase_detail.form.amountFinance
                                                                ).substr(1)
                                                            ) * 0.7
                                                        )
                                                    )
                                                )
                                            }
                                            disabled
                                            className="hm"
                                        />
                                        <Form.Field
                                            control={Input}
                                            label="Qualified"
                                            placeholder="Qualified"
                                            id="form-group"
                                            value={"70%"}
                                            disabled
                                            className="hm"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Field
                                            control={Input}
                                            label="Payment Term"
                                            placeholder="Payment Term"
                                            id="form-group"
                                            value={
                                                userData &&
                                                userData.purchase_detail &&
                                                userData.purchase_detail.form &&
                                                userData.purchase_detail.form.numberOfmonthlyPayment
                                            }
                                            disabled
                                            className="hm"
                                        />
                                    </Form.Group>
                                    <div className="income">
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <p>
                                        <div>
                                            <h3>Customer Information</h3>
                                            <Divider />
                                            <br />
                                            <div>
                                                <strong>Buyer Email Address</strong>
                                                <br />
                                                <strong>
                                                    {userData &&
                                                    userData.personal_info &&
                                                    userData.personal_info.form === null
                                                        ? ""
                                                        : userData.personal_info.form.email}
                                                </strong>
                                                <br />

                                                <div>
                                                    {edit && (
                                                        <div className="income-edit">
                                                            <Form onSubmit={updateEmail}>
                                                                <div>
                                                                    <Form.Field
                                                                        control={Input}
                                                                        label="Edit email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        placeholder="Email address"
                                                                        required
                                                                        error={error ? error : null}
                                                                    />
                                                                </div>

                                                                <br />
                                                                <button className="green-small-btn">
                                                                    {state.isAppLoading ? "Loading.." : "Update"}
                                                                </button>
                                                            </Form>
                                                        </div>
                                                    )}
                                                </div>
                                                {edit ? (
                                                    ""
                                                ) : (
                                                    <div>
                                                        <button
                                                            onClick={() => setEdit(true)}
                                                            className="green-small-btn"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                )}

                                                <br />
                                            </div>
                                        </div>
                                        <Form.Group widths="equal">
                                            <Form.Field
                                                control={Input}
                                                label="Home Phone"
                                                placeholder="Home Phone"
                                                value={
                                                    userData &&
                                                    userData.purchase_detail &&
                                                    userData.purchase_detail.form &&
                                                    userData.personal_info.form.homeNumber
                                                }
                                                disabled
                                                className="hm"
                                            />
                                            <Form.Field
                                                control={Input}
                                                label="Cell Phone"
                                                placeholder="Cell Phone"
                                                value={
                                                    userData &&
                                                    userData.purchase_detail &&
                                                    userData.purchase_detail.form &&
                                                    userData.personal_info.form.mobileNumber
                                                }
                                                disabled
                                                className="hm"
                                            />
                                            <Form.Field
                                                control={Input}
                                                label="Business Phone"
                                                placeholder="Business Phone"
                                                disabled
                                                id="hm"
                                            />
                                        </Form.Group>
                                        <div>
                                            <h3>Sales Person Information</h3>
                                            <Divider />
                                            <br />
                                        </div>
                                        <Form.Group widths="equal" className="fg">
                                            <Form.Field
                                                control={Input}
                                                label="Sales Person Name"
                                                placeholder="SalesPerson Name"
                                                disabled
                                                id="hm"
                                            />
                                            <Form.Field
                                                control={Input}
                                                label="Sales Person Phone"
                                                placeholder="SalesPerson Phone"
                                                disabled
                                                id="hm"
                                            />
                                            <Form.Field
                                                control={Input}
                                                type="email"
                                                label="Sales Person Email"
                                                placeholder="SalesPerson Email"
                                                disabled
                                                id="hm"
                                            />
                                        </Form.Group>
                                    </p>
                                </Form>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </Card.Content>
                <Card.Content extra>
                    <p style={{ cursor: "pointer" }} onClick={() => setMore(!more)} id="base">
                        {more ? "Less Information" : "More Information"}
                    </p>
                </Card.Content>
            </Card>
        </div>
    );
};

export default CardForm;
