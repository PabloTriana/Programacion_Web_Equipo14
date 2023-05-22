import React, { useState } from 'react'
import { Tab, Button } from "semantic-ui-react"
import { BasicModal } from "../../../components/Shared"
import { UserForm, ListUsers } from "../../../components/Admin/Users"
import "./Users.scss"


export function Users() {
  //crear estado
  const [showModal, setShowModal] = useState(false);
  //crear estado para recarga pagina al registrar
  const [reload, setReload] = useState(false)

  //funcion onclose
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  //funcion reload
  const onReload = () => setReload((prevState) => !prevState)

  const panes = [
    {
      menuItem: "Usuarios activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Usuarios inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers usersActive={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      )
    },
  ];
  return (
    <>
      <div className='users-page'>
        <Button className='users-page__add' primary onClick={onOpenCloseModal}>
          Nuevo Usuario
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear nuevo usuario">
        <UserForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  )
}
