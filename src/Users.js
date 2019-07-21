import React, { Component } from 'react';

// const Child = ({ index, item }) => {
//   return (
//     <React.Fragment>
//       <li>{item.name}</li>
//     </React.Fragment>
//   );
// };

// const Item = props => {
//   return (
//     <React.Fragment>
//       <li>{props.name}</li>
//     </React.Fragment>
//   );
// };

const List = ({ photo, surname, gender, region }) => {
  return (
    <React.Fragment>
      <img src={photo} alt="Smiley face" />
      <li>surname :{surname}</li>
      <li>gender :{gender}</li>
      <li>region : {region}</li>
    </React.Fragment>
  );
};

class Users extends Component {
  state = {
    data: [],
    error: false,
    loading: false,
    selectedIndex: null,
    showBox: false,
    displayAll: false,
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

  displayDetails = index => {
    this.state.selectedIndex === null
      ? this.setState({ selectedIndex: index })
      : this.setState({ selectedIndex: null });
  };

  showForm = () => {
    this.setState({ showForm: true });
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
      <React.Fragment>
        <div className="button_div">
          <button onClick={this.getData}>Get Users</button>
        </div>

        <ul>
          {data.map((item, index) => {
            return (
              <React.Fragment>
                <div className="container">
                  <div className="right" />
                  <ul>
                    <li
                      className="parent"
                      key={index}
                      onClick={() => {
                        this.displayDetails(index);
                      }}
                    >
                      {item.name}
                    </li>
                  </ul>

                  {index === selectedIndex ? (
                    <div className="left">
                      {/* <List /> could use this one instead the list bottom */}
                      <ul>
                        <img src={item.photo} alt="Smiley face" />
                        <li>surname :{item.surname}</li>
                        <li>gender :{item.gender}</li>
                        <li>region : {item.region}</li>
                      </ul>
                    </div>
                  ) : null}
                  <div />
                </div>
              </React.Fragment>
            );
          })}
        </ul>
        <div />
      </React.Fragment>
    );
  }
}

export default Users;
