jest.dontMock("../DatePickerContainer");
let React = require("react/addons");
let DatePickerContainer = require ("../DatePickerContainer");

describe("Date Picker Container", function() {
    it("Renders with the correct attributes and properties", function() {
        const TestUtils = React.addons.TestUtils;
        const shallowRenderer = TestUtils.createRenderer();
        shallowRenderer.render((<DatePickerContainer />));
        const component = shallowRenderer.getRenderOutput();
        expect(component.type).toBe("div");
        expect(component.props.children._store.originalProps.availableDays).toBeDefined();
        expect(true).toBe(true);
    });
});