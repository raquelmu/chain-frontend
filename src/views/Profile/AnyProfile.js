// import React, { Component } from "react";
// import apiClient from "../../services/apiClient";
// import { Redirect, Link } from "react-router-dom";
// import Menu from "../../components/Menu/Menu";
// import Button from "../../components/Button/Button";


// export default class SingleProfile extends Component {
//   state = {
//     userId: null
//   }

//   componentDidMount(){
//     apiClient.getProfileById()
//     console.log(response)

//     .then(response => {
//       this.setState({userId: response.data})
//     })
//   }

//   handleAny = (id) => {
//     apiClient
//       .deleteProf(id)
//       .then(() => {
//         this.setState({
//           hasBeenDeleted: true
//         })
//       })        
//       .catch((error) => {
//       });
//   };
  

//   render() {
//     // const { user } = this.props
//     return (
//     //   <div>
//     //     {this.state.logout ?
//     //       <Redirect to={"/"} />
//     //     :
//     //       <div>
//     //         {this.state.hasBeenDeleted ? 
//     //           <Redirect to={"/"} />
//     //         :
//               <div>
//                 <h1>Name: {user.username}</h1>
//                 <h1>About me: {user.about}</h1>
//                 <h1>Location: {user.location}</h1>
//                 <h1>{user.profile_image}</h1>
//                 <h1>Points: {user.points}</h1>


//                 <Menu user={this.props.user}/>
//               </div>
//     //         }
//     //       </div>
//     //     } 
//     //   </div>
//     );
//   }
// }
