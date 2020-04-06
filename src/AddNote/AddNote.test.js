import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import AddNote from './AddNote';

describe ('AddNote component', () => {
    it ('renders the complete AddNote form', () => {
        const wrapper = shallow(<AddNote/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})