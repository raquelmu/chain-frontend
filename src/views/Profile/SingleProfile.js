import React, { Component } from "react";
import apiClient from "../../services/apiClient";

export default class SingleProfile extends Component {

  state = {
    user: {}

  }

  componentDidMount(){

    apiClient.getProfileById(this.props.match.params.id)
    .then(response => {
      this.setState({
        user: response.data
      })
      console.log(this.state.user)
    })

  }

  render() {

    return (
      <div>
        <h1>{this.state.user.username}</h1>
      </div>
    );
  }
}

//   render() {
//     return (
//       <div>
//         <h1>SingleProfile</h1>
//       </div>
//     );
//   }
// }
