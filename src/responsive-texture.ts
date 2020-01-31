import { Texture, Vector2 } from 'three'

export class ResponsiveTexture extends Texture {
  public responsive: {
    ratio: number
    repeat: number
    anchor: Vector2
    strategy: 'fill' | 'fit'
  } = {
    ratio: 1,
    repeat: 1,
    anchor: new Vector2(0.5, 0.5),
    strategy: 'fill'
  }

  public updateResponsive(): void {
    if (!this.image) return

    const { ratio, strategy, repeat, anchor } = this.responsive
    const textureRatio = this.image instanceof HTMLVideoElement
      ? this.image.videoWidth / this.image.videoHeight
      : this.image.width / this.image.height

    if (strategy === 'fill' ? ratio < textureRatio : ratio > textureRatio) {
      this.repeat.set(repeat / textureRatio * ratio, repeat)
    } else {
      this.repeat.set(repeat, repeat / ratio * textureRatio)
    }

    this.offset
      .copy(this.repeat)
      .multiply(anchor)
      .multiplyScalar(-1)
      .add(anchor)
  }
}
