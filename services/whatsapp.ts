
export const getWhatsAppLink = (message: string) => {
    const phone = process.env.WHATSAPP_NUMBER || '33600000000';
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
