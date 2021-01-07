import React, {Component} from "react";
import {MDBBtn, MDBCardBody, MDBIcon} from "mdbreact";
import {GetCookie} from './Cookies';
import Config from './Config';
import Paths from '../Content/paths.json';

class Welcome extends Component {
    componentDidMount() {
        if(GetCookie("twitch_key").length > 0)
            fetch(Config.api + "user?" + GetCookie("twitch_id"), {
                headers: {"Authentication": "Bearer " + GetCookie("twitch_key")[0].replace("twitch_key=", "")}
            })
                .then(r => r.json())
                .then(json => {
                    sessionStorage.setItem("nickname", json.nick);
                    sessionStorage.setItem("kills", json.kills);
                    sessionStorage.setItem("deaths", json.deaths);
                });
    }

    auth() {
        window.location.href = Config.auth;
    }

    render() {
        if(GetCookie("twitch_id").length > 0 && GetCookie("twitch_key").length > 0) {
            return (
                <MDBCardBody className='whiteLabel'>
                    <h3 className='text-center'>
                        Welcome {sessionStorage.getItem("nickname")}
                    </h3>
                    <hr className='hr-light'/>
                    <div className='text-center mt-4 black-text'>
                        <div className="stat">
                            <MDBIcon icon="crosshairs" size="2x"/>
                            <span className="align-middle">{sessionStorage.getItem("kills")}</span>
                            <MDBIcon icon="skull" size="2x"/>
                            <span className="align-middle">{sessionStorage.getItem("deaths")}</span>
                        </div>
                        <MDBBtn color="warning" href={Paths.GAME}><MDBIcon icon="gamepad" className="mr-1"/>Start</MDBBtn>
                        <hr className='hr-light'/>
                        <div className='text-center d-flex justify-content-center white-label'>
                            <a href='#!' className='p-2 m-2'>
                                <MDBIcon
                                    fab
                                    icon='twitter'
                                    className='white-text'
                                />
                            </a>
                            <a href='#!' className='p-2 m-2'>
                                <MDBIcon
                                    fab
                                    icon='linkedin'
                                    className='white-text'
                                />
                            </a>
                            <a href='#!' className='p-2 m-2'>
                                <MDBIcon
                                    fab
                                    icon='instagram'
                                    className='white-text'
                                />
                            </a>
                        </div>
                    </div>
                </MDBCardBody>
            )
        } else {
            return (
                <MDBCardBody className='whiteLabel'>
                    <h3 className='text-center'>
                        Identify yourself
                    </h3>
                    <hr className='hr-light'/>
                    <div className='text-center mt-4 black-text'>
                        <MDBBtn className="login" onClick={this.auth}>
                            <MDBIcon fab icon="twitch" className="mr-1"/>
                            Login with Twitch
                        </MDBBtn>
                        <hr className='hr-light'/>
                        <div className='text-center d-flex justify-content-center white-label'>
                            <a href='#!' className='p-2 m-2'>
                                <MDBIcon
                                    fab
                                    icon='twitter'
                                    className='white-text'
                                />
                            </a>
                            <a href='#!' className='p-2 m-2'>
                                <MDBIcon
                                    fab
                                    icon='linkedin'
                                    className='white-text'
                                />
                            </a>
                            <a href='#!' className='p-2 m-2'>
                                <MDBIcon
                                    fab
                                    icon='instagram'
                                    className='white-text'
                                />
                            </a>
                        </div>
                    </div>
                </MDBCardBody>
            )
        }
    }
}

export default Welcome;
