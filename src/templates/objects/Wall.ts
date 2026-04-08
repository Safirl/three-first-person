import { StaticObject } from "base-experience";
import * as THREE from "three";

export class Wall extends StaticObject {
  setGeometry() {
    this.geometry = new THREE.BoxGeometry(10, 10, 1);
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: "red",
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);
  }
}
