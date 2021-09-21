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
const currentState = document.getElementById('currentState');

const switchCheckBoxes = [];
document.querySelectorAll('.switch-toggle').forEach((switchToggle, index) => {
  switchToggle.innerHTML += `
        <div class="button-check" id="buttonCheck">
            <input type="checkbox" class="checkbox" id="checkBox${index}" />
            <span class="switch-btn"></span>
            <span class="layer"></span>
        </div>
    `;
  console.log(index);
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
      console.log('switch checkbox: true, switch is off. Turn OFF the light!');
      fetch(API_LIGHTS_STATES[index], {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ on: false }),
      });
    } else {
      console.log('switch checkbox: false, switch is on. Turn ON the light!');
      fetch(API_LIGHTS_STATES[index], {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ on: true }),
      });
    }
  };
});
