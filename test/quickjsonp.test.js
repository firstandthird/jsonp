import test from 'tape-rollup';
import quickJSONP from '../lib/quickjsonp';

const getCallbackName = () => Object.keys(window)
  .filter(prop => prop.indexOf('jsonp_') === 0 && typeof window[prop] === 'function');

const getScripts = (url) => [].slice.call(document.querySelectorAll('script'))
  .filter(script => script.src.indexOf(url) > -1)
  .map(script => script.src);

const testURL = 'test/quickjsonp.test.js';

test('jsonp', assert => {
  let called = false;

  quickJSONP(testURL, () => {
    called = true;
    assert.ok(called, 'callback gets called upon completion');
    assert.end();
  });

  const callbackName = getCallbackName();
  const script = getScripts(testURL)[0];
  const expectedScript = `${testURL}&callback=${callbackName[0]}`;
  assert.ok(script.indexOf(expectedScript) > -1, 'forms a valid jsonp request');

  window[callbackName]();
});
