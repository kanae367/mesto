import { SayHi } from "./testing";
import {expect, test} from '@jest/globals';

test('should return Hi', () => {
    expect(typeof SayHi()).toBe('string');
})