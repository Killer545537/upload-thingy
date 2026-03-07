import type { GooeyToasterProps } from 'goey-toast';
import {
    GooeyToaster as GooeyToasterPrimitive,
    type gooeyToast,
} from 'goey-toast';

export type { gooeyToast };
export type { GooeyToasterProps };
export type {
    GooeyPromiseData,
    GooeyToastAction,
    GooeyToastClassNames,
    GooeyToastOptions,
    GooeyToastTimings,
} from 'goey-toast';

function GooeyToaster(props: GooeyToasterProps) {
    return <GooeyToasterPrimitive position='bottom-right' {...props} />;
}

export type { GooeyToaster };
