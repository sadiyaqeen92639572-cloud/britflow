/**
 * Calculates the combined height of all sticky headers.
 * Looks for elements with data-header="main" and data-header="observatoire".
 */
export const calculateHeaderOffset = (): number => {
    const mainHeader = document.querySelector('[data-header="main"]');
    const obsHeader = document.querySelector('[data-header="observatoire"]');

    const mainHeight = mainHeader?.getBoundingClientRect().height || 0;
    const obsHeight = obsHeader?.getBoundingClientRect().height || 0;

    // Return combined height + a small safety margin for visual comfort
    return mainHeight + obsHeight + 16;
};
