import { Save, Shield, CreditCard, Store } from "lucide-react";

export function Settings() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
        <p className="text-gray-400">Configure your seller profile and store preferences.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile Settings */}
        <div className="glass-card p-6 md:p-8 rounded-3xl flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Store className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-white">Store Profile</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400 font-medium">Store Name</label>
              <input 
                type="text" 
                defaultValue="Aeternal Official"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400 font-medium">Support Email</label>
              <input 
                type="email" 
                defaultValue="support@aeternal.com"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm text-gray-400 font-medium">Store Description</label>
              <textarea 
                rows={4}
                defaultValue="The pinnacle of modern luxury horology. Forged in excellence."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <button className="liquid-button px-6 py-2.5 rounded-full text-white font-medium flex items-center gap-2 text-sm">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>

        {/* Security & Billing Mock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-3xl flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Shield className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-semibold text-white">Security</h2>
            </div>
            <p className="text-sm text-gray-400">Manage password and 2-factor authentication.</p>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl px-4 py-3 text-sm text-white font-medium w-full mt-auto">
              Enable 2FA
            </button>
          </div>

          <div className="glass-card p-6 rounded-3xl flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <CreditCard className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-white">Payout Method</h2>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-xs font-bold text-white">VISA</div>
              <div>
                <p className="text-sm text-white font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-gray-500">Expires 12/28</p>
              </div>
            </div>
            <button className="text-primary text-sm font-medium hover:text-white transition-colors mt-auto text-left">
              + Add New Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
