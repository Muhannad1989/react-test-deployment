import React, { Component } from 'react';

const List = ({ surname, gender, region }) => {
  return (
    <ul>
      <li>
        <span>{surname}</span>
      </li>
      <li>Gender: {gender}</li>
      <li>Country of origin: {region}</li>
    </ul>
  );
};

const Image = ({ photo }) => {
  return (
    <React.Fragment>
      <img src={photo} alt="" />
    </React.Fragment>
  );
};

const User = ({ name, index, displayDetails, user: selectedUser }) => {
  return (
    <React.Fragment>
      <p
        onClick={() => {
          displayDetails(selectedUser);
        }}
      >
        {name}
      </p>
    </React.Fragment>
  );
};

class Users extends Component {
  state = {
    data: [],
    user: [],
    error: false,
    loading: false,
    displayBox: false,
  };

  getData = () => {
    const url = 'http://uinames.com/api/?ext&amount=5';
    this.setState({ loading: true });
    fetch(url)
      .then(response => response.json())
      .then(users => this.setState({ data: users, loading: false }))
      .catch(err => {
        this.setState({ error: true, loading: false });
      });
  };

  displayDetails = user => {
    this.setState({ user, displayBox: true });
  };

  render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">Opps something went wrong</div>;
    }
    return (
      <div className="container">
        <div className="navbar">
          <button onClick={this.getData}>Get Users</button>
        </div>
        <div className="parent">
          <div>
            {this.state.displayBox > false ? (
              <div className="details">
                <Image photo={this.state.user.photo} />
                <List
                  surname={this.state.user.surname}
                  region={this.state.user.region}
                  gender={this.state.user.gender}
                />
              </div>
            ) : null}
          </div>

          <div className="users">
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <User
                    name={item.name}
                    user={item}
                    index={index}
                    displayDetails={this.displayDetails}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
