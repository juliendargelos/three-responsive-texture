import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Vector2,
  Vector3,
  Clock
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from './gui'
import { Loader } from './loader'
import { ResponsiveTexture } from '~/index'

/* RENDERING */

const renderer = new WebGLRenderer({ antialias: true })
const camera = new PerspectiveCamera(45, 1, 1, 1000)
camera.position.set(0, 0, 3)

/* SCENE */

const scene = new Scene()
const ambientLight = new AmbientLight()
const responsiveTexture = new ResponsiveTexture()
const loader = new Loader(responsiveTexture)
const size = new Vector2(1, 1)
const plane = new Mesh(
  new PlaneBufferGeometry(),
  new MeshBasicMaterial({ map: responsiveTexture, side: DoubleSide })
)

scene.add(ambientLight, plane)

/* INTERFACE */

const gui = new GUI(size, loader)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.1
controls.zoomSpeed = 0.5

/* UPDATE */

function update(delta: number, time: number): void {
  plane.rotation.x = Math.cos(time) * 0.1
  plane.rotation.y = Math.sin(time) * 0.1

  if (!(size as unknown as Vector3).equals(plane.scale)) {
    plane.scale
      .setX(plane.scale.x + (size.x - plane.scale.x) * Math.min(1, delta * 7))
      .setY(plane.scale.y + (size.y - plane.scale.y) * Math.min(1, delta * 7))

    if (Math.abs(size.x - plane.scale.x) < 0.001) plane.scale.x = size.x
    if (Math.abs(size.y - plane.scale.y) < 0.001) plane.scale.y = size.y

    responsiveTexture.sizing.ratio = plane.scale.x / plane.scale.y
    responsiveTexture.responsiveNeedsUpdate = true
  }

  responsiveTexture.update()
}

/* RESIZE */

function resize(): void {
  const { innerWidth: width, innerHeight: height } = window
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

/* LOOP */

const clock = new Clock()

function loop(): void {
  controls.update()
  update(clock.getDelta(), clock.elapsedTime)
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

/* DOM */

addEventListener('resize', resize)

document.body.style.margin = '0'
document.body.style.overflow = 'hidden'

renderer.domElement.style.top =
renderer.domElement.style.left = '0'
renderer.domElement.style.position = 'absolute'

document.body.appendChild(renderer.domElement)
document.body.appendChild(loader.domElement)
document.body.appendChild(gui.domElement)

/* LOADING */

/* START */

loader.load()
resize()
loop()

