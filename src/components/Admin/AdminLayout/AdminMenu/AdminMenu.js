import React from 'react'
import { Menu, Icon } from "semantic-ui-react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../../../hooks"
import "./AdminMenu.scss"

/*Implementacion del menu lateral de navegacion */
export function AdminMenu() {

    const { pathname } = useLocation(); //Obtener url para comparar los stados del menu

    const { user: { role } } = useAuth();    //Obtener el role del usuario

    const isAdmin = role === "admin"; //Validar los roles para mostrar opiones del menu


    const isCurrentPath = (path) => {    //funcion para comparar los pathname
        if (path === pathname) return true;
        return false;
    }
    return (
        <Menu fluid vertical icon text className='admin-menu'>
            {isAdmin && (
                <>
                    <Menu.Item as={Link} to="/admin/users" active={isCurrentPath("/admin/users")}>
                        <Icon name='user outline' />
                        Usuario
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/menu" active={isCurrentPath("/admin/menu")}>
                        <Icon name='bars' />
                        Menu
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/courses" active={isCurrentPath("/admin/courses")}>
                        <Icon name='computer' />
                        Cursos
                    </Menu.Item>

                    <Menu.Item as={Link} to="/admin/newsletter" active={isCurrentPath("/admin/newsletter")}>
                        <Icon name='dashboard' />
                        Dashboard
                    </Menu.Item>
                </>
            )}

           
            

        </Menu>
    )
}

/*En esta Parte se modifica el menu */

/*Linea 47 va pegado
    <Menu.Item as={Link} to="/admin/blog" active={isCurrentPath("/admin/blog")}>
        <Icon name='comment alternate outline' />
            blog
    </Menu.Item> */
