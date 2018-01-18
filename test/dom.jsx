/* dom.js */
import localStorage from 'mock-local-storage';
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

window.localStorage = localStorage;

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

require('babel-core/register')({
    'presets': ['es2015', 'react'],
    'plugins': [
        ['transform-class-properties', { 'spec': true }]
      ]
  });
  require.extensions['.scss'] = () => {
    return;
  };
  require.extensions['.css'] = () => {
    return;
  };

global.window = window;
global.document = window.document;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

global.navigator = {
    userAgent: 'node.js',
};

copyProps(window, global);
