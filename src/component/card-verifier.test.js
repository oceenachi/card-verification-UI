import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library';
import Input from './Input/Input';


afterEach(cleanup)

describe('Input component', ()=>{
    test('Renders the right input value', ()=>{
        const setup = ()=> {
            const utils = render(<Input />);
            const input = utils.getByLabelText('form-input');
            return {
                input,
                ...utils,
            };
        };
        const { input } = setup();
        fireEvent.change(input, {target: {
            value: '4236543'
        }});
        expect (input.value).toBe('4236543');
    })
    test('renders without crashing', ()=>{
        expect(()=> render(<Input/>))
        .not.toThrowError();
    });

})