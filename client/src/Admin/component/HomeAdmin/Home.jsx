import React, { useEffect, useReducer, useState } from "react";
import {useHistory} from 'react-router-dom'
import Axios from "axios";
import './home.css'
import Cookies from "js-cookie";
import swal from 'sweetalert';


export default function Home() {
    return(
        
                <body>
                    <div class="sidebar close">
                        <div class="logo-details">
                        
                        </div>
                        <ul class="nav-links">
                            <li>
                                <a href="#">
                                    <i class='bx bx-grid-alt'></i>
                                    <span class="link_name">Dashboard</span>
                                </a>
                                <ul class="sub-menu blank">
                                    <li><a class="link_name" href="#">Category</a></li>
                                </ul>
                            </li>
                            <li>
                                <div class="iocn-link">
                                    <a href="#">
                                        <i class='bx bx-collection'></i>
                                        <span class="link_name">Category</span>
                                    </a>
                                    <i class='bx bxs-chevron-down arrow'></i>
                                </div>
                                <ul class="sub-menu">
                                    <li><a class="link_name" href="#">Category</a></li>
                                    <li><a href="#">HTML & CSS</a></li>
                                    <li><a href="#">JavaScript</a></li>
                                    <li><a href="#">PHP & MySQL</a></li>
                                </ul>
                            </li>
                            <li>
                                <div class="iocn-link">
                                    <a href="#">
                                        <i class='bx bx-book-alt'></i>
                                        <span class="link_name">Posts</span>
                                    </a>
                                    <i class='bx bxs-chevron-down arrow'></i>
                                </div>
                                <ul class="sub-menu">
                                    <li><a class="link_name" href="#">Posts</a></li>
                                    <li><a href="/Admin/ListCong">Web Design</a></li>
                                    <li><a href="#">Login Form</a></li>
                                    <li><a href="#">Card Design</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    <i class='bx bx-pie-chart-alt-2'></i>
                                    <span class="link_name">Analytics</span>
                                </a>
                                <ul class="sub-menu blank">
                                    <li><a class="link_name" href="#">Analytics</a></li>
                                </ul>
                            </li>
                           
                            
                            <li>
                                <div class="profile-details">
                                    <div class="profile-content">
                                        <img src="image/profile.jpg" alt="profileImg"></img>
                                    </div>
                                    <div class="name-job">
                                        <div class="profile_name">Prem Shahi</div>
                                        <div class="job">Web Desginer</div>
                                    </div>
                                    <i class='bx bx-log-out'></i>
                                </div>
                            </li>
                        </ul>
                    </div>
 
                </body>

                )


    }
