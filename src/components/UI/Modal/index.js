import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function newModel(props) {
    return (
        <>

            <Modal show={props.show} size={props.size} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {props.children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.handleClose} onClick={props.action}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
