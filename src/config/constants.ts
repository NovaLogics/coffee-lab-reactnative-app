export const CONSTANTS = {
    APP_NAME: "CoffeeLab",
    THEMES: {
        LIGHT: "light",
        DARK: "dark",
    },
    TITLES: {
        FAVORITES: "Favorites",
        ORDER_HISTORY: "Order History",
    },
    PLACEHOLDER: {
        FIND_YOUR_COFFEE: "Find your Coffee...",
    },
    LIMITS: {
        MAX_ITEMS_IN_CART: 20,
        MIN_PASSWORD_LENGTH: 8,
    },
};

// Product type related constants
export const PRODUCT_TYPES = {
    COFFEE: "Coffee",
    BEAN: "Bean",
};

// Payment related constants
export const PAYMENT_METHODS = {
    WALLET: "Wallet",
    CREDIT_CARD: "Credit Card",
    GOOGLE_PAY: "Google Pay",
    APPLE_PAY: "Apple Pay",
    AMAZON_PAY: "Amazon Pay",
};

// Currency and Conversion Constants
// Usage: CURRENCY.USD.symbol
export const CURRENCY = {
    USD: { code: "USD", symbol: "$" },
    EUR: { code: "EUR", symbol: "€" },
    INR: { code: "INR", symbol: "₹" },
    GBP: { code: "GBP", symbol: "£" },
    AUD: { code: "AUD", symbol: "A$" },
    CAD: { code: "CAD", symbol: "C$" },
    JPY: { code: "JPY", symbol: "¥" },
    CNY: { code: "CNY", symbol: "¥" },
    CHF: { code: "CHF", symbol: "Fr" },
    SEK: { code: "SEK", symbol: "kr" },
};


export const BUTTON_TITLES = {
    ADD_TO_CART: "Add to Cart",
    BUY_NOW: "Buy Now",
    PAY_WITH: (paymentMode: string) => `Pay with ${paymentMode}`,
    PAY: "Pay",
};
