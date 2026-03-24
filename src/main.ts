import './reset.css'
import './style.css'
import {Experience, OrbitCamera, World} from "base-experience"
import { sources } from 'base-experience'
import Level from './3D/Level'
import FirstPersonCamera from './camera/FirstPersonCamera'

const init = () => {
  const canvas: HTMLCanvasElement = document.getElementById("three") as HTMLCanvasElement
  if (!canvas) {
    console.error('no canvas found with three identifier')
    return;
  }
  //@ts-ignore
  
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  
  const world = new Level()
  const camera = new FirstPersonCamera()
  const experience = new Experience(canvas, sources, camera, world)
}  

init()