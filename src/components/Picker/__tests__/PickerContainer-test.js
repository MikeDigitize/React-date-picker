jest.autoMockOff();
let React = require("react/addons");
let PickerContainer = require ("../PickerContainer");
let CheckoutStore = require ("../../../stores/CheckoutStore");
let data = require ("../../../data/available-dates");
let actions = require ("../../../actions/table-data-actions");

describe("Date Picker Container", function() {

    var component;

    function wait(){
        return new Promise((resolve, rej) => {
            let TestUtils = React.addons.TestUtils;
            let shallowRenderer = TestUtils.createRenderer();
            let PickerElement = <PickerContainer config={data.config}/>;
            shallowRenderer.render(PickerElement);
            component = shallowRenderer.getRenderOutput();
            resolve();
        });
    }

    pit("Accepts props and renders with the correct state ", function () {

        let loadComponent = wait();
        return loadComponent.then(function(){
            expect(Object.keys(component.props).length).toBe(2);
            expect(Object.keys(component.props)[0]).toBe("dateChargesConfig");
            expect(Object.keys(component.props)[1]).toBe("availableDates");
        });

    });
});