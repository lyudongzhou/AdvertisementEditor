export default class Matrix {
  constructor() {}
  toCssArray() {
    var array = new Float32Array(6);
    array[0] = this.a;
    array[1] = this.b;
    array[2] = this.c;
    array[3] = this.d;
    array[4] = this.tx;
    array[5] = this.ty;
    return array;
  }
  setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
    this.a = Math.cos(rotation + skewY) * scaleX;
    this.b = Math.sin(rotation + skewY) * scaleX;
    this.c = -Math.sin(rotation - skewX) * scaleY;
    this.d = Math.cos(rotation - skewX) * scaleY;
    this.tx = x - (pivotX * this.a + pivotY * this.c);
    this.ty = y - (pivotX * this.b + pivotY * this.d);
    return this;
  }
}
