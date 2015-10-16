import React from "react";
import CSSModule from "react-css-modules";

export default class TableBody extends React.Component {
    render() {
        return(
            <tbody>
                <tr className="delivery-charge-desc">
                    <td className="timeslot-desc timeslot-sameday">
                        <p className="time-desc">Same day time slot</p>
                        <p className="time">4:30PM - 10PM</p>
                        <p className="extra-info"></p>

                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;29.99</p>
                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                </tr>
                <tr className="delivery-charge-desc">
                    <td className="timeslot-desc timeslot-anytime">
                        <p className="time-desc">Standard Delivery</p>
                        <p className="extra-info"><span className="icon-tick2"></span> We'll text a 4-hour time slot on the day</p>
                        <p className="extra-info"><span className="icon-tick2"></span> Online order tracking - no need to wait in</p>
                        <p className="extra-info"><span className="icon-tick2"></span> Delivery from 7AM - 7PM</p>
                    </td>
                    <td>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;9.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;4.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound; Free</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound; Free</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound; Free</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;4.99</p>
                    </td>
                </tr>
                <tr className="delivery-charge-desc timeslot-row">
                    <td className="timeslot-desc timeslot-morning">
                        <p className="time-desc">Morning</p>
                        <p className="time">07:00 - 12:00</p>
                    </td>
                    <td>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;29.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                </tr>
                <tr className="delivery-charge-desc timeslot-row">
                    <td className="timeslot-desc timeslot-lunch">
                        <p className="time-desc">Lunch</p>
                        <p className="time">10:00 - 14:00</p>
                    </td>
                    <td>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;29.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                </tr>
                <tr className="delivery-charge-desc timeslot-row">
                    <td className="timeslot-desc timeslot-afternoon">
                        <p className="time-desc">Afternoon</p>
                        <p className="time">12:00 - 17:00</p>
                    </td>
                    <td>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;29.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                </tr>
                <tr className="delivery-charge-desc timeslot-row">
                    <td className="timeslot-desc timeslot-evening">
                        <p className="time-desc">Evening</p>
                        <p className="time">18:00 - 22:00</p>
                    </td>
                    <td>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;29.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;19.99</p>
                    </td>
                    <td>
                        <p className="delivery-selectable">&pound;24.98</p>
                    </td>
                </tr>
            </tbody>
        );
    }
}