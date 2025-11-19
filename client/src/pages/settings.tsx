import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const handleSave = () => {
    console.log('Settings saved');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your business and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                placeholder="Your Company Name"
                defaultValue="BizBooks Pvt Ltd"
                data-testid="input-company-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@company.com"
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+91 1234567890"
                data-testid="input-phone"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN</Label>
              <Input
                id="gstin"
                placeholder="Enter GST Number"
                data-testid="input-gstin"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter company address"
                rows={3}
                data-testid="input-address"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                <Input
                  id="invoice-prefix"
                  placeholder="INV-"
                  defaultValue="INV-"
                  data-testid="input-invoice-prefix"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="next-number">Next Invoice Number</Label>
                <Input
                  id="next-number"
                  type="number"
                  placeholder="1"
                  defaultValue="1"
                  data-testid="input-next-number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-tax">Default Tax Rate (%)</Label>
                <Input
                  id="default-tax"
                  type="number"
                  placeholder="18"
                  defaultValue="18"
                  data-testid="input-default-tax"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-terms">Default Payment Terms</Label>
                <Textarea
                  id="payment-terms"
                  placeholder="Payment terms..."
                  rows={3}
                  data-testid="input-payment-terms"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  defaultValue="INR (₹)"
                  disabled
                  data-testid="input-currency"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="financial-year">Financial Year Start</Label>
                <Input
                  id="financial-year"
                  type="date"
                  data-testid="input-financial-year"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} data-testid="button-save-settings">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
