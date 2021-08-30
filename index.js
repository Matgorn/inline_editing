const inlineEditText = document.querySelector('#inline-edit');
const wrapper = document.querySelector('#wrapper');

const isInput = (elementName) => elementName === 'input';

const switchElement = (next, present) => (e) => {
  if (e.type === 'keypress') {
    e.key === 'Enter' && e.target.blur();
    
    return;
  };
  
  const { name, events } = next;
  const element = document.createElement(name);

  element.id = 'inline-edit';
  isInput(name) ? element.value = e.target.innerText : element.innerText = e.target.value;
  
  wrapper.contains(e.target) && wrapper.removeChild(e.target);
  wrapper.appendChild(element);

  if (isInput(name)) {
    element.select();
  };
  
  events.forEach(eventName => element.addEventListener(eventName, switchElement(present, next)));
}

const interface = {
  input: {
    name: 'input',
    events: ['focusout', 'keypress']
  },
  text: {
    name: 'p',
    events: ['click']
  }
};

inlineEditText.addEventListener('click', switchElement(interface.input, interface.text));