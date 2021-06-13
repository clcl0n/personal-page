import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';
import App from './App';

library.add(faLink, faEnvelope, faMapMarkerAlt);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
