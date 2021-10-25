import React, {useState, useEffect } from "react";
import {Card, Button, Container} from "react-bootstrap";
import {useAuth} from "../../context/AuthContext";
import UpdateUserModal from "./userUpdateModal";

function User(){

    const {getUserData,currentUser, userDetails} = useAuth();   
    const [loading, setLoading] = useState(true)
    const [toggleModal, setToggleModal] = useState(false)
    const closeModal = () => setToggleModal(false)

    useEffect(()=>{
      getUserData(currentUser.sub);
      setLoading(false);
    },[])

    return(
        <Container className="d -flex align-items-left justify-our-content mt-5">
        {loading && <p>loading...</p>}
        {userDetails &&
          <><Card className="w-50">
            <Card.Header as="h5"><i className="far fa-address-card"></i> Profile : {userDetails.username}</Card.Header>
            <Card.Body>
              <Card.Title><i className="fas fa-user"></i> {userDetails.displayname} </Card.Title>
              <Card.Title><i className="fas fa-envelope-open-text"></i> Email: {userDetails.email} </Card.Title>
  
              <Card.Text as="h6" className="mt-3">
                Update Your Details!
              </Card.Text>
              <Card.Title className="mt-5" as="h5"><i className="fas fa-user-edit"></i> Manage Your Account</Card.Title>
              <Card.Body>
                <Button variant="danger" onClick={()=>setToggleModal(true)}><i className="fas fa-key"></i> Update Username/Password</Button>
              </Card.Body>
            </Card.Body>
            </Card>
            </>
          }
          < UpdateUserModal showUpdate={toggleModal} closeModal={closeModal}/>
          </Container>
    )
}

export default User;