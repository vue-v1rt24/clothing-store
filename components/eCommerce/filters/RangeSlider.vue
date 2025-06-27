<script setup lang="ts">
const { min = 20, max = 700 } = defineProps<{
  min?: number;
  max?: number;
}>();

//
const inpMin = ref(min);
const inpMax = ref(max);

//
onMounted(() => {
  setTimeout(() => init2slider('id66', 'id66b', 'id661', 'id662', 'id66i1', 'id66i2'), 0);

  function init2slider(
    idX: string,
    btwX: string,
    btn1X: string,
    btn2X: string,
    input1: string,
    input2: string,
  ) {
    const slider = document.getElementById(idX) as HTMLElement;
    const between = document.getElementById(btwX) as HTMLElement;
    const button1 = document.getElementById(btn1X) as HTMLElement;
    const button2 = document.getElementById(btn2X) as HTMLElement;
    const inpt1 = document.getElementById(input1) as HTMLInputElement;
    const inpt2 = document.getElementById(input2) as HTMLInputElement;

    const min = inpt1.min;
    const max = inpt1.max;

    /*init*/
    const sliderCoords = getCoords(slider);
    button1.style.marginLeft = '0px';
    button2.style.marginLeft = slider.offsetWidth - button1.offsetWidth + 'px';
    between.style.width = slider.offsetWidth - button1.offsetWidth + 'px';
    inpt1.value = min;
    inpt2.value = max;

    //
    inpt1.onchange = function (evt) {
      if (parseInt(inpt1.value) < +min) inpt1.value = min;
      if (parseInt(inpt1.value) > +max) inpt1.value = max;
      if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
        const temp = inpt1.value;
        inpt1.value = inpt2.value;
        inpt2.value = temp;
      }

      const sliderCoords = getCoords(slider);
      const per1 = (parseInt(inpt1.value - min) * 100) / (max - min);
      const per2 = (parseInt(inpt2.value - min) * 100) / (max - min);
      const left1 = (per1 * (slider.offsetWidth - button1.offsetWidth)) / 100;
      const left2 = (per2 * (slider.offsetWidth - button1.offsetWidth)) / 100;

      button1.style.marginLeft = left1 + 'px';
      button2.style.marginLeft = left2 + 'px';

      if (left1 > left2) {
        between.style.width = left1 - left2 + 'px';
        between.style.marginLeft = left2 + 'px';
      } else {
        between.style.width = left2 - left1 + 'px';
        between.style.marginLeft = left1 + 'px';
      }

      /*  */
      inpMin.value = +inpt1.value;
      inpMax.value = +inpt2.value;
    };

    //
    inpt2.onchange = function (evt) {
      if (parseInt(inpt2.value) < min) inpt2.value = min;
      if (parseInt(inpt2.value) > max) inpt2.value = max;
      if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
        const temp = inpt1.value;
        inpt1.value = inpt2.value;
        inpt2.value = temp;
      }

      const sliderCoords = getCoords(slider);
      const per1 = (parseInt(inpt1.value - min) * 100) / (max - min);
      const per2 = (parseInt(inpt2.value - min) * 100) / (max - min);
      const left1 = (per1 * (slider.offsetWidth - button1.offsetWidth)) / 100;
      const left2 = (per2 * (slider.offsetWidth - button1.offsetWidth)) / 100;

      button1.style.marginLeft = left1 + 'px';
      button2.style.marginLeft = left2 + 'px';

      if (left1 > left2) {
        between.style.width = left1 - left2 + 'px';
        between.style.marginLeft = left2 + 'px';
      } else {
        between.style.width = left2 - left1 + 'px';
        between.style.marginLeft = left1 + 'px';
      }

      /*  */
      inpMin.value = +inpt1.value;
      inpMax.value = +inpt2.value;
    };

    /*mouse*/
    button1.onmousedown = function (evt) {
      const sliderCoords = getCoords(slider);
      const betweenCoords = getCoords(between);
      const buttonCoords1 = getCoords(button1);
      const buttonCoords2 = getCoords(button2);
      let shiftX2 = evt.pageX - buttonCoords2.left;
      const shiftX1 = evt.pageX - buttonCoords1.left;

      document.onmousemove = function (evt) {
        let left1 = evt.pageX - shiftX1 - sliderCoords.left;
        const right1 = slider.offsetWidth - button1.offsetWidth;
        if (left1 < 0) left1 = 0;
        if (left1 > right1) left1 = right1;
        button1.style.marginLeft = left1 + 'px';

        shiftX2 = evt.pageX - buttonCoords2.left;
        let left2 = evt.pageX - shiftX2 - sliderCoords.left;
        const right2 = slider.offsetWidth - button2.offsetWidth;
        if (left2 < 0) left2 = 0;
        if (left2 > right2) left2 = right2;

        let per_min = 0;
        let per_max = 0;
        if (left1 > left2) {
          between.style.width = left1 - left2 + 'px';
          between.style.marginLeft = left2 + 'px';

          per_min = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
          per_max = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
        } else {
          between.style.width = left2 - left1 + 'px';
          between.style.marginLeft = left1 + 'px';

          per_min = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
          per_max = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
        }
        inpt1.value = parseInt(min) + Math.round(((max - min) * per_min) / 100);
        inpt2.value = parseInt(min) + Math.round(((max - min) * per_max) / 100);

        /*  */
        inpMin.value = +inpt1.value;
        inpMax.value = +inpt2.value;
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
      return false;
    };

    //
    button2.onmousedown = function (evt) {
      const sliderCoords = getCoords(slider);
      const betweenCoords = getCoords(between);
      const buttonCoords1 = getCoords(button1);
      const buttonCoords2 = getCoords(button2);
      const shiftX2 = evt.pageX - buttonCoords2.left;
      let shiftX1 = evt.pageX - buttonCoords1.left;

      document.onmousemove = function (evt) {
        let left2 = evt.pageX - shiftX2 - sliderCoords.left;
        const right2 = slider.offsetWidth - button2.offsetWidth;
        if (left2 < 0) left2 = 0;
        if (left2 > right2) left2 = right2;
        button2.style.marginLeft = left2 + 'px';

        shiftX1 = evt.pageX - buttonCoords1.left;
        const left1 = evt.pageX - shiftX1 - sliderCoords.left;
        const right1 = slider.offsetWidth - button1.offsetWidth;
        if (left1 < 0) left1 = 0;
        if (left1 > right1) left1 = right1;

        let per_min = 0;
        let per_max = 0;

        if (left1 > left2) {
          between.style.width = left1 - left2 + 'px';
          between.style.marginLeft = left2 + 'px';
          per_min = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
          per_max = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
        } else {
          between.style.width = left2 - left1 + 'px';
          between.style.marginLeft = left1 + 'px';
          per_min = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
          per_max = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
        }
        inpt1.value = parseInt(min) + Math.round(((max - min) * per_min) / 100);
        inpt2.value = parseInt(min) + Math.round(((max - min) * per_max) / 100);

        /*  */
        inpMin.value = +inpt1.value;
        inpMax.value = +inpt2.value;
      };

      document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
      };
      return false;
    };

    button1.ondragstart = function () {
      return false;
    };
    button2.ondragstart = function () {
      return false;
    };

    function getCoords(elem: HTMLElement) {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
      };
    }
  }
});
</script>

