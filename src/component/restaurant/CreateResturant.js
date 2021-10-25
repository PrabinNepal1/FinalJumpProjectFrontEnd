import React, { Component } from 'react';
import ResturantService from '../../service/ResturantService';

class CreateResturant extends Component {
    
    constructor(props){
        super(props)

        this.state= {
            name: '',
            address: '',
            description: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDescriptionHandler= this.changeDescriptionHandler.bind(this);
        this.saveResturant = this.saveResturant.bind(this);
    }

    saveResturant = (e) =>{
        e.preventDefault();
        let resturant = {name: this.state.name, address: this.state.address, description: this.state.description};
        console.log('resturant =>' + JSON.stringify(resturant));

        ResturantService.createResturant(resturant).then(res =>{
            this.props.history.push('/resturant');
        });
    }

    changeNameHandler = (event) =>{
        this.setState({name: event.target.value});
    }
    changeAddressHandler = (event) =>{
        this.setState({address: event.target.value});
    }
    changeDescriptionHandler = (event) =>{
        this.setState({description: event.target.value});
    }
    cancel(){
        this.props.history.push('/resturant');
    }

    
    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Resturant</h3>
                            <div className ="card-body">
                                <form>
                                    <div className ="form-group">
                                        <label>Name: </label>
                                        <input placeholder="Name" name="name" className="form-control"
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                    </div>
                                    <div className ="form-group">
                                        <label>Address: </label>
                                        <input placeholder="Address" name="address" className="form-control"
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                    </div>
                                    <div className ="form-group">
                                        <label>Description: </label>
                                        <input placeholder="Description" name="description" className="form-control"
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                    </div>


                                    <button className = "btn btn-success" onClick={this.saveResturant}> Add </button>
                                    <button className = "btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel </button>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default CreateResturant;