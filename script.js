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

const currentState = document.getElementById('currentState');
const switchCheckBox = document.getElementById('checkBox');

fetch(
  'http://192.168.10.234/api/-Gq38OfNT6SGzAl1vzCK5Y9nME4nOt2qIYrfvvTn/lights/3'
)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);

    const state = json.state;
    console.log(state);

    if (state.on === true) {
      const lightOn = 'on';
      currentState.innerHTML += `
        the light is: ${lightOn}
        `;
      //if the light is on and if the switch is checked (switch off/check-true) -> click the switch to uncheck (switch on/uncheck-false)
      if (switchCheckBox.checked != false) {
        switchCheckBox.click();
      }
    } else {
      const lightOff = 'off';
      currentState.innerHTML += `
          the light is: ${lightOff}
          `;
      if (switchCheckBox.checked != true) {
        switchCheckBox.click();
      }
    }
  });

document.querySelectorAll('.buttons').forEach((button) => {
  button.innerHTML += `
    <label class="switch-toggle">
        <div class="button-check" id="buttonCheck">
            <input type="checkbox" class="checkbox" id="checkBox" />
            <span class="switch-btn"></span>
            <span class="layer"></span>
        </div>
    </label>
    `;
});
