import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Icon,
  Menu,
  Checkbox,
  Container,
  Loader,
  Message,
} from "semantic-ui-react";
import _, { reject } from "lodash";
import { setTransactions } from "../../redux/slices/billing";
import axios from "axios";
import { setApplicationError, setAppLoading } from "../../redux/index";
import Navigation from "../../components/Navbar";

import BillingTableRow from "./components/BillingTableRow";
import { BILLING_URL } from "../../utils/Constants";

import "../../styles/billing.scss";

const Billing = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const transactions = useSelector((state) => state.billing.transactions);
  const [searchInput, setSearchInput] = useState("");

  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalNumPage, setTotalNumPage] = useState(0);
  const [checkBoxOptions, setCheckboxOptions] = useState({
    active: false,
    inactive: false,
  });
  const [mobile, setMobile] = useState(window.innerWidth < 768 ? true : false)

  const { active, inactive } = checkBoxOptions;

  //-------------------------------------------------------------
  //When user types into input
  //-------------------------------------------------------------
  const handleSearchInput = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  //-------------------------------------------------------------
  //Change page number
  //-------------------------------------------------------------
  const handleIncreasePageNumber = useCallback((e) => {
    setCurrentPageNumber((prevState) => prevState + 1);
  }, []);

  const handleDecreasePageNumber = useCallback((e) => {
    if (currentPageNumber === 0) return;
    setCurrentPageNumber((prevState) => prevState - 1);
  }, []);

  //-------------------------------------------------------------
  //When a checkbox is clicked, update the checkbox states
  //-------------------------------------------------------------
  const handleFilterByCheckBox = useCallback(
    (e, { value }) => {
      setCheckboxOptions((prevState) => {
        return {
          ...prevState,
          [value]: !checkBoxOptions[value],
        };
      });
    },
    [checkBoxOptions]
  );

  //-------------------------------------------------------------
  //Decide subset data to be displayed on table
  //-------------------------------------------------------------
  const handleDisplayData = useCallback(() => {
    const start = (currentPageNumber - 1) * dataPerPage;
    const end = (currentPageNumber - 1) * dataPerPage + 10;

    const set = filteredData.slice(start, end);

    setPaginatedData(set);
  }, [transactions, currentPageNumber, dataPerPage, filteredData]);

  //-------------------------------------------------------------
  //Once Input changes filter data
  //-------------------------------------------------------------
  useEffect(() => {
    if (searchInput) {
      const data = transactions.filter((item) => {
        const { firstName, lastName } = item;

        return (
          firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
          lastName.toLowerCase().includes(searchInput.toLowerCase())
        );
      });

      setFilteredData(data);
      setCurrentPageNumber(1);
    }
  }, [searchInput]);

  //-------------------------------------------------------------
  //If any of the checkbox options changes, get ready to filter
  //-------------------------------------------------------------
  // TODO: Change
  useEffect(() => {
    let newFilteredData = [];

    if (active || inactive) {
      if (active) {
        const data = transactions.filter((item) => {
          return item.status === "Active";
        });
        newFilteredData.push(...data);
      }
      if (inactive) {
        const data = transactions.filter((item) => {
          return item.status === "Inactive";
        });
        newFilteredData.push(...data);
      }
      setFilteredData(newFilteredData);
      setCurrentPageNumber(1);
    } else if (!active && !inactive) {
      //If no checkbox is check then update table with original data
      setFilteredData(transactions);
      setCurrentPageNumber(1);
    }
  }, [active, inactive, transactions]);

  //-------------------------------------------------------------
  //Evrytime the page number changes or the filtered data changes decide data to be displayed
  //-------------------------------------------------------------
  useEffect(() => {
    handleDisplayData();
  }, [currentPageNumber, filteredData]);

  //-------------------------------------------------------------
  //Calculate the total number of pages
  //-------------------------------------------------------------
  useEffect(() => {
    setTotalNumPage(Math.ceil(filteredData.length / dataPerPage));
  }, [filteredData, dataPerPage]);

  //-------------------------------------------------------------
  //On initial mount of component
  //-------------------------------------------------------------
  useEffect(() => {
    // setFilteredData(DATA);
    console.log("test");
    getAllTransactions();
  }, []);

  const getAllTransactions = () => {
    dispatch(setAppLoading(true));
    console.log("getAllTransations");
    axios.get(`${BILLING_URL}/subscription?filter=active`, token).then(
      (res) => {
        dispatch(setAppLoading(false));
        console.log({ res });
        dispatch(setTransactions(res.data.data));
      },
      (err) => {
        if (err.response && err.response.data && err.response.data.error) {
          dispatch(setApplicationError(err.response.data.error));
        } else {
          dispatch(setApplicationError("Check your connection.."));
        }
      }
    );
  };

  //------------------------------------------------------------
  //Responsive listener for table view adjustment
  //------------------------------------------------------------

  const mobileListener = () => {
    window.innerWidth < 768 ? setMobile(true) : setMobile(false)
  }

  useEffect(() => {
    window.addEventListener("resize", mobileListener)
    return () => window.removeEventListener("resize", mobileListener)
  }, [])

  return (
    <div>
      <Navigation />
      <div id="billing-page">
        <Container>
          <div className="billing-page box-with-shadow">
            <header className="billing-page__header">
              <h1 className="billing-page__header__title">Billing Manager</h1>
              <div className="billing-page__header__content">
                <div className="first-row">
                  {/* Search Input */}
                  <section className="ui action input big">
                    <input
                      type="text"
                      value={searchInput}
                      name="search"
                      id="search-field"
                      onChange={handleSearchInput}
                      placeholder="Search..."
                    />
                    <button id="iconsearch" className="ui button">
                      <Icon name="search" id="search-filter" />
                    </button>
                  </section>

                  <section className="right-column">
                    {/* Refresh button */}
                    <Icon id="icon-search" name="sync" />

                    {/* Pagination */}
                    <Menu floated="left" pagination>
                      <Menu.Item
                        as="a"
                        icon
                        onClick={handleDecreasePageNumber}
                        disabled={currentPageNumber === 1}
                      >
                        <Icon name="chevron left" />
                      </Menu.Item>
                      <Menu.Item>{currentPageNumber}</Menu.Item>
                      <Menu.Item
                        as="a"
                        icon
                        disabled={currentPageNumber === totalNumPage}
                        onClick={handleIncreasePageNumber}
                      >
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
                  </section>
                </div>
                <div className="second-row">
                  <section className="results-wrapper">
                    <h5>Total Results: {transactions.length} </h5>
                    <h5>Sorted Results: {filteredData.length} </h5>
                  </section>
                  <section className="checkbox-wrapper">
                    <Checkbox
                      size="large"
                      label="Active"
                      value="active"
                      onChange={handleFilterByCheckBox}
                      checked={active}
                    />
                    <Checkbox
                      size="large"
                      label="Inactive"
                      value="inactive"
                      onChange={handleFilterByCheckBox}
                      checked={inactive}
                    />
                  </section>
                </div>
              </div>
            </header>
            <div className="billing-page__custom-table">
              <div className="billing-page__custom-table__header">
                <div className="left-column">Status</div>
                <div className="middle-column">
                  <div className="middle-column__section">Customer</div>
                  <div className="middle-column__section">Amount</div>
                  <div className="middle-column__section">Start Date</div>
                  <div className="middle-column__section">Interval</div>
                  <div className="middle-column__section">Interval Count</div>
                </div>
              </div>
              <div className="billing-page__custom-table__body">
                {paginatedData.map((item, index) => {
                  return (
                    <BillingTableRow key={index} item={item} index={index} mobile={mobile}/>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Billing;
