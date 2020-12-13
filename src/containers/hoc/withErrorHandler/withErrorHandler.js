import React, {Component} from 'react';
import Aux from '../Aux/Auxilliary';
import Modal from '../../../components/UI/Modals/TransitionModal/TransitionModal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        
        componentDidMount() {
            this.reqIntercepror = axios.interceptors.request.use(req => {
                // Clear the error every time a request is sent
                this.setState({error: null});
                return req; 
            });

            this.resIntercepror = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // Method executed when component is not required any more 
        componentDidUnmount() {
            // Remove interceptors to prevent memory leaks
            axios.interceptors.request.eject(this.reqIntercepror);
            axios.interceptors.response.eject(this.resIntercepror);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null}); // Remove error from display after click
            console.log("Remove error from display after click");
        }

        render() {
            return(
                <Aux>
                    <Modal 
                        show={this.state.error ? true : false}
                        modalClosed={this.errorConfirmedHandler}> 
                        {this.state.error? this.state.error.message : null }</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;