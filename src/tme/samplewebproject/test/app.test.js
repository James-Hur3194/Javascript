const assert = require('assert');
const render = require('../../render');

it('has a text input', async () => {
  const dom = await render('index.html');
  
  //console.log(dom);
  const input = dom.window.document.querySelector('input');

  if (!input) {
    throw new Error('');
  }

  assert(input);

});

it('shows a success message with a valid email', async() => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'adlkfjasd@lkf.com';
  
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  console.log(h1.innerHTML);

  assert.strictEqual(h1.innerHTML, 'Looks good!');
});


it('shows a failed message with a valid email', async() => {
  const dom = await render('index.html');

  const input = dom.window.document.querySelector('input');
  input.value = 'adlkfjasdlkf.com';
  
  dom.window.document
    .querySelector('form')
    .dispatchEvent(new dom.window.Event('submit'));

  const h1 = dom.window.document.querySelector('h1');

  console.log(h1.innerHTML);

  assert.strictEqual(h1.innerHTML, 'Invalid email');
});