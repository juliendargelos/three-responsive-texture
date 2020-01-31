import {
  Vector2,
  ClampToEdgeWrapping,
  RepeatWrapping,
  MirroredRepeatWrapping
} from 'three'

import { GUI as BaseGUI } from 'dat.gui'
import { ResponsiveTexture } from '~/index'
import { Loader } from './loader'

const wrapping = {
  'clamp to edge': ClampToEdgeWrapping,
  'repeat': RepeatWrapping,
  'mirrored repeat': MirroredRepeatWrapping
}

export class GUI extends BaseGUI {
  constructor(size: Vector2, loader: Loader) {
    super({ autoPlace: true })

    this.domElement.style.top =
    this.domElement.style.right = '0'
    this.domElement.style.position = 'absolute'

    const texture: ResponsiveTexture = loader.texture
    const updateResponsive = texture.updateResponsive.bind(texture)

    this.add(size, 'x', 0.1, 7)
    this.add(size, 'y', 0.1, 7)

    this.add(texture.responsive, 'repeat', 0.1, 5)
      .onChange(updateResponsive)

    this.add(texture.responsive.anchor, 'x', 0, 1, 0.001)
      .name('anchor x')
      .onChange(updateResponsive)

    this.add(texture.responsive.anchor, 'y', 0, 1, 0.001)
      .name('anchor y')
      .onChange(updateResponsive)

    this.add(texture.responsive, 'strategy', ['fill', 'fit'])
      .onChange(updateResponsive)

    this.add({ wrapS: texture.wrapS }, 'wrapS', wrapping).onChange((wrapS) => {
      texture.wrapS = parseInt(wrapS, 10)
      texture.needsUpdate = true
    })

    this.add({ wrapT: texture.wrapT }, 'wrapT', wrapping).onChange((wrapT) => {
      texture.wrapT = parseInt(wrapT, 10)
      texture.needsUpdate = true
    })

    this.add(loader, 'load').name('load texture')

    this.add({
      reset: () => {
        size.set(1, 1)
        texture.responsive.repeat = 1
        texture.responsive.anchor.set(0.5, 0.5)
        texture.responsive.strategy = 'fill'
        texture.wrapT = texture.wrapS = ClampToEdgeWrapping
        this.__controllers.forEach(controller => controller.updateDisplay())
        texture.needsUpdate = true
        updateResponsive()
      }
    }, 'reset')
  }
}
