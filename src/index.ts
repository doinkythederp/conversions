/**
 * Class for converting from one measurement system to another
 */
class Conversions<DataType extends Record<string, number>> {
  /**
   * @param base The base measurement to convert from
   * @param data The differences in measurements compared to the base
   */
  public constructor(public base: keyof DataType, public data: DataType) {}

  /**
   * Converts a value from one measurement to another
   * @param value The value or values to convert
   * @param opts Controls the input and output measurment systems (`to` defaults to {@link Conversions.base})
   *
   * ```ts
   * new Conversions('USD', { ... }).convert([123, 456], { to: 'GBP' });
   * // -> [number, number] (USD -> GBP)
   *
   * new Conversions('mile', { ... }).convert(123, { to: 'kilometer' });
   * // -> number (mile -> kilometer)
   * ```
   */
  public convert(value: number[], opts: { from?: keyof DataType; to: keyof DataType }): number[];
  public convert(value: number, opts: { from?: keyof DataType; to: keyof DataType }): number;
  public convert(value: number | number[], opts: { from?: keyof DataType; to: keyof DataType }): number[] | number;
  public convert(value: number | number[], opts: { from?: keyof DataType; to: keyof DataType }): number[] | number {
    if (Array.isArray(value)) {
      return value.map((v) => this.convert(v, opts));
    }

    return value * this.getConversionRate(opts.to, opts.from ?? this.base);
  }

  /**
   * Creates a {@link ConversionBuilder} for an chaining syntax when converting
   * @param value The value to convert
   *
   * ```ts
   * new Conversions('EUR', { ... }).chain(123).to('GBP');
   * // -> number (EUR -> GBP)
   *
   * new Conversions('inch', { ... }).chain(123).from('centimeter').to('inch');
   * // -> number (centimeter -> inch)
   * ```
   */
  public chain(value: number): ConversionBuilder<DataType> {
    return new ConversionBuilder<DataType>(value, this);
  }

  private getConversionRate(to: keyof DataType, from: keyof DataType): number {
    if (!(to in this.data)) throw new ReferenceError(`Missing measurement system ${to.toString()}`);
    if (!(from in this.data)) throw new ReferenceError(`Missing measurement system ${from.toString()}`);

    return this.data[to] * (1 / this.data[from]);
  }
}

class ConversionBuilder<DataType extends Record<string, number>> {
  public constructor(protected value: number, public readonly parent: Conversions<DataType>) {
    this.fromValue = parent.base;
  }

  protected fromValue: keyof DataType;

  /**
   * Sets the measurement being converted from
   * @param fromValue The measurment to convert from
   */
  public from(fromValue: keyof DataType): this {
    this.fromValue = fromValue;
    return this;
  }

  /**
   * Converts to the specified measurement,
   * from either the measurement set with {@link ConversionBuilder.set}
   * or the base currency
   * @param tuValue The measurment being converted to
   */
  public to(toValue: keyof DataType): number {
    return this.parent.convert(this.value, { from: this.fromValue, to: toValue });
  }
}

export = Conversions;
