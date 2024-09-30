import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="collapse text-bg-dark" id="navbarHeader">
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-md-7 py-4">
                        <h4>About</h4>
                        <p className="text-body-secondary">
                            Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.
                        </p>
                    </div>
                    <div className="col-sm-4 offset-md-1 py-4">
                        <h4>Contact</h4>
                        <ul className="list-unstyled">
                            <li><NavLink to="/twitter" className="text-white" activeclassname="active">Follow on Twitter</NavLink></li>
                            <li><NavLink to="/facebook" className="text-white" activeclassname="active">Like on Facebook</NavLink></li>
                            <li><NavLink to="/email" className="text-white" activeclassname="active">Email me</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