<template>
  <div class="slider_wrap">
    <!-- Поля вывода -->
    <div class="slider__fields">
      <input id="id66i1" class="range_inpt1" type="number" :min="min" :max="max" />
      <input id="id66i2" class="range_inpt2" type="number" :min="min" :max="max" />
    </div>

    <div id="id66" class="range">
      <!-- Линия -->
      <div id="id66b" class="range__between"></div>

      <!-- Ползунки -->
      <button id="id661" class="range__button_1"></button>
      <button id="id662" class="range__button_2"></button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.slider_wrap {
}

/*  */

.slider__fields {
  display: flex;
  column-gap: 30px;
  margin-bottom: 30px;
}

.range_inpt1,
.range_inpt2 {
  width: 100%;
}

/*  */

.range {
  position: relative;
  /* width: 500px; */
  width: 100%;
  height: 10px;

  border-radius: 4px;
  background-color: #ddd;
}

.range__button_1,
.range__button_2 {
  position: absolute;
  top: 50%;

  width: 20px;
  height: 20px;

  cursor: grab;
  transform: translateY(-50%);

  border: none;
  border-radius: 50%;
  background-color: #999;
}

.range__between {
  position: absolute;
  height: 5px;
  width: 0px;
  margin-top: 3px;
  border: none;
  background-color: #559933;
}
</style>
