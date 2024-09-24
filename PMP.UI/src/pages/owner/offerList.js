import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OwnerService from '../../service/owner-service';
import SendMessage from '../../components/messages/send-message';
import MessageDialog from '../../components/messages/message-dialog';
import { MessageService } from '../../service/messager-service';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useParams } from 'react-router';
import OfferTable from './offerTable';
const Offerlist = (props) => {

    
    return (
        <div>
            <OfferTable></OfferTable>
        </div>
    )
}

export default Offerlist