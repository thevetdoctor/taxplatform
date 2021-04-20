import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Menu, Container } from "semantic-ui-react";
import _, { reject } from "lodash";
import { setErrors } from "../../redux/slices/errors";
import axios from "axios";
import { setApplicationError, setAppLoading } from "../../redux/index";
import Navigation from "../../components/Navbar";
import { BILLING_URL } from "../../utils/Constants";
import { formatDate } from "../../utils/Utils.js";

import "../../styles/billing.scss";

const Errors = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const errors = useSelector((state) => state.errors.errors);
  const [searchInput, setSearchInput] = useState("");

  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [filteredData, setFilteredData] = useState(errors);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalNumPage, setTotalNumPage] = useState(0);
  const [mobile, setMobile] = useState(window.innerWidth < 768 ? true : false)

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
  //Decide subset data to be displayed on table
  //-------------------------------------------------------------
  const handleDisplayData = useCallback(() => {
    console.log({ filteredData });

    if (filteredData === null || filteredData.length === 0) {
      setFilteredData(errors);
    }

    const start = (currentPageNumber - 1) * dataPerPage;
    const end = (currentPageNumber - 1) * dataPerPage + 10;

    const set = filteredData.slice(start, end);

    console.log({ set });

    setPaginatedData(set);
  }, [errors, currentPageNumber, dataPerPage, filteredData]);

  //-------------------------------------------------------------
  //Once Input changes filter data
  //-------------------------------------------------------------
  useEffect(() => {
    if (searchInput) {
      const data = errors.filter((item) => {
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
  //Evrytime the page number changes or the filtered data changes decide data to be displayed
  //-------------------------------------------------------------
  useEffect(() => {
    handleDisplayData();
  }, [errors, currentPageNumber, filteredData]);

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
    getAllErrors();
  }, []);

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

  const getAllErrors = () => {
    dispatch(setAppLoading(true));
    console.log("getAllErrors");
    // const applicationId = 36; // Test Application Id Here
    axios.get(`${BILLING_URL}/stripeLogs`, token).then(
      (res) => {
        dispatch(setAppLoading(false));
        console.log({ res });
        dispatch(setErrors(res.data));
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

  return (
    <div>
      <Navigation />
      <div id="billing-page">
        <Container>
          <div className="billing-page box-with-shadow">
            <header className="billing-page__header">
              <h1 className="billing-page__header__title">Error Manager</h1>
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
                    <h5>Total Results: {errors.length} </h5>
                    <h5>Sorted Results: {filteredData.length} </h5>
                  </section>
                </div>
              </div>
            </header>
            <div className="billing-page__custom-table">
              <div className="billing-page__custom-table__header">
                <div className="left-column">Status</div>
                <div className="middle-column">
                  <div className="middle-column__section">Type</div>
                  <div className="middle-column__section">Client</div>
                  <div className="middle-column__section">Client ID</div>
                  <div className="middle-column__section">Created Date</div>
                  <div className="middle-column__section">Updated Date</div>
                </div>
              </div>
              <div className="billing-page__custom-table__body">
                {paginatedData.map((error, index) => {
                  return (
                    <div className="custom-row-wrapper" key={index}>
                      <div
                        className={mobile ? "custom-row-mobile" : "custom-row-desktop"}
                        // onClick={() => {
                        //   setShowExpandedDetails(!showExpandedDetails);
                        // }}
                      >
                        <div className="left-column">Error</div>
                        <div className="middle-column">
                          <div
                            className="middle-column__section"
                            title={error.log.type}
                          >
                            {error.log.type}
                          </div>
                          <div className="middle-column__section">
                            {error.client}
                          </div>
                          <div className="middle-column__section">
                            {error.log.ClientId}
                          </div>
                          <div className="middle-column__section">
                            {formatDate(error.log.createdAt)}
                          </div>
                          <div className="middle-column__section">
                            {formatDate(error.log.updatedAt)}
                          </div>
                        </div>
                      </div>
                      {/* {showExpandedDetails && (
                        <ExpandedSection application={item.application} />
                      )} */}
                    </div>
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

export default Errors;
