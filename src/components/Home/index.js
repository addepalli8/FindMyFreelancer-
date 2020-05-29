// @flow

import React, { Component } from "react";

// import all the necessary subcomponents
import Card from '../Card';
import NoResultsFound from '../NoResultsFound';
import Loader from '../Loader';

// importing the style from the external css file
import "./home.css";

// importing all the necessary icons/images for the app
import LogoIcon from '../../images/logo.jpg';
import ClearIcon from '../../images/clear.png';

// declaring the type of states and props used
type Props = {};
type State = {
  freelancerList: Array<Object>,
  searchType: string,
  searchValue: string,
  dataInProgress: boolean,
};

class Home extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      freelancerList: [],
      searchType: 'all',
      searchValue: '',
      dataInProgress: true,
    };

    //  binding all the necessary functions to perform state operations
    (this: any).handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
    (this: any).handleSearchValueChange = this.handleSearchValueChange.bind(this);
    (this: any).clearSearch = this.clearSearch.bind(this);
  }
  componentDidMount() {
    // fetching the necessary data from the api
    fetch('https://reqres.in/api/users?page=1')
    .then(response => response.json())
    .then(data_list => this.setState(prevState=>({
      freelancerList: data_list.data,
      dataInProgress: false,
      })));
  }

  // handling on change for select box in the search area (first name, last name, email)
  handleSearchTypeChange(e) {
    const { value } = e.target;
    this.setState(prevState=>({
      searchType: value,
    }));
  }

  // handling on change for text entered in the search box
  handleSearchValueChange(e) {
    const { value } = e.target;
    this.setState(prevState=>({
      searchValue: value,
    }));
  }

  // clear the search field whenever needed
  clearSearch() {
    this.setState(prevState=>({
      searchValue: '',
    }));
  }

  render() {
    let freelancer_list = this.state.freelancerList;

    // section for handling the placeholder text
    let search_placeholder = 'search all';
    if(this.state.searchType === 'first_name') {
      search_placeholder = 'search by First Name';
    }
    if(this.state.searchType === 'last_name') {
      search_placeholder = 'search by Last Name';
    }
    if(this.state.searchType === 'email') {
      search_placeholder = 'search by Email';
    }

    // section for searching the freelancers based on the required category
    if(this.state.searchType !== 'all') {
      freelancer_list = this.state.freelancerList.filter((item) => {
        return (
          (this.state.searchType === 'first_name' && item.first_name && item.first_name.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1) ||
          (this.state.searchType === 'last_name' && item.last_name && item.last_name.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1) ||
          (this.state.searchType === 'email' && item.email && item.email.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1)
        );
      });
    } else {
      freelancer_list = this.state.freelancerList.filter((item) => {
        return (
          (item.first_name && item.first_name.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1) ||
          (item.last_name && item.last_name.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1) ||
          (item.email && item.email.toLowerCase().search(this.state.searchValue.toLowerCase()) !== -1)
        );
      });
    }
    // displaying the loader until the data is loadded or fetched
    if(this.state.dataInProgress) {
      return (
        <Loader />
        );
    }
    // diplaying the data of search section and list of freelancers
    return (
      <div style={{maxWidth: 1200, margin: '0px auto'}}>
        <div className="top-bar">
          <div className="search-section">
            <img alt="logo" src={LogoIcon} style={{width: 50}} />
            <div className="search-box-container">
              <select onChange={this.handleSearchTypeChange} className="search-type-select">
                <option value="all">all</option>
                <option value="email">email</option>
                <option value="first_name">first name</option>
                <option value="last_name">last name</option>
              </select>
              <div style={{position: 'relative'}}>
                <input
                  id="search"
                  type="text"
                  className="search-value-text"
                  value={this.state.searchValue}
                  onChange={this.handleSearchValueChange}
                  placeholder={search_placeholder}
                />
                <img alt="clear" style={{display: this.state.searchValue && this.state.searchValue.length ? 'block' : 'none'}} className="search-clear-value" src={ClearIcon} onClick={this.clearSearch} />
              </div>
            </div>
          </div>
        </div>
        <div className="freelancer-list">
          {
            freelancer_list && freelancer_list.length ?
              freelancer_list.map((data, index)=>(
                <Card
                  key={data.id}
                  first_name={data.first_name}
                  last_name={data.last_name}
                  email={data.email}
                  avatar={data.avatar}
                />
              )) :
              <NoResultsFound
                clearSearch={this.clearSearch}
              />
          }
        </div>
      </div>
      );
  }
}

export default Home;
