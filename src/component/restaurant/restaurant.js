import React from 'react';

import ResturantService from '../../service/ResturantService';

class Resturant extends React.Component
{
    constructor(props){
      super(props)
      
      this.state ={
        resturants:[]
      }
      this.addResturant = this.addResturant.bind(this);


    }


    componentDidMount(){
      ResturantService.getResturants().then((res) => {
        this.setState({ resturants: res.data});
      })
    }
    addResturant(){
      this.props.history.push('/resturant/add');
    }


  render (){
    return(

          <div>
            <h1>Resturant List</h1>
            <div className = "row">
              <button className="btn btn-primary" onClick={this.addResturant}> Add Resturant</button>
            </div>

            
            <table className= "table table-striped">
              <thead>
                <tr>
                  <td>Resturant Id</td>
                  <td>Resturant Name</td>
                  <td>Resturant Address</td>
                  <td>Resturant Description</td>
                  <td>Resturant Reviews</td>

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
                         <td>{resturants.reviews}</td>  

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