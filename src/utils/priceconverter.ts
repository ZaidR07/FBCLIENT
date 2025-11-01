export const priceconverter = (n) => {
    // Handle null, undefined, or non-numeric values
    if (n === null || n === undefined || isNaN(n)) {
        return "N/A";
    }

    let absN = Math.abs(n);

    if (absN >= 1e7) {
        return (n / 1e7).toFixed(2) + " Cr";
    } else if (absN >= 1e5) {
        return (n / 1e5).toFixed(2) + " L";
    } else if (absN >= 1e3) {
        return (n / 1e3).toFixed(2) + " K";
    } else {
        return n.toString();
    }
}