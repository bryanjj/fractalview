/**
 * Complex number class
 */
export default class Complex {
  re: number;
  im: number;

  /**
   * defines a complex number re + i im
   * @param re {number} real part
   * @param im {number} imaginary part
   */
  constructor(re: number, im: number) {
    this.re = re;
    this.im = im;
  }

  /**
   * Adds this complex number with the given complex number and returns a new complex number
   * @param c {Complex}
   * @returns {Complex}
   */
  add(c: Complex): Complex {
    return new Complex(c.re + this.re, c.im + this.im);
  }

  /**
   * multiplies this complex number with the given complex number and returns a new complex number
   * @param c {Complex}
   * @returns {Complex}
   */
  mult(c: Complex): Complex {
    return new Complex(
      c.re * this.re - c.im * this.im,
      c.re * this.im + c.im * this.re
    );
  }

  /**
   * @returns {Complex} returns a new complex number which is the complex conjugate of this number
   */
  conj(): Complex {
    return new Complex(this.re, -this.im);
  }

  /**
   * @returns {Complex} returns a new complex number which is the norm
   */
  norm(): number {
    return this.mult(this.conj()).re;
  }

  /**
   * @returns {string} returns a string representation of this Complex number
   */
  toString(): string {
    return `${this.re} + ${this.im}i`;
  }
}
