'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, Link as LinkIcon, Calendar } from 'lucide-react';

export function PaymentLinkGenerator() {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ezpay.io';
    const params = new URLSearchParams();
    
    if (amount > 0) params.append('amount', amount.toString());
    if (description) params.append('description', description);
    if (expiryDate) params.append('expiry', expiryDate);
    
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const link = `${baseUrl}/pay/${paymentId}${params.toString() ? `?${params.toString()}` : ''}`;
    
    setGeneratedLink(link);
  };

  const copyToClipboard = async () => {
    if (!generatedLink) return;
    
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <LinkIcon className="h-5 w-5" />
          Generate Payment Link
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Payment for goods/services"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="expiry">Expiry Date (Optional)</Label>
          <Input
            id="expiry"
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button onClick={generateLink} className="w-full">
          <LinkIcon className="h-4 w-4 mr-2" />
          Generate Link
        </Button>

        {generatedLink && (
          <div className="space-y-3 pt-4 border-t border-border">
            <Label>Generated Payment Link</Label>
            <div className="flex gap-2">
              <Input
                value={generatedLink}
                readOnly
                className="bg-background"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this link with customers to receive payments
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
