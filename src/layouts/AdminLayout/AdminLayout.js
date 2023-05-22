import React from 'react'
//import {Icon} from "../../assets"
import logo from '../../assets/jpg/CourseCode.png'
import { AdminMenu, Logout } from "../../components/Admin/AdminLayout"
import "./AdminLayout.scss"

export function AdminLayout(props) {
    const { children } = props;
    return (
        <div className='admin-layout'>
            <div className='admin-layout__left'>
                <img src={logo} className='logo' alt='logo' />
                <AdminMenu />
            </div>
            <div className='admin-layout__right'>
                <div className='admin-layout__right-header'>
                    <Logout />
                </div>
                <div className='admin-layout__right-content'>
                    {children}
                </div>
            </div>
        </div>
    )
}

// <Icon.LogoWhite className='logo'/>
