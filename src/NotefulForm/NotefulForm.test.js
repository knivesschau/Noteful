import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import NotefulForm from './NotefulForm';

describe ('NotefulForm component', () => {
    const props = {
        className: 'test-class-name',
        children: <p>test children</p>,
        'data-other': 'test-other-prop'
    };

    it ('renders a NotefulForm (form) by default', () => {
        const wrapper = shallow(<NotefulForm/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    });

    it ('renders the NotefulForm given the props', () => {
        const wrapper = shallow(<NotefulForm {...props}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    });
})