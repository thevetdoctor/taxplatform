import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Icon,
  Menu,
  Checkbox,
  Container,
  Loader,
  Message,
} from "semantic-ui-react";
import CardForm from "../../components/Card";
import _ from "lodash";
import { getData } from "../../redux";
import {
  approvedNum,
  completedNum,
  pendingNum,
  rejectedNum,
  signedNum,
} from "../../components/constant";
import { getFilterNumber } from "../../utils/Utils";
import Navigation from "../../components/Navbar";

import "../../styles/application.scss";

const Application = () => {
  //-------------------------------------------------------------
  //Helpers
  //-------------------------------------------------------------
  const dispatch = useDispatch();

  //-------------------------------------------------------------
  //Store
  //-------------------------------------------------------------
  const { applications } = useSelector((state) => state.app);
  const { status } = useSelector((state) => state.app);
  const { error } = useSelector((state) => state.app);
  const { isLoading } = useSelector((state) => state.app);

  //-------------------------------------------------------------
  //State
  //-------------------------------------------------------------
  const [paginatedIndex, setPaginatedIndex] = useState(1);
  const [totalPageNum, setTotalPageNum] = useState();
  const [subsetData, setSubsetData] = useState([]); //Items from the entire data in any pagination index
  const [displayedData, setDisplayedData] = useState(applications); //Items actually displayed, this is affected by the various filtering logic also

  const [searchInput, setSearchInput] = useState("");

  const [currentFilters, setCurrentFilters] = useState({
    pending: true,
    approved: true,
    signed: true,
    rejected: true,
    completed: true,
  });
  const { pending, approved, signed, rejected, completed } = currentFilters;

  //-------------------------------------------------------------
  //Refresh application
  //-------------------------------------------------------------
  const handleRefresh = () => {
    setCurrentFilters((prevState) => {
      return {
        ...prevState,
        pending: true,
        approved: true,
        signed: true,
        rejected: true,
        completed: true,
      };
    });
    setSearchInput("");
    dispatch(getData());
    renderData(applications);
  };

  //-------------------------------------------------------------
  //Get items to display in this pagination index
  //-------------------------------------------------------------
  const computeSubsetArray = (data, index) => {
    const end = index * 5;
    const start = index * 5 - 5;
    const subset = JSON.parse(JSON.stringify(data)).slice(start, end);
    setDisplayedData(subset);
  };

  //-------------------------------------------------------------
  //Shows data to be displayed
  //-------------------------------------------------------------
  const renderData = (data) => {
    computeSubsetArray(data, paginatedIndex);

    //Calculate total possible pages, if each page has 5 applications each
    const num = data.length / 5;
    Number.isInteger(num)
      ? setTotalPageNum(num)
      : setTotalPageNum(Math.floor(num) + 1);
  };

  //-------------------------------------------------------------
  //Filters Data with checkboxes
  //-------------------------------------------------------------
  const getActiveFilters = () => {
    return Object.entries(currentFilters).map(([key, val]) => {
      if (val) {
        switch (key) {
          case "pending":
            return pendingNum;
          case "approved":
            return approvedNum;
          case "signed":
            return signedNum;
          case "completed":
            return completedNum;
          case "rejected":
            return rejectedNum;
          default:
        }
      }
    });
  };

  //-------------------------------------------------------------
  //When any checkbox is clicked fire this useEffect to determine what should be displayed
  //-------------------------------------------------------------
  useEffect(() => {
    if (applications) {
      renderData(applications);

      const activeFilters = getActiveFilters();

      console.log({ activeFilters });

      if (activeFilters.length > 0) {
        const filteredContent = applications.filter((app) => {
          if (activeFilters.includes(app.status)) {
            return app;
          }
        });
        renderData(filteredContent);
      } else {
        renderData(applications);
      }
    }
  }, [applications, currentFilters]);

  //-------------------------------------------------------------
  //Filter using search input
  //-------------------------------------------------------------
  useEffect(() => {
    console.log({ searchInput });
    console.log(JSON.parse(JSON.stringify(subsetData)));
    const activeFilters = getActiveFilters();
    const newSubsetData = applications.filter((app) => {
      if (activeFilters.includes(app.status)) {
        return app;
      }
    });

    if (searchInput && searchInput.length > 0) {
      console.log({ subsetData });
      const filteredData = newSubsetData.filter((app) => {
        if (app.personal_info && app.personal_info.form) {
          const { firstName, lastName } = app.personal_info.form;
          if (
            firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
            lastName.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return app;
          }
        }
      });

      setDisplayedData(filteredData);
    } else {
      setSubsetData(subsetData);
    }
  }, [searchInput]);

  //-------------------------------------------------------------
  //When the items to be displayed in this pagination index have been sorted out, display them
  //-------------------------------------------------------------
  useEffect(() => {
    renderData(subsetData);
  }, [subsetData]);

  //-------------------------------------------------------------
  //Main Request that fetches data to populate page
  //-------------------------------------------------------------
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <div id="application-page">
        <Container textAlign="center">
          <div className="container">
            <Container textAlign="center">
              <div className="application-page box-with-shadow">
                {/* Notifications */}
                {error && (
                  <div id="message">
                    <Message
                      id="errorMessage"
                      icon="cancel"
                      header="There was an error"
                      content={error}
                      wide
                    />
                  </div>
                )}
                {status && (
                  <div id="message">
                    <Message
                      id="successMessage"
                      icon="check"
                      header="There was a successful action"
                      content={"Status updated successfully"}
                      wide
                    />
                  </div>
                )}

                {/* Header */}
                <header className="application-page__header">
                  <h4 className="application-page__header__title">
                    Application Manager
                  </h4>
                  <section className="application-page__header__content">
                    <div className="first-row">
                      {/* Search Input */}
                      <div className="ui action input left-column">
                        <input
                          type="text"
                          value={searchInput}
                          name="search"
                          id="search-field"
                          onChange={(e) => setSearchInput(e.target.value)}
                          placeholder="Search..."
                        />
                        <button id="iconsearch" className="ui button">
                          <Icon name="search" id="search-filter" />
                        </button>
                      </div>
                      <div className="right-column">
                        {/* Refresh button */}
                        <Icon
                          id="icon-search"
                          name="sync"
                          onClick={handleRefresh}
                        />

                        {/* Pagination */}
                        <Menu floated="left" pagination>
                          <Menu.Item
                            as="a"
                            icon
                            disabled={paginatedIndex === 1}
                            onClick={() => {
                              setPaginatedIndex(
                                paginatedIndex > 0
                                  ? paginatedIndex - 1
                                  : paginatedIndex
                              );
                            }}
                          >
                            <Icon name="chevron left" />
                          </Menu.Item>
                          <Menu.Item>{paginatedIndex}</Menu.Item>
                          <Menu.Item
                            as="a"
                            icon
                            disabled={paginatedIndex === totalPageNum}
                            onClick={() => {
                              setPaginatedIndex(
                                paginatedIndex < totalPageNum
                                  ? paginatedIndex + 1
                                  : paginatedIndex
                              );
                            }}
                          >
                            <Icon name="chevron right" />
                          </Menu.Item>
                        </Menu>
                      </div>
                    </div>

                    <div className="second-row">
                      {/* Input feedback,i.e Total results and  sorted results  */}
                      <div className="results-wrapper">
                        {subsetData && subsetData.length === 0 ? (
                          "No Result Found"
                        ) : (
                          <>
                            <h5>
                              Total Results:{" "}
                              {applications && applications.length}{" "}
                            </h5>
                            <h5>
                              Sorted Results:{" "}
                              {displayedData && displayedData.length}{" "}
                            </h5>
                          </>
                        )}
                      </div>

                      {/* Filter checkboxes at the right*/}
                      <div className="checkbox-wrapper">
                        <Checkbox
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              pending: !pending,
                            })
                          }
                          size="large"
                          label="Pending"
                          checked={pending}
                          id="checks"
                        />
                        <Checkbox
                          size="large"
                          label="Approved"
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              approved: !approved,
                            })
                          }
                          checked={approved}
                          id="checks,"
                        />
                        <Checkbox
                          size="large"
                          label="Signed"
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              signed: !signed,
                            })
                          }
                          checked={signed}
                        />
                        <Checkbox
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              rejected: !rejected,
                            })
                          }
                          checked={rejected}
                          size="large"
                          label="Rejected"
                        />
                        <Checkbox
                          size="large"
                          label="Completed"
                          onChange={() =>
                            setCurrentFilters({
                              ...currentFilters,
                              completed: !completed,
                            })
                          }
                          checked={completed}
                        />
                      </div>
                    </div>
                  </section>
                </header>
                <main>
                  {isLoading ? (
                    <Loader
                      className="loader-applications"
                      active
                      inline="centered"
                    />
                  ) : applications === [] ? (
                    "No result Found"
                  ) : (
                    <>
                      {(displayedData || []).map((userData, i) => {
                        return <CardForm key={i} userData={userData} i={i} />;
                      })}
                    </>
                  )}
                </main>
              </div>
            </Container>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Application;
