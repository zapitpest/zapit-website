export type ServiceAreaRegion = {
  id: string;
  name: string;
  suburbs: readonly string[];
};

export const MELBOURNE_SERVICE_REGIONS: readonly ServiceAreaRegion[] = [
  {
    id: 'inner-city',
    name: 'Inner City',
    suburbs: [
      'Carlton',
      'Fitzroy',
      'Collingwood',
      'Richmond',
      'South Yarra',
      'Prahran',
      'St Kilda',
      'Docklands',
      'Southbank',
      'East Melbourne',
      'West Melbourne',
      'Parkville',
      'Brunswick',
      'North Melbourne',
      'Kensington',
    ],
  },
  {
    id: 'north',
    name: 'North',
    suburbs: [
      'Preston',
      'Reservoir',
      'Thomastown',
      'Bundoora',
      'Mill Park',
      'Epping',
      'Craigieburn',
      'Broadmeadows',
      'Glenroy',
      'Coburg',
      'Brunswick West',
      'Pascoe Vale',
      'Fawkner',
      'Campbellfield',
      'Somerton',
    ],
  },
  {
    id: 'south-east',
    name: 'South East',
    suburbs: [
      'Glen Waverley',
      'Mount Waverley',
      'Chadstone',
      'Oakleigh',
      'Clayton',
      'Springvale',
      'Dandenong',
      'Frankston',
      'Cranbourne',
      'Berwick',
      'Narre Warren',
      'Rowville',
      'Mulgrave',
      'Noble Park',
      'Keysborough',
    ],
  },
  {
    id: 'east',
    name: 'East',
    suburbs: [
      'Box Hill',
      'Blackburn',
      'Burwood',
      'Camberwell',
      'Surrey Hills',
      'Balwyn',
      'Hawthorn',
      'Kew',
      'Doncaster',
      'Templestowe',
      'Ringwood',
      'Croydon',
      'Lilydale',
      'Mooroolbark',
      'Mitcham',
    ],
  },
  {
    id: 'western',
    name: 'Western',
    suburbs: [
      'Footscray',
      'Sunshine',
      'Werribee',
      'Hoppers Crossing',
      'Point Cook',
      'Altona',
      'Williamstown',
      'Newport',
      'Yarraville',
      'Seddon',
      'Caroline Springs',
      'Deer Park',
      'Melton',
      'Bacchus Marsh',
      'Tarneit',
    ],
  },
] as const;

export function pestControlSuburbPath(suburbName: string) {
  const slug = suburbName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `/pest-control-${slug}`;
}
