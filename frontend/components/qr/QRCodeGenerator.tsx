'use client';

import { useState, useEffect } from 'react';
import { generatePaymentQRCode, generatePaymentLinkQRCode } from '@/lib/qr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Copy, RefreshCw } from 'lucide-react';

interface QRCodeGeneratorProps {
  walletAddress?: string;
  type?: 'payment' | 'link';
  paymentId?: string;
}

export function QRCodeGenerator({ walletAddress, type = 'payment', paymentId }: QRCodeGeneratorProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [memo, setMemo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const generateQR = async () => {
    if (!walletAddress && type === 'payment') {
      setError('Wallet address is required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let qrDataUrl: string;
      
      if (type === 'payment') {
        qrDataUrl = await generatePaymentQRCode(walletAddress!, amount || undefined, memo || undefined);
      } else {
        qrDataUrl = await generatePaymentLinkQRCode(paymentId || 'demo-payment-id');
      }
      
      setQrCode(qrDataUrl);
    } catch (err) {
      setError('Failed to generate QR code');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (walletAddress || paymentId) {
      generateQR();
    }
  }, [walletAddress, paymentId]);

  const handleDownload = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `ezpay-qr-${type}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = () => {
    if (!qrCode) return;
    
    // Convert data URL to blob
    fetch(qrCode)
      .then(res => res.blob())
      .then(blob => {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
      });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">
          {type === 'payment' ? 'Payment QR Code' : 'Payment Link QR Code'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {type === 'payment' && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="amount">Amount (Optional)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="memo">Memo (Optional)</Label>
              <Input
                id="memo"
                type="text"
                placeholder="Payment reference"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {qrCode ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <img src={qrCode} alt="Payment QR Code" className="w-64 h-64" />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleCopy} variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button onClick={generateQR} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 bg-background rounded-lg">
            {isLoading ? (
              <p className="text-muted-foreground">Generating QR code...</p>
            ) : (
              <p className="text-muted-foreground">No QR code generated</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
