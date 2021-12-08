import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

function Start() {

    const navigate = useNavigate();
    useEffect(() => {navigate('/login')});

    return null;
}

export default Start;