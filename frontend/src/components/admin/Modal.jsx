import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalBox(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.close}
        backdrop="static"
        keyboard={false}
        className='text-black'
      >
        <Modal.Header className='border-gray-300'>
          <Modal.Title>
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          {props.body}
        </Modal.Body>
        <Modal.Footer className='border-gray-300'>
          <Button variant={props.secondaryBtnVariant} onClick={props.close}>
            {props.secondaryBtn}
          </Button>
          <Button variant={props.primaryBtnVariant} onClick={props.confirmAction}>
            {props.primaryBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBox;