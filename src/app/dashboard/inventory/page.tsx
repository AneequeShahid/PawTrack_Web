'use client';
import { Activity, Package, AlertCircle } from 'lucide-react';
import { DogMascot } from '@/components/illustrations/Mascots';

export default function InventorySupplies() {
  return (
    <div className="space-y-8 pb-20 relative">
      <div className="bg-warning/10 border border-warning/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-soft relative overflow-hidden">
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full text-warning font-bold text-sm">
            <Package size={16} /> Stock Management
          </div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Inventory & Supplies</h1>
          <p className="text-muted font-medium text-lg leading-relaxed">
            Track shelter food reserves, medical supplies, and TNVR trapping equipment.
          </p>
        </div>
        <div className="relative z-10 mt-8 md:mt-0">
          <DogMascot state="sleeping" className="w-48 h-48 drop-shadow-xl" />
        </div>
      </div>

      <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-soft">
        <table className="w-full text-left">
          <thead className="bg-black/5">
            <tr>
              <th className="p-4 font-bold text-muted text-sm">Item Name</th>
              <th className="p-4 font-bold text-muted text-sm">Category</th>
              <th className="p-4 font-bold text-muted text-sm">Stock Level</th>
              <th className="p-4 font-bold text-muted text-sm">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border font-medium text-foreground">
            {[
              { item: "Adult Dog Kibble (20kg)", cat: "Food", stock: "12 Bags", status: "Adequate" },
              { item: "Kitten Milk Replacer", cat: "Food", stock: "2 Tins", status: "Low Stock" },
              { item: "Rabies Vaccines", cat: "Medical", stock: "45 Vials", status: "Adequate" },
              { item: "Humane Cat Traps", cat: "Equipment", stock: "8 Units", status: "In Use" },
              { item: "Amoxicillin (500mg)", cat: "Medical", stock: "1 Box", status: "Critical" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-black/5 transition-colors">
                <td className="p-4">{row.item}</td>
                <td className="p-4 text-muted">{row.cat}</td>
                <td className="p-4 font-bold">{row.stock}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Critical' || row.status === 'Low Stock' ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
