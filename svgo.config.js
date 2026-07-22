// SVGO config for optimizing Figma-exported SVGs.
//
// These SVGs are imported with `?react` (vite-plugin-svgr), so they render as
// INLINE <svg> in the shared document. HTML ids are document-global, which
// makes `cleanupIds` unsafe here: it renames every file's ids to "a", "b", ...
// so ten inline SVGs all declare id="a" and every url(#a) mask reference
// resolves to whichever element appears first in the DOM. Figma's verbose ids
// (path-1-outside-1_1622_34877) are long specifically so they stay unique.
export default {
    floatPrecision: 2,
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    cleanupIds: false,
                },
            },
        },
    ],
};
