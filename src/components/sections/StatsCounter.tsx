import { SITE_CONFIG } from '@/lib/constants';

const STATS = [
  { value: SITE_CONFIG.stats.emergenciesSolved, label: 'Pest Emergencies Solved' },
  { value: SITE_CONFIG.stats.yearsExperience, label: 'Years of Experience in Protecting Homes' },
  { value: SITE_CONFIG.stats.firstVisitSuccess, label: 'First Visit Success Rate' },
  { value: SITE_CONFIG.stats.availability, label: 'Emergency Response Team' },
  { value: SITE_CONFIG.stats.responseTime, label: 'Average Response Time' },
];

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-zapit-green mb-2">{stat.value}</div>
          <p className="text-sm text-gray-300">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
