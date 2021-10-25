import React from 'react';
import Search from '../../search/search';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ResturantService from '../../../service/ResturantService';
import ReviewService from '../../../service/ReviewService';
import { generatePath } from 'react-router';

class Resturant extends React.Component
{
    constructor(props){
      super(props)
      
      this.state ={
        resturants:[]
      }
      this.addResturant = this.addResturant.bind(this);
      this.addReview = this.addReview.bind(this);


    }


    componentDidMount(){
      ResturantService.getResturants().then((res) => {
        this.setState({ resturants: res.data});
      })
    }
    componentDidUpdate(){
      ReviewService.getResturants().then((res) => {
      this.setState({ resturants: res.data});
      })
    }
    addResturant(){
      this.props.history.push('/resturant/add');
    }
    addReview(id){
      
        this.props.history.push('/add/review');
  

    }

    myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}



  render (){

    return(

          <div>
            <h1>Resturant List</h1>
            {/* <div>
              <Search />
            </div> */}
            <div className = "row">
              <button className="btn btn-primary" onClick={this.addResturant}> Add Resturant</button>
            </div>

            <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for restuarants"></input>
            <table className= "table table-striped" id="myTable">
              <thead>
                <tr>
                  <td>Resturant Id</td>
                  <td>Resturant Name</td>
                  <td>Resturant Address</td>

                  <td>Resturant Description</td>
                  <td>Resturant Reviews </td>

                </tr>


              </thead>
              <tbody>
                  {
                    this.state.resturants.map(
                      resturants =>
                      <tr key={resturants.id}>
                         <td>{resturants.id}</td>
                         <td>{resturants.name}</td> 
                         <td>{resturants.address}</td> 
                         <td>{resturants.description}</td> 
                         <td>{resturants.reviews.map}<button className="btn btn-primary" onClick= {() => this.addReview(resturants.id)}> Add Review</button></td>  

                      </tr>
                    )

                  }



              </tbody>

            </table>





          </div>
             

           

    )
  };

}  



export default Resturant;