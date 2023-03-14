import React from 'react';
import BirdProfile from '../app/screens/BirdProfile';
import {shallow} from 'enzyme';

describe('BirdProfile', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<BirdProfile />);
        expect(wrapper).toMatchSnapshot();
    });
    }
);