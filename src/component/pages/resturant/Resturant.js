import React from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Resturant (){
    return(

        <Row xs={4} md={6} className="g-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Col>
            <Card>
             
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

    )
};



export default Resturant;