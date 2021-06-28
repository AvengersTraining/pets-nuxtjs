import Vue from "vue";

Vue.prototype.$showError = (errors, filed) => {
  if (errors && errors[filed]) {
      return errors[filed][0];
  }
}
