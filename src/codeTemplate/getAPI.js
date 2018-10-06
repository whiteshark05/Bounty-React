// componentDidMount() { 
//     let currentComponent = this;
//     fetch('http://192.168.1.130:3500/users',{mode:'cors'})
//     .then(
//       function(response) {
//         if (response.status !== 200) {
//           console.log('Looks like there was a problem. Status Code: ' +
//             response.status);
//           return;
//         }

//         // Examine the text in the response
//         response.json().then(data => {
//           currentComponent.setState({people:
//             {name:data.people.name,
//             age: data.people.age}})
//           console.log(data)
//         });
//       }
//     )
//     .catch(function(err) {
//       console.log('Fetch Error :-S', err);
//     });
//   }
  
//   render() {
//     return (
//       <div>
//         <h1>{this.state.people.name}</h1>
//         <h1>{this.state.people.age}</h1>
//       </div>
//     )
//   };
// }
