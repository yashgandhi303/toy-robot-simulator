import { DIRECTION } from '../globals'

export interface IMoveAble {
    x: number
    y: number
    nose: DIRECTION

    move(): string
    rotate(direction: number): void

}