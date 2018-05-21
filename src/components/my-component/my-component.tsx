import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { Validator, getValidator, defaultValidator, ValidatorEntry } from '../../validators';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true
})
export class MyComponent {

  @Prop({mutable: true}) value: string;

  @Prop() validator: Array<string | ValidatorEntry | Validator<string>>;

  @Event() changed: EventEmitter<string>;

  _validator: Validator<string> = defaultValidator;

  componentWillLoad() {
    this._validator = getValidator<string>(this.validator);
  }

  componentWillUpdate() {
    this._validator = getValidator<string>(this.validator);
  }

  handleChange(ev) {
    this.value = ev.target ? ev.target.value : null;
    this.changed.emit(this.value);
  }

  render() {
    return (
        <div>
          <div class="input-container">
            <input value={this.value} onInput={(ev) => this.handleChange(ev)}/>          
          </div>
          {!this._validator.validate(this.value) ? 
            <span class="validation-error">{this._validator.errorMessage}</span>
          : null }
        </div>
    );
  }
}


