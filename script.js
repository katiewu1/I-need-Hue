//{"devicetype":"my_hue_app#phone katie"}
//"username": "-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn"
//ip: 192.168.10.234
//json all lights: http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights
//json one specific light, id 3: http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/3
//state object: http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/3/state
//turn of light (body): {"on":false} ; Method: PUT
//state object-change colors (body): {"on":true, "sat":254, "bri":254,"hue":10000} ; Method: PUT
//saturation/intensity maximum: 254
//brightness maximum: 254
//hue/measure of color: 10000 points (hue runs from 0 to 65535)

// Convert RGB to XY for Philips Hue lights
// let xy = ColorConverter.rgbToXy(red, green, blue, light.modelid);
// // xy = {x: xValue, y: yValue};

// Convert XY + bightness to RGB
// let rgb = ColorConverter.xyBriToRgb(x ,y , brightness);
// // rgb =  {r: redValue, g: greenValue, b: blueValue}

// import ColorConverter from './ColorConverter.js';

const API_LIGHTS = [
  'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/3',
  'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/2',
  'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/1',
];

const API_LIGHTS_STATES = [
  'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/3/state',
  'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/2/state',
  'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/1/state',
];
// const API_LIGHT_3 =
//   'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/3';
// const API_LIGHT_3_STATE =
//   'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/3/state';
// const API_LIGHT_2 =
//   'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/2';
// const API_LIGHT_2_STATE =
//   'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/2/state';
const currentStateOffice = document.getElementById('currentStateOffice');
const heyBtn = document.getElementById('heyButton');
const workBtn = document.getElementById('workButton');
const eatBtn = document.getElementById('eatButton');
const fikaBtn = document.getElementById('fikaButton');
const sleepBtn = document.getElementById('sleepButton');
const helpBtn = document.getElementById('helpButton');

const switchCheckBoxes = [];
document.querySelectorAll('.switch-toggle').forEach((switchToggle, index) => {
  switchToggle.innerHTML += `
        <div class="button-check" id="buttonCheck">
            <input type="checkbox" class="checkbox" id="checkBox${index}" />
            <span class="switch-btn"></span>
            <span class="layer"></span>
        </div>
    `;
  // console.log(index);
  switchCheckBoxes[index] = document.getElementById(`checkBox${index}`);
});

API_LIGHTS.forEach((API, index) => {
  fetch(API)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      //console.log(json);
      const state = json.state;
      //console.log(state);

      if (state.on === true) {
        //if the light is on and if the switch is checked (switch off/check-true) -> click the switch to uncheck (switch on/uncheck-false)
        if (switchCheckBoxes[index].checked != false) {
          switchCheckBoxes[index].click();
        }
      } else {
        if (switchCheckBoxes[index].checked != true) {
          switchCheckBoxes[index].click();
        }
      }
    });
});

switchCheckBoxes.forEach((_, index) => {
  switchCheckBoxes[index].onchange = () => {
    //checked === true, the switch is off/turned off the switch
    if (switchCheckBoxes[index].checked === true) {
      // console.log('switch checkbox: true, switch is off. Turn OFF the light!');
      fetch(API_LIGHTS_STATES[index], {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ on: false }),
      });
    } else {
      // console.log('switch checkbox: false, switch is on. Turn ON the light!');
      fetch(API_LIGHTS_STATES[index], {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ on: true }),
      });
    }
  };
});

// only the office light have xyBri values
const showCurrentColorOffice = () => {
  fetch(API_LIGHTS[0])
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json.state.xy);
      // xy": [0.4573, 0.4100]
      const x = json.state.xy[0];
      // console.log('x:', x);
      const y = json.state.xy[1];
      // console.log('y:', y);
      const brightness = json.state.bri;
      // console.log('brightness:', brightness);
      let rgb = ColorConverter.xyBriToRgb(x, y, brightness);
      console.log('rgb:', rgb);
      currentStateOffice.style.background = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    });
};

showCurrentColorOffice();

heyBtn.addEventListener('click', () => {
  let xy_values = ColorConverter.rgbToXy(192, 149, 76);
  console.log('xy: ', xy_values);
  currentStateOffice.style.background = ' rgb(192,149,76)';
  fetch(API_LIGHTS_STATES[0], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xy: [xy_values.x, xy_values.y] }),
  });
});

workBtn.addEventListener('click', () => {
  let xy_values = ColorConverter.rgbToXy(159, 187, 206);
  console.log('xy: ', xy_values);
  currentStateOffice.style.background = ' rgb(159, 187, 206)';

  fetch(API_LIGHTS_STATES[0], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xy: [xy_values.x, xy_values.y] }),
  });
});

eatBtn.addEventListener('click', () => {
  let xy_values = ColorConverter.rgbToXy(45, 214, 77);
  console.log('xy: ', xy_values);
  currentStateOffice.style.background = ' rgb(45,214,77)';
  fetch(API_LIGHTS_STATES[0], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xy: [xy_values.x, xy_values.y] }),
  });
});

fikaBtn.addEventListener('click', () => {
  let xy_values = ColorConverter.rgbToXy(255, 117, 253);
  console.log('xy: ', xy_values);
  currentStateOffice.style.background = ' rgb(255,117,253)';
  fetch(API_LIGHTS_STATES[0], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xy: [xy_values.x, xy_values.y] }),
  });
});

sleepBtn.addEventListener('click', () => {
  let xy_values = ColorConverter.rgbToXy(245, 153, 32);
  console.log('xy: ', xy_values);
  currentStateOffice.style.background = ' rgb(245,153,32)';
  fetch(API_LIGHTS_STATES[0], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xy: [xy_values.x, xy_values.y] }),
  });
});

// when click on "help button for the Office light it will change color to red/pink
helpBtn.addEventListener('click', () => {
  // rgb(205,92,92) after converting till xy it will show us rgb(247,94,116) instead
  let xy_values = ColorConverter.rgbToXy(255, 70, 1);
  // console.log('xy: ', xy_values);
  currentStateOffice.style.background = ' rgb(255,70,1)';

  fetch(API_LIGHTS_STATES[0], {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ xy: [xy_values.x, xy_values.y] }),
  });
  // let rgb_2 = ColorConverter.xyBriToRgb(0.5566, 0.2921, 89);
  // console.log('rgb 2', rgb_2);
});
