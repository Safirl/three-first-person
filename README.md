# first-person-plugin

A [base-experience](https://github.com/Safirl/three-base-experience) plugin that adds a first-person pointer-lock camera with gravity, WASD movement, and ready-to-use input profiles.

## Contents

| Export | Description |
|---|---|
| `FirstPersonCamera` | Pointer-lock first-person camera extending `Camera` |
| `keyboardProfile` | Keyboard input profile (Space → `jump`) |
| `BitControllerProfile` | 8BitDo Ultimate 2C Wireless input profile |

## Installation

```bash
npm i github:Safirl/first-person-plugin
```

Peer dependencies required in your project:

```bash
npm i github:Safirl/three-base-experience three lil-gui
```

## Quick start

```ts
import { Experience, TemplateWorld, templateSources } from 'base-experience'
import { FirstPersonCamera, keyboardProfile } from 'first-person-plugin'

const canvas = document.getElementById('three') as HTMLCanvasElement
canvas.style.width = '100%'
canvas.style.height = '100%'

const camera = new FirstPersonCamera()
const world = new TemplateWorld()
const experience = new Experience(canvas, templateSources, camera, world)

experience.inputSystem.addInputProfiles([keyboardProfile])
```

Click on the canvas to lock the pointer and enable movement.

## FirstPersonCamera

Uses Three.js [`PointerLockControls`](https://threejs.org/docs/#examples/en/controls/PointerLockControls). The pointer is locked on canvas click and released on `Escape`.

### Default controls

| Input | Action |
|---|---|
| `W` / `↑` | Move forward |
| `S` / `↓` | Move backward |
| `A` / `←` | Strafe left |
| `D` / `→` | Strafe right |
| `Space` | Jump |

> These key bindings are handled directly by `FirstPersonCamera` and are separate from the input profile system.

### Properties

| Property | Default | Description |
|---|---|---|
| `speed` | `3` | Movement speed multiplier |
| `friction` | `200` | Exponential damping applied each frame |
| `mass` | — | Multiplier for gravity force |

### Customising gravity

Override `applyGravity()` to change the gravity behaviour:

```ts
import { FirstPersonCamera } from 'first-person-plugin'
import { Experience } from 'base-experience'

export default class MyCamera extends FirstPersonCamera {
  applyGravity(): void {
    if (!Experience.instance) return
    // Lighter gravity
    this.velocity.y -= 4.0 * this.mass * Experience.instance.time.delta
  }
}
```

## Input profiles

### keyboardProfile

Maps `Space` to the `jump` event via the `InputSystem`.

```ts
import { Experience } from 'base-experience'
import type { InputEventArgs } from 'base-experience'
import { FirstPersonCamera, keyboardProfile } from 'first-person-plugin'

const experience = new Experience(canvas, sources, new FirstPersonCamera(), world)

experience.inputSystem.addInputProfiles([keyboardProfile])
experience.inputSystem.on('jump', (args: InputEventArgs) => {
  console.log('jumped, type:', args.type) // "pressed" | "released"
})
```

### BitControllerProfile

Pre-configured for the **8BitDo Ultimate 2C Wireless** controller.

| Button | Event |
|---|---|
| A | `jump` |
| X | `interact` |
| B | `cancel` |
| Y | `inventory` |
| Left stick | `moveRight` / `moveLeft` / `moveForward` / `moveBackward` |
| Right stick | `lookRight` / `lookLeft` / `lookUp` / `lookDown` |

```ts
import { BitControllerProfile, keyboardProfile } from 'first-person-plugin'

experience.inputSystem.addInputProfiles([keyboardProfile, BitControllerProfile])
```

## Debug mode

When `base-experience` debug mode is active (add `#debug` to the URL), `FirstPersonCamera` exposes a `movements` folder in the lil-gui panel with live controls for `speed` and `friction`.
