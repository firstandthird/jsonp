const getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

export default function jsonp(url, done, queryname = 'callback') {
  const callbackName = `jsonp_${getRandomInt(1, 100)}`;
  window[callbackName] = done;

  const script = document.createElement('script');
  script.src = `${url}&${queryname}=${callbackName}`;
  document.head.appendChild(script);
}
