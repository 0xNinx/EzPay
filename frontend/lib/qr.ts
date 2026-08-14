import QRCode from 'qrcode';

/**
 * Generates a QR code as a data URL
 * @param data - The data to encode in the QR code
 * @returns Promise<string> - Data URL of the QR code
 */
export async function generateQRCode(data: string): Promise<string> {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generates a QR code for a Stellar payment
 * @param address - Stellar wallet address
 * @param amount - Payment amount (optional)
 * @param memo - Payment memo (optional)
 * @returns Promise<string> - Data URL of the QR code
 */
export async function generatePaymentQRCode(
  address: string,
  amount?: number,
  memo?: string
): Promise<string> {
  const paymentData = `stellar:${address}${amount ? `?amount=${amount}` : ''}${memo ? `&memo=${encodeURIComponent(memo)}` : ''}`;
  return generateQRCode(paymentData);
}

/**
 * Generates a QR code for a payment link
 * @param paymentId - Unique payment request ID
 * @returns Promise<string> - Data URL of the QR code
 */
export async function generatePaymentLinkQRCode(paymentId: string): Promise<string> {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ezpay.io';
  const paymentLink = `${baseUrl}/pay/${paymentId}`;
  return generateQRCode(paymentLink);
}
