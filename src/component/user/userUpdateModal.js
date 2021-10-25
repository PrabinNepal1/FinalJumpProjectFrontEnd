import {Form, Button, Alert, Modal, FloatingLabel} from 'react-bootstrap'
import React, {useState} from "react";
import {useAuth} from "../../context/AuthContext"

export default function UpdateUserModal(props){

    const {update} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({username:'', password:'', confirmPassword:''})

    const handleInputChange = e => {
        const { name, value } = e.target

        setUserData({ ...userData, [name]:value })
    }

    const handleSubmit = (e) =>{
        if(userData.password !== userData.confirmPassword){
            setError("Password doesn't match");
        }
        else{
            e.preventDefault()
            setLoading(true)
            setError("")
            update(userData.username, userData.password).then(() => {
                    setMessage("Successfully Created Your Account")
                  })
                  .catch( error => {
                    setError(error.message);
                  })
                  .finally(() => {
                    setLoading(false)
                  })
        }
       
    }
    return(
        <Modal aria-labelledby="contained-modal-title-vcenter" show={props.showUpdate} onHide={props.closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form className="mx-3" onSubmit={handleSubmit} >
                    <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange = {handleInputChange}
                                required
                                >
                             </Form.Control>
                    </FloatingLabel>
                             <Form.Text className="text-danger" muted></Form.Text>
                    </Form.Group>

                    <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange = {handleInputChange}
                                required
                                >
                             </Form.Control>
                        </FloatingLabel>
                             <Form.Text className="text-danger" muted></Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Confirm Password"
                            className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange = {handleInputChange}
                                required
                                >
                             </Form.Control>
                        </FloatingLabel>
                             <Form.Text className="text-danger" muted></Form.Text>
                    </Form.Group>

                    {/* <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Display Name"
                        className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Dispaly Name"
                                name="displayname"
                                onChange = {handleInputChange}
                                required
                                >
                             </Form.Control>
                        </FloatingLabel>
                             <Form.Text className="text-danger" muted></Form.Text>
                    </Form.Group> */}
                    
                    <Button disabled={loading} className="w-100 mt-2" type="submit ">Update</Button>
                </Form>

        </Modal.Body>
        </Modal>
    )

}