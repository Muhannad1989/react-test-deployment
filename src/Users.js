import React, { Component } from 'react';

const User = ({ name, index, displayDetails, user: selectedUser }) => {
  return (
    <React.Fragment>
      <p
        key={index}
        onClick={() => {
          displayDetails(selectedUser);
        }}
      >
        {name}
      </p>
    </React.Fragment>
  );
};

const List = ({ surname, gender, region }) => {
  return (
    <ul>
      <li>{surname}</li>
      <li>{gender}</li>
      <li>{region}</li>
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

class Users extends Component {
  state = {
    data: [],
    user: [],
    error: false,
    loading: false,
    selectedIndex: null,
    showBox: false,
  };

  showBox = () => {
    this.setState({ showBox: true });
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
    this.setState({ user });
  };

  render() {
    const { loading, error, data, selectedIndex } = this.state;
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
          <div className="details">
            <Image photo={this.state.user.photo} />
            <List
              surname={this.state.user.surname}
              region={this.state.user.region}
              gender={this.state.user.gender}
            />
          </div>
          <div className="users">
            {data.map((item, index) => {
              return (
                <div>
                  <User
                    key={index}
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
