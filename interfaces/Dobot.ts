import type { Device } from "./Device";

interface Dobot extends Device {
    position: { x: number, y: number, z: number }
}