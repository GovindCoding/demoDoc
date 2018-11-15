/**
 * Utility class that helps to work with numbers.
 */
export class MathHelper {
  /**
   * Adds two numbers.
   * @param {number} augend The first number in an addition.
   * @param {number} addend The second number in an addition.
   * @return {number} Returns the total.
  */
  static add (augend, addend) {
    return augend + addend
  }
  /**
   * Subtract two numbers.
   * @param {number} minuend The first number in a subtraction.
   * @param {number} subtrahend The second number in a subtraction.
   * @return {number} Returns the difference.
  */
  static subtract (minuend, subtrahend) {
    return minuend - subtrahend
  }
  /**
  * Divide two numbers.
   * @param {number} dividend The first number in a division.
    * @param {number} divisor The second number in a division.
    * @return {number} Returns the quotient.
  */
  static divide (dividend, divisor) {
    return dividend / divisor
  }
  /**
   * Multiply two numbers.
   * @param {number} multiplier The first number in a multiplication.
   * @param {number} multiplicand The second number in a multiplication.
   * @return {number} Returns the product.
  */
  static multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}
