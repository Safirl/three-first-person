/**
 * Implementation of https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html
 */

import { Camera, Experience, Time } from "base-experience";
import * as THREE from "three"
import { PointerLockControls } from "three/examples/jsm/Addons.js";

export default class FirstPersonCamera extends Camera {
    declare controls: PointerLockControls

    //Movements
    declare moveForward: boolean;
    declare moveBackward: boolean;
    declare moveLeft: boolean;
    declare moveRight: boolean;
    declare canJump: boolean;

    declare velocity: THREE.Vector3;
    declare direction: THREE.Vector3;
    declare speed: number;
    declare friction: number
    declare mass: number;

    constructor() {
        super()
        this.moveBackward = false;
        this.moveForward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false;

        this.velocity = new THREE.Vector3()
        this.direction = new THREE.Vector3()
        this.speed = .005
        this.friction = .03
    }

    init(): void {
        super.init()
    }
    
    setInstance(): void {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100,
        );
        this.instance.position.set(0, 1, 10);
        super.setInstance()
    }

    setControls() {
        this.controls = new PointerLockControls(this.instance, document.body)
        document.body.addEventListener('click', () => {
            this.controls.lock()
        })
        document.addEventListener( 'keydown', this.onKeyDown );
        document.addEventListener( 'keyup', this.onKeyUp );
    }

    resize(): void {
        // this.controls.handleResize();
        super.resize()
    }

    destroy(): void {
        this.controls.dispose()
    }

    onKeyDown = (event: KeyboardEvent): void => {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                this.moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                this.moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                this.moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                this.moveRight = true;
                break;

            case 'Space':
                if ( this.canJump === true ) this.velocity.y += 350;
                this.canJump = false;
                break;
        }
    }

    onKeyUp = (event: KeyboardEvent): void => {
        switch ( event.code ) {
            case 'ArrowUp':
            case 'KeyW':
                this.moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                this.moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                this.moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                this.moveRight = false;
                break;
        }
    }

    update(): void {
        if (!Experience.instance) {
            return;
        }
        
        if (this.controls.isLocked === false) {
            return;
        }
        const damping = Math.exp(-this.friction * Experience.instance.time.delta);

        this.velocity.x *= damping;
        this.velocity.z *= damping;

        // this.velocity.x -= this.velocity.x * this.friction * Experience.instance.time.delta;
        // this.velocity.z -= this.velocity.z * this.friction * Experience.instance.time.delta;

        this.applyGravity();

        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.normalize();

        if (this.moveForward || this.moveBackward) {
            this.velocity.z -= this.direction.z * this.speed * Experience.instance.time.delta;
        }
        if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * this.speed * Experience.instance.time.delta;

        //Implement here collisions

        this.controls.moveRight( - this.velocity.x * Experience.instance.time.delta );
        this.controls.moveForward( - this.velocity.z * Experience.instance.time.delta );
    }

    /**
     * Called when calculating movements from inputs. Override to add a custom gravity or change the mass variable.
     */
    applyGravity(): void {
        if (!Experience.instance) {
            return;
        }

        this.velocity.y -= 9.8 * this.mass * Experience.instance.time.delta;
    }
}