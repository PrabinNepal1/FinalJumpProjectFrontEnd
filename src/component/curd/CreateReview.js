import {Form, Button, Alert, Modal, FloatingLabel} from 'react-bootstrap'
import React, {useState} from "react";
import {useAuth} from "../../context/AuthContext"
import ReviewService from '../../service/ReviewService';

export default function CreateReview(props){

    const {update} = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({rating:'', description:''})

    const handleInputChange = e => {
        const { name, value } = e.target

        setData({ ...data, [name]:value })
    }

    const handleSubmit = (e) =>{
            e.preventDefault()
            setLoading(true)
            setError("")
            ReviewService.createReview(props.id, data.rating, data.description).then(() => {
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
        <Modal aria-labelledby="contained-modal-title-vcenter" show={props.showUpdate} onHide={props.closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Write A Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form className="mx-3" onSubmit={handleSubmit} >
                    <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Rating"
                        className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Rating"
                                name="rating"
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
                        label="Description"
                        className="mb-3">
                            <Form.Control
                                 as="textarea"
                                type="text"
                                placeholder="Write your review"
                                name="description"
                                onChange = {handleInputChange}
                                required
                                >
                             </Form.Control>
                        </FloatingLabel>
                             <Form.Text className="text-danger" muted></Form.Text>
                    </Form.Group>

                    
                    <Button disabled={loading} className="w-100 mt-2" type="submit ">Update</Button>
                </Form>

        </Modal.Body>
        </Modal>
    )

}