import { mix } from 'ts-mixer'
import { VideoTexture } from 'tree'
import { ResponsiveTexture } from '~/responsive-texture'


export @mix(VideoTexture, ResponsiveTexture) class VideoResponsiveTexture {

}
