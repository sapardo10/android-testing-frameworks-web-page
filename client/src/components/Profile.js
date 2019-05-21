import React, { Component } from 'react';
import fire from '../config/Fire';


export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: fire.auth().currentUser,
            profileId: this.props.match.id,
        }
    }

    componentDidMount() {
        this.setState({
            user: fire.auth().currentUser,
        })
    }


    getComments = () => {
        if (this.state.user) {
            fetch("http://localhost:3001/users/get/" + this.state.user.uid)
                .then(data => data.json())
                .then(res => this.setState({ user: res.data }))
                .catch((err) => {
                    this.setState({
                        message: 'Error conecting to servers get comments' + err,
                        visible: true,
                    });
                });
        }

    }


    render() {
        var userScreen;
        console.log(this.state.user);
        console.log(this.props);
        if (this.state.id) {
            userScreen = (<div>{this.state.profileId}</div>);
        } else if (this.state.user !== null && this.state.user !== undefined){
            userScreen = (<div>{this.state.user.email}</div>);
        } else {
            userScreen = (<div>No user available</div>);
        }
        return (
            <div>
                {userScreen}
            </div>
        )
    }
}
