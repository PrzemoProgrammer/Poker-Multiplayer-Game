/// <reference path="./global.d.ts" />

import type { AbstractRenderer } from '@pixi/core';
import type { Container } from '@pixi/display';
import type { IDestroyOptions } from '@pixi/display';
import type { IPointData } from '@pixi/math';
import type { MaskData } from '@pixi/core';
import type { Rectangle } from '@pixi/math';
import type { Renderer } from '@pixi/core';
import { Sprite } from '@pixi/sprite';

/**
 * @class
 * @ignore
 * @private
 */
export declare class CacheData {
    textureCacheId: string;
    originalRender: (renderer: Renderer) => void;
    originalRenderCanvas: (renderer: AbstractRenderer) => void;
    originalCalculateBounds: () => void;
    originalGetLocalBounds: (rect?: Rectangle) => Rectangle;
    originalUpdateTransform: () => void;
    originalDestroy: (options?: IDestroyOptions | boolean) => void;
    originalMask: Container | MaskData;
    originalFilterArea: Rectangle;
    originalContainsPoint: (point: IPointData) => boolean;
    sprite: Sprite;
    constructor();
}

export { }
