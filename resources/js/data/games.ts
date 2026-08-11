export type GameSlug =
    | 'signal-decoder'
    | 'data-trace'
    | 'core-logic-test'
    | 'reconstruct-identity';

export type GameConfig = {
    id: GameSlug;
    title: string;
    slug: GameSlug;
    path: string;
    unlocksAfter?: GameSlug;
};

export const games: GameConfig[] = [
    {
        id: 'signal-decoder',
        title: 'Signal Decoder',
        slug: 'signal-decoder',
        path: '/games/signal-decoder',
    },
    {
        id: 'data-trace',
        title: 'Data Trace',
        slug: 'data-trace',
        path: '/games/data-trace',
        unlocksAfter: 'signal-decoder',
    },
    {
        id: 'core-logic-test',
        title: 'Core Logic Test',
        slug: 'core-logic-test',
        path: '/games/core-logic-test',
        unlocksAfter: 'data-trace',
    },
    {
        id: 'reconstruct-identity',
        title: 'Reconstruct Identity',
        slug: 'reconstruct-identity',
        path: '/games/reconstruct-identity',
        unlocksAfter: 'core-logic-test',
    },
];
