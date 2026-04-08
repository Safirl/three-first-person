import { Environment, Experience, Floor, World } from "base-experience";
// import type FirstPersonCamera from "../../camera/FirstPersonCamera";
import { Wall } from "../objects/Wall";
import type FirstPersonCamera from "../../camera/FirstPersonCameraOctree";

export default class NatureWorld extends World {
  declare experience: Experience;
  declare environment: Environment;
  declare resources: Experience["resources"];
  declare floor: Floor;
  declare wall: Wall;

  onResourcesLoaded() {
    this.floor = new Floor();
    this.floor.mesh.position.y = -5;
    this.wall = new Wall();
    this.wall.mesh.position.y = 0;
    this.wall.mesh.position.x = -5;
    this.environment = new Environment();

    // Ajouter les collisions par rapport à la capsule du player
    const camera = Experience.instance?.camera as FirstPersonCamera;
    if (camera.worldOctree) {
      camera.worldOctree.fromGraphNode(this.floor.mesh);
      camera.worldOctree.fromGraphNode(this.wall.mesh);
    }
  }
}
