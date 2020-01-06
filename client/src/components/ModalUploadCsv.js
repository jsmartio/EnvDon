import React, { useState } from 'react';
import { Alert, Button,  FormGroup,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { upload, downLoadCSV } from './DonorFunctions'

/////////////

const UploadCSVForm = (props) => {


    const onClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        upload().then(res => {
            
            document.getElementById("file").value = "";
            alert('csv file uploaded')
            props.toggle();
        })
      }

    //const [errors, setErrors] = useState('')

    return (
        <div>
            <Alert color="danger" id="errmsg" className="hideStart"></Alert>
            
            <form method="post" encType="multipart/form-data" >

                <Alert color="dark">
                        Playlist CSV Format:<br /><br />
                        "id","donorKey","donorName","Letter","donor_order"
                </Alert>

                <FormGroup>
                    <input type="file" id="file" color="primary"  />
                </FormGroup>
                <Button type="submit" color="primary" block  onClick={onClick}>Submit</Button>

            </form>

        </div>
    );
  }


  export const ModalUploadCsv = (props) => {

    const {className } = props;
    const [modal, setModal] = useState(false);
    const [alertClass, setAlertClass] = useState('hid');
    const [alertText, setAlertText] = useState('');
    
    const dlCSV = (e) => {
        setAlertClass('visible')
        setAlertText('creating csv .....')

        downLoadCSV().then(res => {
            console.log(res)
            setAlertClass('visible')
            setAlertText('Your CSV file is ready for download ')
            window.location = '/tmp/' + res.data

        })
    }

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className="donors__CSV-upload flex_container_row pad5">
                <Alert color="success" className={alertClass}>
                    {alertText}
                </Alert>
            </div>
            <div className="donors__CSV-upload flex_container_row pad5">
                <div className="buttonGR" id="ref_donors"  onClick={dlCSV}>
                    &#8615; Download CSV
                </div>
                

                <div className="leftpad15">{/* spacer */}</div>

                <div className="buttonGR " id="addUser" onClick={toggle}>
                &#8613; Upload CSV
              </div>
            </div>

            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}> Upload CSV</ModalHeader>
                <ModalBody>
                    <UploadCSVForm addCSVStart={props.addCSVStart} toggle={toggle}/>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </div>
    );
}


export default ModalUploadCsv;