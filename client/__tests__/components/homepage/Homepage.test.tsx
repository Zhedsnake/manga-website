import React from 'react';
import {describe, expect, test} from '@jest/globals';
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import Homepage from "../../../src/components/homepage/Homepage";

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<Homepage />)
    expect(true).toBeTruthy()
})