import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import './home.css'
import Cookies from "js-cookie";
import swal from 'sweetalert';


export default function Home() {
    return(
        
                <body>
                    <div className="sidebar close">
                        <div className="logo-details">
                        
                        </div>
                        <ul className="nav-links">
                            <li>
                                <a href="#">
                                    <i className='bx bx-grid-alt'></i>
                                    <span className="link_name">Dashboard</span>
                                </a>
                                <ul className="sub-menu blank">
                                    <li><a className="link_name" href="#">Category</a></li>
                                </ul>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-collection'></i>
                                        <span className="link_name">Category</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow'></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Category</a></li>
                                    <li><a href="#">HTML & CSS</a></li>
                                    <li><a href="#">JavaScript</a></li>
                                    <li><a href="#">PHP & MySQL</a></li>
                                </ul>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="#">
                                        <i className='bx bx-book-alt'></i>
                                        <span className="link_name">Posts</span>
                                    </a>
                                    <i className='bx bxs-chevron-down arrow'></i>
                                </div>
                                <ul className="sub-menu">
                                    <li><a className="link_name" href="#">Posts</a></li>
                                    <li><a href="/Admin/ListCong">Web Design</a></li>
                                    <li><a href="#">Login Form</a></li>
                                    <li><a href="#">Card Design</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <i className='bx bx-pie-chart-alt-2'></i>
                                    <span className="link_name">Analytics</span>
                                </a>
                                <ul className="sub-menu blank">
                                    <li><a className="link_name" href="#">Analytics</a></li>
                                </ul>
                            </li>
                           
                            
                            <li>
                                <div className="profile-details">
                                    <div className="profile-content">
                                        <img src="image/profile.jpg" alt="profileImg"></img>
                                    </div>
                                    <div className="name-job">
                                        <div className="profile_name">Prem Shahi</div>
                                        <div className="job">Web Desginer</div>
                                    </div>
                                    <i className='bx bx-log-out'></i>
                                </div>
                            </li>
                        </ul>
                    </div>
 
                </body>

                )


    }
