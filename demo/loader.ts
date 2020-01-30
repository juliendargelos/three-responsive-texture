import { TextureLoader } from 'three'
import { ResponsiveTexture } from '~/index'

export class Loader {
  public domElement: HTMLElement = document.createElement('p')
  public texture: ResponsiveTexture

  public constructor(texture: ResponsiveTexture) {
    this.texture = texture
    this.loading = false

    this.domElement.textContent = 'Loading texture...'
    this.domElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    this.domElement.style.transition = '.4s'
    this.domElement.style.top =
    this.domElement.style.left = '0'
    this.domElement.style.width =
    this.domElement.style.height = '100%'
    this.domElement.style.margin = '0'
    this.domElement.style.padding = '30px'
    this.domElement.style.fontFamily = 'sans-serif'
    this.domElement.style.fontSize = '30px'
    this.domElement.style.color = '#fff'
    this.domElement.style.display = 'flex'
    this.domElement.style.alignItems = 'center'
    this.domElement.style.justifyContent = 'center'
    this.domElement.style.boxSizing = 'border-box'
    this.domElement.style.position = 'absolute'
    this.domElement.style.zIndex = '1000'
  }

  private get loading(): boolean {
    return this.domElement.style.opacity !== '0'
  }

  private set loading(loading: boolean) {
    this.domElement.style.opacity = loading ? '1' : '0'
    this.domElement.style.pointerEvents = loading ? null : 'none'
  }

  public load(): void {
    if (this.loading) return
    this.loading = true

    new TextureLoader().load('https://picsum.photos/1024/512', (texture) => {
      this.texture.copy(texture)
      this.texture.needsUpdate = true
      this.texture.responsiveNeedsUpdate = true
      this.loading = false
    })
  }
}
