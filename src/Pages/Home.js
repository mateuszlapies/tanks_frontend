import React, {Component} from 'react';
import "../Styles/Home.css";
import {
    MDBAnimation,
    MDBBtn,
    MDBCard,
    MDBCol,
    MDBContainer,
    MDBMask,
    MDBRow,
    MDBView
} from "mdbreact";
import Welcome from "../Components/Welcome";

class Home extends Component {
    render() {
        return(
            <MDBView src="http://mdbootstrap.com/img/Photos/Others/images/91.jpg">
                <MDBMask className='d-flex justify-content-center align-items-center gradient' />
                <MDBContainer
                    style={{ height: '100%', width: '100%'}}
                    className='mt-5  d-flex justify-content-center align-items-center'
                >
                    <MDBRow>
                        <MDBAnimation
                            type='fadeInLeft'
                            delay='.3s'
                            className='white-text text-center text-md-left col-md-6 mt-xl-5 mb-5'
                        >
                            <h1 className='h1-responsive font-weight-bold'>
                                Start playing right now!
                            </h1>
                            <hr className='hr-light' />
                            <h6 className='mb-4'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                                repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                                sapiente, fugiat! Commodi sequi non animi ea dolor molestiae,
                                quisquam iste, maiores. Nulla.
                            </h6>
                            <MDBBtn outline color='white'>
                                Learn More
                            </MDBBtn>
                        </MDBAnimation>
                        <MDBCol md='6' xl='5' className='mb-4'>
                            <MDBAnimation type='fadeInRight' delay='.3s'>
                                <MDBCard className="cardBackground">
                                    <Welcome/>
                                </MDBCard>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBView>
        );
    }
}

export default Home;
