class Keypad {
  get code(): string {
    return this._code
  }

  set code(value: string) {
    this._code = value
  }

  private _code: string

  constructor() {
    this._code = ""
  }

  press() {
    // TODO
  }

  move(i: string) {
    return undefined
  }
}

export default Keypad
