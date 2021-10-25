import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ResturantService from '../../../service/ResturantService';
import ReviewService from '../../../service/ReviewService';
import { generatePath } from 'react-router';

import {useAuth} from "../../../context/AuthContext";

function Resturant()
{

  const [resturants, setResturants] = useState([]);
  const history = useHistory();
  const {currentUser} = useAuth();
  



  function addResturant(){
    history.push('/resturant/add');
  }
 
 function addReview(){

      if(currentUser !== null ){
        history.push(`/add/review/${resturants.id}`);
      }else{
        history.push('/login');
      }
    
      
  }


  useEffect(()=>{
    ResturantService.getResturants().then((res) => 
      setResturants(res.data));
  }, [])

    
    





    return(

          <div>
            <h1>Resturant List</h1>
            <div className = "row">
             { 
               currentUser && <button className="btn btn-primary" onClick={addResturant}> Add Resturant</button>
                }
            </div>

            
            <table className= "table table-striped">
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
                    resturants.map(
                      resturants =>
                      <tr key={resturants.id}>
                         <td>{resturants.id}</td>
                         <td>{resturants.name}</td> 
                         <td>{resturants.address}</td> 
                         <td>{resturants.description}</td> 
                         <td>{resturants.reviews.map}<button className="btn btn-primary" onClick= {() => addReview(resturants.id)}> Add Review</button></td>  

                      </tr>
                    )

                  }



              </tbody>

            </table>





          </div>
             

           

    )
  }


export default Resturant;