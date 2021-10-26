import React, { useEffect, useState } from 'react';
import  {useHistory} from 'react-router-dom';


import ResturantService from '../../../service/ResturantService';


import {useAuth} from "../../../context/AuthContext";
import CreateReview from "../../curd/CreateReview"

function Resturant()
{

  const [resturants, setResturants] = useState([]);
  const history = useHistory();
  const {currentUser} = useAuth();
  const [toggleModal, setToggleModal] = useState(false)
  const closeModal = () => setToggleModal(false)
  const [resID, setResID] = useState()


  function addResturant(){
    history.push('/resturant/add');
  }
 
  const handleToggle = () => {
    if (!currentUser) {
        history.push('/login');
    }
    else{
      setToggleModal(true)
    }
  }



  useEffect(()=>{
    ResturantService.getResturants().then((res) => 
      setResturants(res.data));
  },[])





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
                         <td>{resturants.reviews.map(
                           review =>  
                           <tr key={review.id}>
                                <td>Rating: {review.rating}</td>
                                <td>{review.description}</td>
                                </tr>
                         )}<button className="btn btn-primary" onClick={() => {handleToggle(); setResID(resturants.id);}}> Add Review</button></td>  

                      </tr>
                    )

                   

                  }



              </tbody>

            </table>

            <CreateReview showUpdate={toggleModal} closeModal={closeModal} id={resID} />
            
            

          </div>
             

           

    )
  }


export default Resturant;