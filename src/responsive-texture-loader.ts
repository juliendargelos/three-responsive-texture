/**
 * This class is a modified version of the three.js TextureLoader:
 * https://github.com/mrdoob/three.js/blob/master/src/loaders/TextureLoader.js
 *
 * The MIT License
 *
 * Copyright © 2010-2020 three.js authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {
  ImageLoader,
  TextureLoader,
  RGBAFormat,
  RGBFormat
} from 'three'

import { ResponsiveTexture } from '~/responsive-texture'

export class ResponsiveTextureLoader extends TextureLoader {
  public load(
    url: string,
    onLoad?: (texture: ResponsiveTexture) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): ResponsiveTexture {
    const texture = new ResponsiveTexture()
    const loader = new ImageLoader(this.manager)

    loader.setCrossOrigin(this.crossOrigin)
    loader.setPath(this.path)

    loader.load(url, (image: HTMLImageElement) => {
      texture.image = image

      const isJPEG = (
        url.search( /\.jpe?g($|\?)/i ) > 0 ||
        url.search( /^data\:image\/jpeg/ ) === 0
      )

      texture.format = isJPEG ? RGBFormat : RGBAFormat
      texture.updateResponsive()
      texture.needsUpdate = true

      onLoad && onLoad(texture)
    }, onProgress, onError)

    return texture
  }
}
