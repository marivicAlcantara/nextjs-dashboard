import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-100 p-4 shadow">
      <div className="flex items-center mb-2">
        {Icon && <Icon className="h-5 w-5 text-gray-700" />}
        <h3 className="ml-2 text-sm font-semibold">{title}</h3>
      </div>
      <p className="text-center text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function CardWrapper() {
  return (
    <>
      <Card title="Collected" value="$12,340" type="collected" />
      <Card title="Pending" value="$1,200" type="pending" />
      <Card title="Total Invoices" value="45" type="invoices" />
      <Card title="Total Customers" value="18" type="customers" />
    </>
  );
}
