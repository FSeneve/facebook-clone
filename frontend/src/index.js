import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/icons/icons.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import { createStore } from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./reducers";

const store = createStore(rootReducer, composeWithDevTools());

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Router>
           <App />
        </Router>
    </Provider>
)
