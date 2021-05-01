import React from 'react';
import axios from 'axios';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: "",
            packarr: "",
            errorLabel: "",
            errorLabelHidden: true,
            reponse: []
        };
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit = async(e) => {
        e.preventDefault();
        // get our form data out of state
        const {quantity, packarr, response, errorLabel} = this.state;

        var quantityInt = parseInt(quantity)
        var packStringArray = packarr.split(',')
        var packArray=[]
        packStringArray.forEach(element => {
            packArray.push(parseInt(element))
        });
        
        axios({
            method:'post',
            url: 'https://28nmcxzugk.execute-api.eu-west-2.amazonaws.com/dev/pack-calculator',
            data:{
                "packsarr": packArray,
                "quantity": quantityInt
            },
            headers:{
                'content-type': 'application/json'
            }
        }).then((response) => {
            //access the resp here....
            var payload = JSON.stringify(response.data, null, 2);
            console.log(`response fetched. ${payload}`);
            this.setState({
                quantity: "",
                packarr: "",
                errorLabelHidden: true,
                response: payload
            });
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                response: "OOPS that didn't work :(",
            });
        });
    }


    render() {

        const {quantity, packarr, response} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label for="quantity">quantity:</label>
                        <input type="text" name="quantity" value={quantity} onChange={this.onChange}/>
                    </div>
                    <div>
                        <label for="packarr">packarr:</label>
                        <input type="text" name="packarr" value={packarr} onChange={this.onChange}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>                   
                </form>
                <div>
                    Response:
                </div>
                <div>
                    {response}
                </div>
            </div>
        );
    }
}