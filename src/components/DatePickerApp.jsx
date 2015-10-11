import React from "react";
import PickerContainer from "./Picker/PickerContainer";
import { config } from "../data/available-dates";

React.render(<PickerContainer config={config} />, document.querySelector(".app-holder"));