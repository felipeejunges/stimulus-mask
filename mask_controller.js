import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  specials = ['"', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', '§',
    '¹', '²', '³', '£', '¢', '¬', '´', '`', '{', 'ª', '~', '}', 'º', '<',
    ',', '>', '.', ';', ':', '?', '/', '°', '|', ' ', '[', ']'];

  connect() {
    this.apply(false, null);
    this.element.addEventListener('keypress', (e) => {
      this.apply(true, e);
    })
  }

  replaceSpecialCharForRegex(str, char) {
    let replace = '';
    replace = replace.concat('[').concat(char).concat(']');
    debugger
    return str.replace(new RegExp(replace), replace.concat('?'));
  };

  replaceForRegex(values) {
    values = values.toLowerCase();

    debugger
    this.specials.forEach((c) => {
      values = this.replaceSpecialCharForRegex(values, c);
    });

    values = values.replace(/\s/g, '\\s');
    values = values.replace(/x/g, '\\S');
    values = values.replace(/a/g, '[a-zA-Z]');
    values = values.replace(/0/g, '\\d');

    return values;
  };

  apply(typed, e) {
    if (this.data.has("pattern") && this.data.get("pattern") !== '' && this.data.get("pattern") != [] && this.data.get("pattern") != {}) {
      let oldVal = this.element.value;
      let selectionStart = this.element.selectionStart;

      if (typed) this.element.value = this.element.value.slice(0, selectionStart).concat(e.key).concat(this.element.value.slice(selectionStart));

      let size = this.element.value.length;

      let values = this.data.get("pattern");

      if (typeof values === 'object') {
        if (values.length === 1) {
          values = values[0];
        } else {
          let oldSize = 0;
          let mask = '';
          values.forEach((m) => {
            if (this.element.value.length > oldSize) {
              mask = m;
              oldSize = m.length;
            }
          });
          values = mask;
        }
      }

      let oldValues = values;

      this.element.value = this.element.value.replace(/\W/g, '');

      if (values.charAt(size) == ' ') {
        size = size + 1;
      }
      values = values.substring(0, size);

      values.split('').forEach((char, position) => {
        if (char.match(/\W/)) {
          this.specials.forEach((c) => {
            if (c === char) {
              if (this.element.value.charAt(position) !== char) {
                size = this.element.value.length + 1;
                values = oldValues.substring(0, size);
                this.element.value = this.element.value.slice(0, position).concat(char).concat(this.element.value.slice(position));
                if (position === selectionStart) selectionStart = selectionStart + 1;
                return false;
              }
            }
          });
        }
      });

      values = this.replaceForRegex(values);

      let regex = new RegExp(values);
      debugger
      let match = this.element.value.match(regex);

      if (match != null) {
        let val = match.join('');
        this.element.value = val;
      } else {
        this.element.value = oldVal;
      }
      if (typed) {
        this.element.selectionStart = selectionStart + 1;
        this.element.selectionEnd = selectionStart + 1;
        e.preventDefault();
        e.target.value = this.element.value;
      }
      this.element.dispatchEvent(new CustomEvent('input'));
    }
  };
}
