import { Actor, Environment, World } from "base-experience";
import type { GLTF } from "three/examples/jsm/Addons.js";

export default class Level extends World {
    declare fox: Actor

    onResourcesLoaded(): void {
        this.fox = new Actor("Fox", this.resources.items.foxModel as GLTF)
        this.fox.model.scale.set(0.02, 0.02, 0.02)
        this.environment = new Environment()
    }

    update(): void {
        if (this.fox) {
            this.fox.update()
        }
    }
}