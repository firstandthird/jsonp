import test from 'tape-rollup';
import jsonp from '../index';

const getCallbackName = () => Object.keys(window)
  .filter(prop => prop.indexOf('jsonp_') === 0 && typeof window[prop] === 'function');

const getScripts = (url) => [].slice.call(document.querySelectorAll('script'))
  .filter(script => script.src.indexOf(url) > -1)
  .map(script => script.src);

const testURL = 'test/quickjsonp.test.js';
const testParamsURL = 'test/quickjsonp.test.js?param=true';

test('jsonp', assert => {
  let called = false;

  jsonp(testURL, () => {
    called = true;
    assert.ok(called, 'callback gets called upon completion');
    assert.end();
  });

  const callbackName = getCallbackName();
  const script = getScripts(testURL)[0];
  const expectedScript = `${testURL}?callback=${callbackName[0]}`;
  assert.ok(script.indexOf(expectedScript) > -1, 'forms a valid jsonp request');

  window[callbackName]();
});

test('jsonp - URL without params', assert => {
  jsonp(testURL, () => {});

  const script = getScripts(testURL)[0];
  const expectedScript = `${testURL}?callback=`;
  assert.ok(script.indexOf(expectedScript) > -1, 'forms a valid jsonp request');
  assert.end();
});

test('jsonp - URL with params', assert => {
  jsonp(testParamsURL, () => {});

  const script = getScripts(testParamsURL)[0];
  const expectedScript = `${testParamsURL}&callback=`;
  assert.ok(script.indexOf(expectedScript) > -1, 'forms a valid jsonp request');
  assert.end();
});

