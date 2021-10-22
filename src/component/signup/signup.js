import React, {useState} from "react";
import {Link} from 'react-router-dom';
import {Card, Form, Button, Container, FloatingLabel, Alert} from "react-bootstrap";
import {useAuth} from "../../context/AuthContext"

function Signup(){

    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [userData, setUserData] = useState({username:'',password:'', confirmPassword:'', email:'', displayname:''})

    const handleInputChange = e => {
        const { name, value } = e.target

        setUserData({ ...userData, [name]:value })
    }

    const handleSubmit = (e) =>{
        if(userData.password !== userData.confirmPassword){
            setError("Password doesn't match");
        }
        e.preventDefault()
        setLoading(true)
        setError("")
        signup(userData.username, userData.password, userData.email, userData.displayname).then(() => {
                setMessage("Successfully Created Your Account")
              })
              .catch( error => {
                setError(error.message);
              })
              .finally(() => {
                setLoading(false)
              })
    }

    return(
    <Container className="d -flex align-items-center justify-our-content mt-5 mb-5">
        
        <Card border="dark" className="mb-2">
            <Card.Header>  <Card.Title className="text-center">USER REGISTRATION</Card.Title> </Card.Header>
            <Card.Body>
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

                    <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Email Address"
                                name="email"
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
                    </Form.Group>
                    
                    <Button disabled={loading} className="w-100 mt-2" type="submit ">Sign-Up</Button>
                </Form>
             </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
                Already have an account? <Link to='/login'> Log In</Link>
        </div>
    </Container>
    )
}

export default Signup;