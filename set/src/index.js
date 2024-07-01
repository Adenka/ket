import React from 'react';
import App from './components/App';
import { render } from "react-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = document.getElementById("root");
render(<App />, root);

serviceWorkerRegistration.register()