import React, { Component } from 'react';
//import {SocialIcon} from 'react-social-icons';
//import {MainRouter,ProblemRouter} from './Routes/routes.js';
//import './Routes/mainrouter'
//import Postdata from '../src/json/problem.json';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import './App.css'
import PForm from './PForm/pform';
import SForm from './SForm/sform';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <div className="App-header">
          
        </div>

        <div className="App-body">
          <Main/>
          <MainRouter/>
        </div>

        
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

const Main = () => (
  <header className="navheader">
    <nav>
      <ul>
        <li className="l1"><Link to='/'>Home</Link></li>
        <li><Link to='/problem'>Problems</Link></li>
        <li><Link to='/user'>User</Link></li>
      </ul>
    </nav>
  </header>
)

const MainRouter = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/problem' component={ProblemRouter}/>
      <Route path='/user' component={User}/>
    </Switch>
  </main>
)

const ProblemRouter = () => (
  <Switch>
    <Route exact path='/problem' component={ProblemSet}/>
    <Route exact path='/problem/new' component={NewProblem}/>
    <Route exact path='/problem/:number' component={Problem}/>
  </Switch>
)

const Home = () => (
  <div>
    <h1>Welcome to the Bounty Contract Website!</h1>
  </div>
)


  
class ProblemSet extends Component {
  constructor(props){
    super(props)
    this.state = {
      problem:[]
    }
  }
  
  componentDidMount() { 
    fetch('http://localhost:3500/api/problems',{method:"GET"})
    .then(response => 
       {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(data => this.setState({problem:data}))
      }
    )
    .catch(err => console.log('Fetch Error :-S', err));
  };  

  render() {
    return (
      <div className="problemSet">
        {
          this.state.problem.map(p => {
          return (
          <Link to={`/problem/${p.id}`}>
            <button className="button" key={p.id}>{p.name}</button>
          </Link>
        )})}
        
        <Link to='/problem/new'>
          <button className="button">New Problem</button>
        </Link>
      </div>
    )
  }
}


class Problem extends Component {
  constructor(props){
    super(props)
    this.state = {
      problem:{},
      solution:[]
    }
  }
  
  componentDidMount() {
    // fetch individual problems
    let id = this.props.match.params.number; 
   //console.log(id);
    let url = "http://localhost:3500/api/problems/" + id.toString()
    fetch(url,{method:"GET"})
    .then(response => 
       {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(data => this.setState({problem:data}))
      }
    )
    .catch(err => console.log('Fetch Error :-S', err));


    // fetch all solutions
    fetch("http://localhost:3500/api/solutions/",{method:"GET"})
    .then(response => 
       {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(data => {this.setState({solution:data})
        console.log("Fetched Solutions", data)})
      }
    )
    .catch(err => console.log('Fetch Error :-S', err));
  };  
  
  // editHandler = () => {

  // }

  // deletHandler = () => {
  //   url='http://localhost:3500/api/problems' + props.match.params
  //   fetch(url,{method:"DELETE"})
  //   .then(response => response.json())
  //   .then(res => console.log(res))
  //   .catch(e => console.log("Fetch err: ", e))
  // }

  render () {
    return (
      <div>
        <ProblemSet/>
        <ProblemDisplay problem = {this.state.problem}/>
        <button type='submit' onClick={this.editHandler}>Edit</button>
        <button type='submit' onClick={this.deleteHandler}>Delete</button>
        <h2>Current Solutions:</h2>
        <SolutionDisplay solution = {this.state.solution} problemID = {this.state.problem.id}/>
        <SForm problemID={this.state.problem.id}/>
      </div>
    )}
}  

const ProblemDisplay = props => {
  return (
    <table className="center">
        <tbody>
        <tr>
          <th>ID</th> 
          <td>{props.problem.id}</td>
        </tr>
        <tr>
          <th>Index</th> 
          <td>{props.problem.index}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{props.problem.setterAddress}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{props.problem.name}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{props.problem.description}</td>
        </tr>
        <tr>
          <th>Input</th>
          <td>{props.problem.input}</td>
        </tr>
        <tr>
          <th>Output</th>
          <td>{props.problem.output}</td>
        </tr>
        <tr>
          <th>PriceTag</th>
          <td>{props.problem.priceTag}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{props.problem.isActive}</td>
        </tr>
        </tbody>
      </table>
  )
}
  
const SolutionDisplay = props => {
  let filteredSolutions = props.solution.filter(obj => (obj.problemID === props.problemID))
  console.log("Filtered Solutions:", filteredSolutions)
  return (
    filteredSolutions.map(sol => {
      return (
        <table className="center">
        <tbody>
          <tr>
            <th>ID</th> 
            <td>{sol.id}</td>
          </tr>
          <tr>
            <th>Content</th>
            <td>{sol.content}</td>
          </tr>
        </tbody>
      </table>
      )
    })
  )
}

const NewProblem = () => {
    return (
      <div>
        <ProblemSet/>
        <PForm/>
      </div>
    )
}


class User extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {user:{
  //     address:'',
  //     problemID:[],
  //     solutionId:[],
  //   }}
  // }

  // componentDidMount() {
  //   let url = 'http://localhost:3500/api/users'
  //   fetch(url, {method:'GET'})
  //   .then(response => {
  //   console.log ("Data: ", response.json())
  //   return response.json()})
  //   .catch(err => console.log('Fetch Error :-S', err))
    
  // }

  render() {
    return (
      <h2>Welcome</h2>
    ) 
  }
}



// // Footer component
// class SocialIcons extends Component {
//   render() {
//     return (
//       <div>
//         <SocialIcon url="https://www.facebook.com/do.tienthinh.3" />
//         <SocialIcon url="https://twitter.com/b0mb4rdi3r"/>
//         <SocialIcon url="https://github.com/whiteshark05"/>
//         <SocialIcon url="https://www.reddit.com/user/flexr123" color = "red"/>
//       </div>
//     )  
//   }
// }



