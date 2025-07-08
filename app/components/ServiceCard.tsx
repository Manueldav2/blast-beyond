import { Check } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  className?: string;
}

export function ServiceCard({ icon, title, description, details, className = '' }: ServiceCardProps) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-rose_taupe-500">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-600">
            <Check className="h-5 w-5 text-old_rose-500" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
} 